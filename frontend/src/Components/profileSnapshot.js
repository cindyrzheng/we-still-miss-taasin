import React, { Component } from 'react';
import {Button, Card } from 'react-bootstrap';
import Flexbox from 'flexbox-react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class ProfileSnapshot extends React.Component {
    constructor(props) {
      super(props);
    }

    // post to backend /rushees/checkIn, with email
    // axios.get("localhost:3005/rushee/getRushee", {
    //   "headers": {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //   },
    //   "data": {"email": this.state.email}
    // })
    // .then(res => {
    //   console.log(res);
    //   // update state, res has the user or an error message
    // })

    render(){
    return(
        <Card>
        <h2>Name:
         {this.props.user.name}</h2>
        <h2>Major: {this.props.user.major}</h2>
        <h2>Year: {this.props.user.name}</h2>
        <Link to="/thanks">
        <Button>CONFIRM ATTENDANCE</Button>
        </Link>
        </Card>
    );
}
}
