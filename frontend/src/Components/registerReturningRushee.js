import React, { Component } from 'react';
import Select from 'react-select';
import RusheePicture from './rusheePicture';
import './styles.css';
import camera from './camera.js'
import Flexbox from 'flexbox-react';
import { Form, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ProfileSnapshot from './profileSnapshot.js';
const years = [
    { value: 'Freshman', label: 'Freshman' },
    { value: 'Sophomore', label: 'Sophomore' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Senior', label: 'Sophomore' },
    { value: 'Other', label: 'Other'}
  ];

export default class RegisterReturningRushee extends React.Component {
    constructor(props) {
      super(props);
      this.state = {email:'', user:{name: 'John Smith', email: '', year: 'Other', major: 'Undecided'}, profile:null};
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }


      handleEmailChange(event) {
        this.setState({email: event.target.value});
      }

      handleSearch(){
        this.setState({user: this.state.email});
        if (this.state.use != ' ')
        {
            this.state.profile = <ProfileSnapshot user = {this.state.user}/>
        }

      }


    render() 
    {
      return (
        <div>
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
