import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capatalizeFirstLetter= (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capatalizeFirstLetter(this.props.category)}  - Globewatch`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;


    this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults, 
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => { 
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState((prevState) => ({ page: prevState.page + 1 }), () => {
        this.updateNews();
      });
    }
  };

  handlePrevClick = async () => {
    if (this.state.page > 1) {
      this.setState((prevState) => ({ page: prevState.page - 1 }), () => {
        this.updateNews();
      });
    }
  };

  render() {
    const placeholderImage = "https://dummyimage.com/600x400/000/fff&text=No+Image";

    return (
      <div className="container my-3">
        <h1 className="text-center">{`GlobeWatch -${this.capatalizeFirstLetter(this.props.category)} Top Headlines`}</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element ? element.title.slice(0, 88) : ""}
                  description={
                    element && element.description
                      ? element.description.slice(0, 45)
                      : "Description not available"
                  }
                  imageUrl={element.urlToImage ? element.urlToImage : placeholderImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-sm btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Prev
          </button>

          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-sm btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
