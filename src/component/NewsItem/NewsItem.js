import React, { Component } from 'react';
import "./NewsItem.css"; 

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl} = this.props;

    return (
      <div className="card">
        <img className="card-img-top" src={imageUrl} alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a rel='noreferred' href={newsUrl} target='_blank' className="btn btn-outline-secondary">Read Details</a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
