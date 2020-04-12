import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import {Background} from './Images/space.png'
import Flexbox from 'flexbox-react';
import {Link} from 'react-router-dom';
export default class CheckIn extends React.Component {
    render() 
    {
      return (
        <div style={{backgroundImage: `url(${Background})`}}>
        <h1 style={{color:'#F1B348', justifyContent:'center'}}>
        SIGMA ETA PI
        </h1>
        <h1 style={{color:'#F1B348', justifyContent:'center'}}>
        FALL 20 RUSH
        </h1>
        <Flexbox alignContent="center" flexDirection="row" minHeight="590">
        <Container style={{ paddingLeft: 20, paddingRight: 10}}>
        <Link to="/new">
            <Button variant="outline-primary" color="#39BCA9">
            NEW</Button>
        </Link>
        </Container>
        <Container style={{ paddingLeft: 20, paddingRight: 10}}>
        <Link to="/returning">
            <Button variant="outline-primary" color="#39BCA9" >RETURNING</Button>
            </Link>
        </Container>
        </Flexbox>
        
        </div>
      );
    }

}