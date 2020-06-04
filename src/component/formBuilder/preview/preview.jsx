import React from "react";
import { connect } from "react-redux";
import update from "immutability-helper";
import FormComponentContainer from "./formComponentContainer";
import PreviewHeader from "./previewHeader";
import { load, updateOrder, deletek, setFormName } from "../redux/action";

const { EmptyFormComponent } = FormComponentContainer;

class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.editForm = React.createRef();

    this.moveCard = this.moveCard.bind(this);
    this.insertCard = this.insertCard.bind(this);
    this.updateElement = this.updateElement.bind(this);
    this.deleteFormComponent = this.deleteFormComponent.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.editModeOff);
    if (this.props.defaultForm && this.props.defaultForm.components) {
      this.props.defaultForm.components.map((item, index) => {
        this.insertCardToInit(item, index);
      })
      this.props.setFormName(this.props.defaultForm.name);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.editModeOff);
  }

  editModeOff = e => {
    if (this.editForm.current && !this.editForm.current.contains(e.target)) {
      this.manualEditModeOff();
    }
  };

  manualEditModeOff = () => {
    const { editElement } = this.props;
    if (editElement && editElement.dirty) {
      editElement.dirty = false;
      this.updateElement(editElement);
    }
    this.props.manualEditModeOff();
  };

  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
  }

  updateElement(element) {
    const { data } = this.props;
    let found = false;

    for (let i = 0, len = data.length; i < len; i++) {
      if (element.id === data[i].id) {
        data[i] = element;
        found = true;
        break;
      }
    }

    if (found) {
      this.props.updateOrder(data);
    }
  }

  _calcLayoutY(dataArray, index, removeCard) {
    dataArray.forEach((item, i) => {
      if (i > index) {
        if (removeCard.layout.y != item.layout.y) {
          item.layout.y -= 3;
        }
      }
    });

    return dataArray;
  }

  deleteFormComponent(removeCard) {
    let newDataArray = [...this.props.data];
    let index = newDataArray.indexOf(removeCard);

    let hasSameLevelItem = newDataArray.filter((item) => {
      return item.id != removeCard.id
    }).filter((item) => {
      return item.layout.y == removeCard.layout.y
    }).length >= 1;

    if (!hasSameLevelItem) {
      newDataArray = this._calcLayoutY(newDataArray, index, removeCard)
    }

    newDataArray.splice(index, 1);

    this.props.deletek(newDataArray);
  }

  insertCardToInit(item, hoverIndex) {
    const { data } = this.props;

    data.splice(hoverIndex, 0, item);

    this.saveData(item, hoverIndex, hoverIndex);
  }

  saveData(dragCard, dragIndex, hoverIndex) {
    const newData = update(this.props, {
      data: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    });

    this.props.updateOrder(newData.data);
  }

  _calcLayoutYWithInsert(data, index) {
    data.forEach((item, i) => {
      if (i >= index) {
        item.layout.y += 3;
      }
    })
  }

  insertCard(item, hoverIndex) {
    const { data } = this.props;

    if (hoverIndex == 0) {
      this._calcLayoutYWithInsert(data, hoverIndex);

      data.splice(hoverIndex, 0, item);
    } else {
      item.layout.y = data[hoverIndex].layout.y;

      this._calcLayoutYWithInsert(data, hoverIndex);

      data.splice(hoverIndex, 0, item);
    }

    this.saveData(item, hoverIndex, hoverIndex);
  }

  moveCard(dragIndex, hoverIndex) {
    const { data } = this.props;
    const dragCard = data[dragIndex];
    const targetCard = data[hoverIndex];

    let temp = dragCard.layout.y;
    dragCard.layout.y = targetCard.layout.y;
    targetCard.layout.y = temp;

    this.saveData(dragCard, dragIndex, hoverIndex);
  }

  cardPlaceHolder(dragIndex, hoverIndex) {
    // Dummy
  }

  getElement(item, index) {
    const FormComponent = FormComponentContainer[item.element];

    return (
      <FormComponent
        key={Math.random()}
        id={item.key}
        index={index}
        moveCard={this.moveCard}
        insertCard={this.insertCard}
        mutable={false}
        parent={this.props.parent}
        editModeOn={this.props.editModeOn}
        isDraggable={true}
        sortData={item.key}
        data={item}
        _onDestroy={this.deleteFormComponent}
      />
    );
  }

  handleSetFormName = (e) => {
    this.props.editModeOn({ element: "SetFormName" }, e);
  }

  render() {
    let classes = this.props.className;
    if (this.props.isEditMode) {
      classes += " is-editing";
    }
    const data = this.props.data.filter(x => !!x);
    const items = data.map((item, index) => this.getElement(item, index));

    return (
      <div className="preview-container">
        <div className={classes}>
          <PreviewHeader onClick={this.handleSetFormName} />
          <div className="Sortable">{items}</div>
          <EmptyFormComponent
            id="form-place-holder"
            show={items.length === 0}
            index={items.length}
            moveCard={this.cardPlaceHolder}
            insertCard={this.insertCard}
            text="从左侧拖拽字段添加到此工作区"
          />
        </div>
      </div>
    );
  }
}

Preview.defaultProps = {
  showCorrectColumn: false,
  isEditMode: false,
  editElement: null,
  className: "react-form-builder-preview perview-container"
};

export default connect(
  store => ({
    data: store.formBuilder.data
  }),
  {
    load,
    updateOrder,
    deletek,
    setFormName
  }
)(Preview);
