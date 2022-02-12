import React, { Component } from 'react'
import NewsItem from './NewsItem';
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps = {
    general: 'in',
    pageSize : 8,
    category: 'general'
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

   capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
        document.title = `NewsHut - ${this.capitalizeFirstLetter(this.props.category)}`;
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b7f5e44755d4c519b062368fc30734e&pageSize=8`;
        let data =await fetch(url);
        let parseData =await data.json();
        console.log(parseData);
        this.setState({articles: parseData.articles,totalResults: parseData.totalResults});
    }
    prevClickHandler = async ()=>{
      console.log('previous');
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b7f5e44755d4c519b062368fc30734e&page=${this.state.page - 1}&pageSize=8`;
      let data =await fetch(url);
      let parseData =await data.json();
      console.log(parseData);
      this.setState({
        page: this.state.page - 1,
        articles: parseData.articles
      })

    }
     nextClickHandler = async ()=>{
      console.log('Next');
      if(this.state.page + 1 > Math.ceil(this.state.totalResults/8)){

      }else{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b7f5e44755d4c519b062368fc30734e&page=${this.state.page + 1}&pageSize=8`;
      let data =await fetch(url);
      let parseData =await data.json();
      console.log(parseData);
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles
      })
    }
    }

  render() {
    return (
      <>
    <div className="container my-3">

      <h1 className="text-center">NewsHut Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>

      <div className="row">
      {this.state.articles.map((element)=>{
        return <div className="col-md-3" key={element.url}>
       <NewsItem title={element.title?element.title.slice(0,45):""}
        description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage} 
        newsUrl={element.url}/>
       </div>
      })}  
       </div>
       <div className="container d-flex justify-content-between">
       <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.prevClickHandler}>&larr; Previous</button>
       <button type="button" className="btn btn-dark" onClick={this.nextClickHandler}>Next &rarr;</button>
       </div>
       </div>
      </>
    )
  }
}
