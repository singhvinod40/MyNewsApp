import React from "react";
import "./NewsItem.css";

const NewsItem = (props) => {

  return (
    <div className="card-container">
      <div className="card">
        <img className="card-img-top" src={props.imageUrl} alt={props.title} />
        <span className="badge rounded-pill bg-success">{props.source}</span>
        <div className="card-body">
          <h5 className="card-title">{props.title}...</h5>
          <p className="card-text">{props.description}...</p>
          <p className="updated-text">
            <small className="text-body-secondary">
              Updated by <strong>{props.author}</strong> on <strong>{new Date(props.publishedAt).toGMTString()}</strong>
            </small>
          </p>
          <div className="btn-container">
            <a
              rel="noreferred"
              href={props.newsUrl}
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

export default NewsItem;
