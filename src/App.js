import React from 'react';
//import logo from './logo.svg';
import './App.css';
var App = require('create-react-class')({
  
  apiKey: "W14FPOOXZZO8",
  limit: "50",
  search: "",
  url: "https://api.tenor.com/v1/search?tag=",
  getInitialState: function() {
    return {data: [], search: [], searchTerm: ""};
  },
  loadContent: function(searchType){
    this.setState({search : 'excited'})
    var requestUrl = this.url + searchType + "&key=" + this.apiKey + "&limit="+ this.limit;
    console.log(this.search);
    fetch(requestUrl).then((response)=>{
      console.log(response);
      return response.json();
    }).then((data)=>{
      this.setState({data : data});
    }).catch((err)=>{
      alert("you are a loser.");
    });
  },
  componentDidMount: function(){
      this.loadContent('');
      //this.setState({});
  },
  handleKeyUp: function(e){
    //if (e.key === 'Enter' && this.state.searchTerm !== '') {
      this.loadContent(this.state.searchTerm);
    //}
  },
  handleSearch: function(e){
    this.setState({searchTerm: e.target.value});    
  },

  render: function(){
    var top =[];
    var search = [];
    console.log(this.state.search);
    //this.setState({search : "excited"});
    console.log(this.search);
    console.log(top);
    var gifs = this.state.data.results;
    var searchGif = this.state.search.results;
    if (searchGif !== undefined){
      for (var i=0; i<search.length; i++){
        search.push(searchGif[i].media[0].tinygif.url);
      }
    }
    if(gifs !== undefined){
      for (var i=0; i < gifs.length; i++){
        top.push(gifs[i].media[0].tinygif.url);
      }
    console.log(gifs);
  }
  return (
    <div>
      <header className="App-header">
        <input id="search" onKeyUp={this.handleKeyUp} onChange={this.handleSearch} value={this.state.searchTerm}></input>
        {/*<button onClick={this.loadContent}>let's do it</button>*/}
        {search.map((url) =>
        <img src={url} alt="search" />
        )}
      <h2>Trending GIFs</h2>
      {top.map((url) =>
        <img src={url} width="500" height="200" className="App-logo" alt="logo" />
        )}
        
      </header>
    </div>
  );
  }
});

export default App;
