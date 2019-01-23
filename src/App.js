import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


class App extends Component {
  constructor(props){
    super(props) 
    this.state = {
       selectedFile: null, loaded: 0, 
      }

    }

  postImage = () => {
    fetch('http://localhost:8080/api/file/upload', {
      method: 'POST',
      header: new Headers ({
        'Content-type': 'application/json; charset=utf-8'
      })
    })
    .then((res) => res.text())
    .then(text => console.log(text))
    }
  
  


  getImage = () => {
    fetch('http://localhost:8080/api/file/2', {
      method: 'GET',
      headers: new Headers ({
        'Content-Type': 'image/jpeg',
        'Accept': 'image/jpeg'
      })
    })
    .then((res) => res.text())
    .then(text => console.log(text))
    .then((text) => {
      return this.setState({img: text})   
    })
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    axios
      .post('http://localhost:8080/api/file/upload', data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
        },
      })
      .then(res => {
        console.log(res.statusText)
      })

  }

  
  render() {
    return (
      <div className="App">
       <button onClick={this.getImage}>Find File </button>
      <div className="App">
        <input type="file" name="" id="" onChange={this.handleselectedFile} />
        <button onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded,2) } %</div>
    )
      </div>

      </div>
    );
  }
}

export default App;
