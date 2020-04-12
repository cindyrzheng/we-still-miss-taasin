import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import './checkIn.css';

export default class CheckIn extends React.Component {
  render() 
  {
    return (
      <div id="background_checkIn">

        <div id="textContainer">
          <h1 className="title">SIGMA ETA PI</h1>
          <h1 className="title">FALL 20 RUSH</h1>
        </div>

        <div id="buttonContainer">

          <Link to="/new">
              <Button variant="outline-primary" color="#39BCA9">NEW</Button>
          </Link>

          <Link to="/returning">
            <Button variant="outline-primary" color="#39BCA9">RETURNING</Button>
          </Link>

        </div>
      
      </div>
    );
  }
}