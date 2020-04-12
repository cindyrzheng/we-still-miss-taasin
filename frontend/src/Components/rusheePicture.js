import React, { Component } from 'react';
import camera from './camera.js';
import {Button, Card } from 'react-bootstrap';
import Flexbox from 'flexbox-react';
export default class RusheePicture extends React.Component {
    constructor(props) {
      super(props);
      this.takePicture = this.takePicture.bind(this);
    }

    takePicture()
    {
      camera.startCamera();
      camera.takeSnapshot();
      camera.takePicture();
    }
    render() 
    {
      return (
        <Flexbox flexDirection="column" height="590" width ="418"> s
          <Button variant='outline-primary' onClick={this.takePicture}>
             Take Picture
          </Button>
        </Flexbox>
      );
    }
}
