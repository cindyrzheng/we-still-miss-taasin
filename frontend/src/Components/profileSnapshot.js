import React, { Component } from 'react';
import {Button, Card } from 'react-bootstrap';
import Flexbox from 'flexbox-react';
import {Link} from 'react-router-dom';
export default class ProfileSnapshot extends React.Component {
    constructor(props) {
      super(props);
    }

    render(){
    return(
        <Card>
        <h2>Name:
         {this.props.name}</h2>
        <h2>Major: {this.props.major}</h2>
        <h2>Year: {this.props.name}</h2>
        <Link to="/thanks">
        <Button>CONFIRM ATTENDANCE</Button>
        </Link>
        </Card>
    );
}
}
