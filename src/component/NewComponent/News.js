import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "../NewsItem/NewsItem";
import "./News.css";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import Spinner from "../Spinner/Spinner";
import image from './../../Asset/noImage.png';


export class News extends Component {

    constructor() {

        super();
        this.state = {
            article: [],
            loading: false,
            page: 1

        }
    }


    async componentDidMount() {
        this.updateNews();
    }

    updateNews = async() =>{
        this.props.setProgress(10)
    
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.ApiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30)
        this.setState({ loading: true });
        let parseData = await data.json();
        this.props.setProgress(50)
        this.setState({
            page: this.state.page,
            article: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
        this.props.setProgress(80)
        document.title =  this.capitalizeFirstCharacter(`${this.props.category}`) + ' -News';
        this.props.setProgress(100)
    }

    capitalizeFirstCharacter = (string) => {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handlePrev = async () => {
        this.setState( {page : this.state.page-1});
        this.updateNews();

    }

    handleNext = async () => {

        this.setState({page : this.state.page +1});
        this.updateNews();
    }

    render() {
        return (
            <>
                <div className="container my-3">
                    <h1 className="text-center">Top Headlines From {this.capitalizeFirstCharacter(`${this.props.category}`)}</h1>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        { !this.state.loading && this.state.article.map((element) => {

                            return <div className="col-md-4 my-2" key={element.url}>
                                <NewsItem title={element.title? element.title.slice(0,120) : "No Title" }
                                    description={element.description ? element.description.slice(0, 70) : "No Description"}
                                    imageUrl={element.urlToImage ? element.urlToImage : image }
                                    author={element.author ? element.author:"UnKnown"}
                                    publishedAt={element.publishedAt}
                                    newsUrl={element.url}
                                    source={element.source.name}
                                    className="news-card" />
                            </div>
                        })}
                    </div>
                </div>
                <div className="Container d-flex justify-content-around">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-info" onClick={this.handlePrev}> <MdSkipPrevious /> Previous</button>

                    <span>Page {this.state.page} of {Math.ceil(this.state.totalResults / this.props.pageSize)}</span>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-outline-info" onClick={this.handleNext}>Next <MdSkipNext /></button>
                </div>
            </>
        );
    }
}

export default News;
