import React, { useEffect, useState } from "react";
import NewsItem from "../NewsItem/NewsItem";
import "./News.css";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import Spinner from "../Spinner/Spinner";
import image from './../../Asset/noImage.png';
import PropTypes from 'prop-types';

const News = (props) => {
    const [article, setArticle] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoader] = useState(true);
    const [totalResults, setTotalResult] = useState(0);

    useEffect(() => {
        updateNews();
    }, [page]);

    const updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.ApiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoader(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(50);

        setArticle(parseData.articles);
        setTotalResult(parseData.totalResults);
        props.setProgress(80);
        setLoader(false);
        
        setPage(page);

        document.title = capitalizeFirstCharacter(`${props.category}`) + ' - News';
        props.setProgress(100);
    };

    const capitalizeFirstCharacter = (string) => {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handlePrev = () => {
        setPage(page - 1);
    };

    const handleNext = () => {
        setPage(page + 1);
        console.log(page);
    };

    return (
        <>
            <div className="container my-3">
                <h1 className="text-center" style = {{marginTop: "90px"}}>Top Headlines From {capitalizeFirstCharacter(`${props.category}`)}</h1>
                {loading && <Spinner />}
                <div className="row">
                    {!loading && article.map((element) => {
                        return (
                            <div className="col-md-4 my-2" key={element.url}>
                                <NewsItem 
                                    title={element.title ? element.title.slice(0, 120) : "No Title"}
                                    description={element.description ? element.description.slice(0, 70) : "No Description"}
                                    imageUrl={element.urlToImage ? element.urlToImage : image}
                                    author={element.author ? element.author : "Unknown"}
                                    publishedAt={element.publishedAt}
                                    newsUrl={element.url}
                                    source={element.source.name}
                                    className="news-card"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="container d-flex justify-content-around">
                <button disabled={page <= 1} type="button" className="btn btn-outline-info" onClick={handlePrev}>
                    <MdSkipPrevious /> Previous
                </button>
                <span>Page {page} of {Math.ceil(totalResults / props.pageSize)}</span>
                <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-outline-info" onClick={handleNext}>
                    Next <MdSkipNext />
                </button>
            </div>
        </>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'General'
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    ApiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired
};

export default News;
