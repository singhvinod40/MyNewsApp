import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "../NewsItem/NewsItem";
import "./News.css";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import Spinner from "../Spinner/Spinner";

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

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=9b5434c59ab242f9987cc7ee33515c70&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            article: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
    }

    handlePrev = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=9b5434c59ab242f9987cc7ee33515c70&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.setState({ loading: true });
        let parseData = await data.json();

        this.setState({
            page: this.state.page - 1,
            article: parseData.articles,
            loading: false
        })
    }

    handleNext = async () => {

        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=9b5434c59ab242f9987cc7ee33515c70&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parseData = await data.json();

            this.setState({
                page: this.state.page + 1,
                article: parseData.articles,
                loading: false
            })
        }
    }

    render() {
        return (
            <>
                <div className="container my-3">
                    <h1 className="text-center">Top Headlines</h1>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        { !this.state.loading && this.state.article.map((element) => {

                            return <div className="col-md-4 my-2" key={element.url}>
                                <NewsItem title={element.title}
                                    description={element.description ? element.description.slice(0, 70) : "No Description"}
                                    imageUrl={element.urlToImage ? element.urlToImage : "https://th.bing.com/th/id/OIF.esjes2Tv155Ei651WAUQIQ?rs=1&pid=ImgDetMain"}
                                    newsUrl={element.url}
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
