import React from 'react';
//import logo from './logo.svg';
import './App.css';
import * as faceapi from 'face-api.js';
import { promised } from 'q';
var App = require('create-react-class')({
  
  apiKey: "W14FPOOXZZO8",
  limit: "50",
  search: "",
  facialExpression: '',
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
    var video = document.getElementById('video');
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]).then(this.video);
    video.addEventListener('play', () => {
      //const canvas = faceapi.createCanvasFromMedia(video);
      //document.body.append(canvas)
      //const displaySize = {width: video.width, height: video.height}
      //faceapi.matchDimensions(canvas, displaySize)
      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, 
          new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
         // const resizedDetections = faceapi.resizeResults(detections, displaySize)
          //canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height)
          //faceapi.draw.drawDetections(canvas, resizedDetections)
          //faceapi.draw.drawFaceLandmarks(canvas,resizedDetections)
          console.log(detections);
          if (detections[0]){
            if (detections[0].expressions.neutral > 0.90){
              this.setState({facialExpression: 'neutral'});
              this.loadContent('neutral');
            }
            else if (detections[0].expressions.happy > 0.90){
              this.setState({facialExpression: 'happy'});
              this.loadContent('happy');
            }
            else if (detections[0].expressions.sad > 0.70){
              this.setState({facialExpression: 'sad'});
              this.loadContent('sad');
            }
            else if (detections[0].expressions.angry > 0.70){
              this.setState({facialExpression: 'angry'});
              this.loadContent('angry');
            }
            else if (detections[0].expressions.fearful > 0.70){
              this.setState({facialExpression: 'fearful'});
              this.loadContent('fearful');
            }
            else if (detections[0].expressions.disgusted > 0.70){
              this.setState({facialExpression: 'disgusted'});
              this.loadContent('disgusted');
            }
            else if (detections[0].expressions.surprised > 0.70){
              this.setState({facialExpression: 'surprised'});
              this.loadContent('surprised');
            }
        }
          
      }, 100)
    })
      
      
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
  video: function(){
    
    var video = document.getElementById('video');

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
}
  },
  /*navigator.mediaDevices.getUserMedia(
    { video : {}},
    stream => video.srcObject = stream,
  err => console.error(err)
)*/

  render: function(){
    var top =[];
    var search = [];
   var facialExpressions = this.state.facialExpression;
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
      for ( i=0; i < gifs.length; i++){
        top.push(gifs[i].media[0].tinygif.url);
      }
    console.log(gifs);
  }
  return (
    <div>
      <header className="App-header">
        <input id="search" onKeyUp={this.handleKeyUp} onChange={this.handleSearch} value={this.state.searchTerm}></input>
        <button onClick={this.video}>let's do it</button>
        {search.map((url) =>
        <img src={url} alt="search" />
        )}
        <video id="video" width="100%" height="480" autoplay></video>
        <h1>{facialExpressions}</h1>
      <h2>Trending GIFs</h2>
      {top.map((url) =>
        <img src={url} width="400" height="200" className="App-logo" alt="logo" />
        )}
        
      </header>
    </div>
  );
  }
});

export default App;
