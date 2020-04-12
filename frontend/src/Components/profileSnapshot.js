import React, { Component } from 'react';
import {Button, Card } from 'react-bootstrap';
import Flexbox from 'flexbox-react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class ProfileSnapshot extends React.Component {
    constructor(props) {
      super(props);

      console.log(props);

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      axios.get("http://localhost:3005/rushee/signIn", {
        "headers": {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        "params": {"email": this.props.user.email}
      })
      .then(res => {
        if(res.data.Status != "Success"){
          alert(res.data.Message);
        }
        else{
          // todo
          // this.props.history.replace('/thanks')
          // update state, res has the user or an error message
        }
      });
    }

    render(){
    return(
        <Card>
          <h2>Name: {this.props.user.firstName} {this.props.user.lastName}</h2>
          <h2>Email: {this.props.user.email}</h2>
          <h2>Year: {this.props.user.year}</h2>
          <h2>Major: {this.props.user.major}</h2>
          
          <Link to="/thanks">
            <Button onClick={this.handleSubmit}>CONFIRM ATTENDANCE</Button>
          </Link>
        </Card>
    );
}
}
