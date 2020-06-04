import React from "react";

class SwiperCard extends React.Component {
  render() {
    const { img, title, description } = this.props;
    return (
      <div className="swiperCardContainer">
        {this.props.index % 2 == 0 ? (
          <>
            <div className="imgBox">
              <img src={`/image/${img}.png`} />
            </div>
            <div className="typographyBox">
              <div className="cardTitle">{title}</div>
              <div className="cardDesprition">{description}</div>
              <div className="cardFoot">
                <span>查看详情</span>
                <span>了解更多</span>
                <span>业务介绍</span>
                <span>功能推荐</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="typographyBox">
              <div className="cardTitle">{title}</div>
              <div className="cardDesprition">{description}</div>
              <div className="cardFoot">
                <span>查看详情</span>
                <span>了解更多</span>
                <span>业务介绍</span>
                <span>功能推荐</span>
              </div>
            </div>
            <div className="imgBox">
              <img src={`/image/${img}.png`} />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default SwiperCard;
