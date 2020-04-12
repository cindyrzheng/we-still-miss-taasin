import React, { Component } from 'react';
import {Button, Card } from 'react-bootstrap';
import Flexbox from 'flexbox-react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class ErrorProfile extends React.Component {
    constructor(props) {
      super(props);
    }
    render(){
    return(
        <Card>
        <h2>Error: User not found</h2>
        </Card>
    );
}
}