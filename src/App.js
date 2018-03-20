import React, { Component } from 'react';
import './jqueryEraser';
import './App.css';
import grayscale from './grayscale.jpg';
import colour from './colour.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditorMode: true,
      frontImage: grayscale,
      backImage: colour,
      frontImageNew: '',
      backImageNew: ''
    }
  }

  setImages() {
    this.setState({
      frontImage: this.state.frontImageNew,
      backImage: this.state.backImageNew
    }, () => {
      window.location.href = this.getLink();
    });

    return false;
  };

  componentWillMount() {
    if (param('front')) {
      this.setState({
        frontImage: param('front'),
        backImage: param('back'),
        frontImageNew: param('front'),
        backImageNew: param('back'),
        isEditorMode: param('share') !== 'true'
      })
    }
  }

  componentDidMount() {
    window.$('#front-image').eraser();
  }

  getLink(share = false) {
    const { location } = window;
    const { frontImage, backImage } = this.state;
    return `${location.protocol}//${location.host}${location.pathname}?front=${encodeURIComponent(frontImage)}&back=${encodeURIComponent(backImage)}&share=${share}`
  }

  render() {
    return (
      <div className="App">
        {this.state.isEditorMode ? (
          <header className="App-header">
            <h1 className="App-title">Image Eraser</h1>
          </header>
        ) : null}

        {this.state.isEditorMode ? (
          <p className="App-intro">
            Allow users to erase an image with their mouse or touch gestures, exposing a different image behind it.
          </p>
        ) : null}


        <div className="image-container" style={{ backgroundImage: `url("${this.state.backImage}")`}}>
          <img src={this.state.frontImage} id="front-image" />
        </div>
        <div className="controls">
          <button className="reset" onClick={() => window.$('#front-image').eraser('reset')}>
            Reset
          </button>
          {this.state.isEditorMode ? (
            <div className="form">
              <h2>Change Images</h2>
              You can replace the images with links to the pictures you want to use.  For best results, the two images should be the same size.
              <br /><br />
              The dimensions of the front image will be used to set the size of the overall effect
              <br /><br />
              <label>Front Image</label>
              <br />
              <input placeholder="e.g. https://ichef.bbci.co.uk/images/p05v9gb1.jpg" value={this.state.frontImageNew} onChange={e => this.setState({ frontImageNew: e.target.value })} />
              <br />
              <label>Back Image</label>
              <br />
              <input placeholder="e.g. https://ichef.bbci.co.uk/images/p05v9gb1.jpg" value={this.state.backImageNew} onChange={e => this.setState({ backImageNew: e.target.value })}/>
              <br />
              <button onClick={this.setImages.bind(this)}>Set Images</button>
              <button>Clear</button>
            </div>
            ) : null}

            {this.state.isEditorMode ? (
            <div className="share">
              <h2>Share</h2>
              Use this link to show your creation without the editor controls
              <br /><br />
              <input readOnly value={this.getLink(true)} />
              <br />
              <a href={this.getLink(true)} target="_blank">Preview</a>
              <div className="footer">Internal R&D Project Created by BBC Rewind in Belfast</div>
            </div>
            ) : null}
        </div>
      </div>
    );
  }
}


function param(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default App;
