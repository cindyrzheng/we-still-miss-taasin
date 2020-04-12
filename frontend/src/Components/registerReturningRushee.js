import React, { Component } from 'react';
import './styles.css';
import Flexbox from 'flexbox-react';
import { Form, Container, Button} from 'react-bootstrap';
import ProfileSnapshot from './profileSnapshot.js';
import ErrorProfile from './ErrorProfile.js';
import axios from 'axios';


export default class RegisterReturningRushee extends React.Component {
    constructor(props) {
      super(props);
      this.state = {email:'', user:{name: 'Taasin Saquib', email: 'taasin.saquib@gmail.com', year: '4th', major: 'CSE'}, profile:null};
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }

      handleEmailChange(event) {
        this.setState({email: event.target.value});
      }

      handleSearch(event)
      {
        //console.log("searchin");        
        this.setState({profile:<ProfileSnapshot user = {this.state.user}/>});
        axios.get("localhost:3005/rushee/getRushee", {
          "headers": {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          "data": {"email": this.state.email}
        })
        .then(res => {
          console.log(res);
          res = JSON.parse(res);
        });
        event.preventDefault();
        /*if(res.Status !== "Error")
          {
            this.setState({user:res});
            this.setState({profile:<ProfileSnapshot user = {this.state.user}/>});
          }
          else
          this.setState({profile:<ErrorProfile/>});*/
      }


    render() 
    {
      return (
        <div className='fullscreen'>
        <Flexbox alignContent="center" flexDirection="column">
              <h1 style={{color:'#F1B348', justifyContent:'center'}}>
                  RETURNING RUSHEE 
              </h1>
              <Flexbox alignContent="center" flexDirection="row" minHeight="590" width ="832">
              <Container style={{ paddingLeft: 10, paddingRight: 20 }} >
              <Flexbox flexDirection="column" minHeight="590" spaceAround="20">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange}  />
                    </Form.Group>
                    <Button variant="outline-primary" type="submit" color="#39BCA9" onClick={this.handleSearch} >
                      Search
                    </Button>
                </Form>
              </Flexbox>
                <div className='form-container'>
                    {this.state.profile}
                </div>
              </Container>
              </Flexbox>
              </Flexbox>
              </div>
         
      );
    }
}
