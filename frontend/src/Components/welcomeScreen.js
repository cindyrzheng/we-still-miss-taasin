import React from 'react';
import { Button} from 'react-bootstrap';
import logo from './SEP_logo.svg';
import {Link} from 'react-router-dom';
import axios from 'axios';

import './styles.css';

export default class WelcomeScreen extends React.Component {

  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    axios.get("http://localhost:3005/permission", {
      "headers": {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
    .then(res => {
      console.log(res);
    });
  }

  render() 
  {
    return (
      <div className="background_solid">

        <img src={logo} alt="Phoenix"/>

        <div id="buttonContainer">

          <Link to="/checkin">
              <Button variant="outline-primary" color="#39BCA9">CHECK IN</Button>
          </Link>


          <Button variant="outline-primary" color="#39BCA9" onClick={this.handleSubmit}>SLIDE DECK</Button>

        </div>

      </div>
    );
  }
}