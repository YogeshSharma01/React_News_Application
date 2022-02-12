import React, { Component } from 'react'
import News from "../img/news.jpeg";
export default class NewsItem extends Component {
  render() {
      let {title, description,imgUrl,newsUrl} = this.props;
    return (
      <>
      <div className="card" style={{width: "18rem"}}>
        <img src={!imgUrl?{News}:imgUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
        </div>
     </div>
     </>
    )
  }
}
