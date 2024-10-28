import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date  , source} = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <div style={{
            display : 'flex',
            justifyContent :'flex-end',
            position : 'absolute',
            right:'0'
          }}></div>
        <span className="position-absolute top-60 start-10  badge rounded-pill bg-danger" style={{ zIndex :'1'}}>
        {source ? source : "Unknown"}
  </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p rel="noreferrer">
              <small className="text-muted">
                By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>

            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More..
            </a>
          </div>
        </div>
      </div>
    );
  }
}
