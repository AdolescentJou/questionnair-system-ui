import React from "react";
import { connect } from "react-redux";
import { setVcodeMsg } from "./redux/action";
class VCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.initState()
    };
  }

  resetState = () => {
    this.setState({...this.initState()});
  }

  initState = () => {
    const data = this.getRandom(109, 48, 4);
    const str = data.map(v => 
      String.fromCharCode(
        v > 57 && v < 84 ? v + 7 : v < 57 ? v : v + 13
    )).join("");
    this.props.setVcodeMsg(str);
    const rotate = this.getRandom(45, -45, 4);
    const fz = this.getRandom(16, 20, 4);
    const color = [
      this.getRandom(100, 255, 3),
      this.getRandom(100, 255, 4),
      this.getRandom(100, 255, 3),
      this.getRandom(100, 255, 3)
    ];
    return {
      data,
      rotate,
      fz,
      color
    };
  }

  getRandom(max, min, num) {
    const asciiNum = ~~(Math.random() * (max - min + 1) + min);
    if (!Boolean(num)) {
      return asciiNum;
    }
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(this.getRandom(max, min));
    }
    return arr;
  }

  render() {
    const { color, fz, rotate } = this.state;
    return (
      <div className="vcodewrap">
        {/* <canvas id="bgi" width="200" height="200"></canvas> */}
        {this.state.data.map((v, i) => (
          <div
            key={i}
            className="itemStr"
            style={{
              transform: `rotate(${rotate[i]}deg)`,
              fontSize: `${fz[i]}px`,
              color: `rgb(${color[i].toString()})`,
              width: 20
            }}
          >
            {String.fromCharCode(
              v > 57 && v < 84 ? v + 7 : v < 57 ? v : v + 13
            )}
          </div>
        ))}
        <span className="checkout" onClick={this.resetState}>看不清楚?</span>
      </div>
    );
  }
}
export default connect(store => ({}), { setVcodeMsg })(VCode);
