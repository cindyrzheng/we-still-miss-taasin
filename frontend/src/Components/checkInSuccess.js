import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import {background} from './Images/space.png'
import Flexbox from 'flexbox-react';
import {Link} from 'react-router-dom';
import './styles.css';
export default class WelcomeScreen extends React.Component {
    render() 
    {
      return (
        <div className="fullscreen">
        <h1 style={{color:'#F1B348', justifyContent:'center'}}>
        THANK YOU!
        </h1>
        <h2 style={{color:'#F1B348', justifyContent:'center'}}>
        You're all set...have fun tonight!
        </h2>
        <Flexbox alignContent="center" flexDirection="row" minHeight="590">
        <Container style={{ paddingLeft: 20, paddingRight: 10}}>
        <Link to="/checkin">
            <Button variant="outline-primary" color="#39BCA9">
            BACK TO CHECK IN</Button>
        </Link>
        </Container>
        </Flexbox>
        
        </div>
      );
    }

}
