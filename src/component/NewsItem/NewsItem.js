import React, { Component } from "react";
import "./NewsItem.css";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt,source } =
      this.props;

    return (
      <div className="card-container">
        <div className="card">
          <img className="card-img-top" src={imageUrl} alt={title} />
          <span className="badge rounded-pill bg-success">{source}</span>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="updated-text">
              <small className="text-body-secondary">
              Updated by <strong>{author}</strong> on <strong>{new Date(publishedAt).toGMTString()}</strong>
              </small>
            </p>
            <div className="btn-container">
              <a
                rel="noreferred"
                href={newsUrl}
                target="_blank"
                className="btn btn-outline-secondary"
              >
                Read Details
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
