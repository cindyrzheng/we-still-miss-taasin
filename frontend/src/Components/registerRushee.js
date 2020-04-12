import React, { Component } from 'react';
import Select from 'react-select';
import RusheePicture from './rusheePicture';
import './styles.css';
import camera from './camera.js'
import Flexbox from 'flexbox-react';
import { Form, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

const years = [
    { value: 'Freshman', label: 'Freshman' },
    { value: 'Sophomore', label: 'Sophomore' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Senior', label: 'Sophomore' },
    { value: 'Other', label: 'Other'}
  ];

export default class RegisterRushee extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: '', email: '', year: 'Other', major: ''};
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleMajorChange = this.handleMajorChange.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
      this.setState({name: event.target.value});
    }

    handleMajorChange(event) {
        this.setState({major: event.target.value});
      }

      handleEmailChange(event) {
        this.setState({email: event.target.value});
      }

    handleSelectChange(event) {
        console.log(event);
        this.setState({year: event.value});
      }
  
    handleSubmit(event) {
      camera.vidOff();
      axios.post("localhost:3005/rushee/create", {
        "headers": {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        "data":{"firstName": this.state.name, "major": this.state.major, "year": this.state.year, "email": this.state.email}
      })
      .then(res => {
        console.log(res);
      })
      // alert('A Profile was submitted: ' + this.state.name + this.state.major + this.state.year);
      this.props.history.replace('/thanks')
      event.preventDefault();
    }

    render() 
    {
      camera.startCamera();
      return (
        <div>
        <Flexbox alignContent="center" flexDirection="column">
              <h1 style={{color:'#F1B348', justifyContent:'center'}}>
                  NEW RUSHEE
              </h1>
              <Flexbox alignContent="center" flexDirection="row" minHeight="590" width ="832">
                <Container style={{ paddingLeft: 20, paddingRight: 10}} >
              <Flexbox flexDirection="column" minHeight="590">
                <RusheePicture/>
              </Flexbox>
              </Container>
              <Container style={{ paddingLeft: 10, paddingRight: 20 }} >
              <Flexbox flexDirection="column" minHeight="590" spaceAround="20">
                <Form>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Name"  onChange={this.handleNameChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange}  />
                    </Form.Group>
                    <Form.Group controlId="formMajor">
                      <Form.Label>Major</Form.Label>
                      <Form.Control type="text" placeholder="Major"  onChange={this.handleMajorChange} />
                    </Form.Group>
                    <Form.Group controlId='Year'>
                    <Select options={years} onChange={this.handleSelectChange}  defaultValue={years[4]}/>
                    </Form.Group>
                    <Link to="/checkin">
                    <Button variant="outline-primary" type="submit" color="#39BCA9" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  </Link>
                </Form>
              </Flexbox>
              </Container>
              </Flexbox>
              </Flexbox>
              </div>
         
      );
    }
}
