import React from 'react';
import { DragSource } from 'react-dnd';
import FormIcon from '../../base/FormIcon';
import ItemTypes from '../../../utils/ItemTypes';
import ID from '../../../utils/UUID';

const cardSource = {
  beginDrag(props) {
    return {
      id: ID.uuid(),
      index: -1,
      data: props.data,
      onCreate: props.onCreate,
    };
  },
};

class ToolbarItem extends React.Component {
  render() {
    const { connectDragSource, data } = this.props;
    if (!connectDragSource) return null;

    return (
      connectDragSource(
        <li><span><FormIcon icon={data.icon} /></span>{data.label}</li>,
      )
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(ToolbarItem);
