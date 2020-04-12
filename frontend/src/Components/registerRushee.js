import React from 'react';
import Select from 'react-select';
import RusheePicture from './rusheePicture';
import './styles.css';
import camera from './camera.js'
import Flexbox from 'flexbox-react';
import { Form, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

const years = [
    { value: '1'     , label: 'Freshman'},
    { value: '2'     , label: 'Sophomore'},
    { value: '3'     , label: 'Junior'},
    { value: '4'     , label: 'Senior'},
    { value: 'Other' , label: 'Other'}
  ];

export default class RegisterRushee extends React.Component {
    constructor(props) {
      super(props);
      this.state = {firstName: '', lastName: '', email: '', year: 'Other', major: ''};
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleMajorChange = this.handleMajorChange.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFirstNameChange(event) {
      this.setState({firstName: event.target.value});
    }

    handleLastNameChange(event) {
      this.setState({lastName: event.target.value});
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
      axios.post("http://localhost:3005/rushee/create", {
        "headers": {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        "body": {
          "firstName": this.state.firstName, 
          "lastName": this.state.lastName, 
          "major": this.state.major, 
          "year": this.state.year, 
          "email": this.state.email
        }
      })
      .then(res => {
        if(res.data.Status !== "Success"){
          alert(res.data.Message);
        }
        else{
          this.props.history.replace('/thanks')
        }
      })
      .catch(err => {
        alert(err);
      });
      // alert('A Profile was submitted: ' + this.state.name + this.state.major + this.state.year);
      
      event.preventDefault();
    }

    render() 
    {
      
      return (
        <div className="background_solid">
        <Flexbox alignContent="center" flexDirection="column">
          <h1 style={{color:'#F1B348', justifyContent:'center'}}>
              NEW RUSHEE
          </h1>
            <Flexbox alignContent="center" flexDirection="row" minHeight="590" width ="832">
              <Container style={{ paddingLeft: 20, paddingRight: 10}} >
                <Flexbox flexDirection="column" minHeight="590">
                  {camera.startCamera()}
                  <RusheePicture/>
                </Flexbox>
              </Container>
              <Container style={{ paddingLeft: 10, paddingRight: 20 }} >
                <Flexbox flexDirection="column" minHeight="590" spaceAround="20">
                    <Form>
                        <Form.Group controlId="formName">
                          <Form.Label className="title">First Name</Form.Label>
                          <Form.Control type="text" placeholder="Sigma Eta" onChange={this.handleFirstNameChange} />
                        </Form.Group>
                        <Form.Group controlId="formName">
                          <Form.Label className="title">Last Name</Form.Label>
                          <Form.Control type="text" placeholder="Pi" onChange={this.handleLastNameChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label className="title">Email address</Form.Label>
                          <Form.Control type="email" placeholder="sigmaEtaPi@sep.com" onChange={this.handleEmailChange}  />
                        </Form.Group>
                        <Form.Group controlId="formMajor">
                          <Form.Label className="title">Major</Form.Label>
                          <Form.Control type="text" placeholder="Cognitive Science"  onChange={this.handleMajorChange} />
                        </Form.Group>
                        <Form.Group controlId='Year'>
                          <Form.Label className="title">Year</Form.Label>
                          <Select options={years} onChange={this.handleSelectChange}  defaultValue={years[4]}/>
                        </Form.Group>
                    </Form>
                </Flexbox>
              </Container>
              </Flexbox>
              </Flexbox>

              <Link to="/checkin">
                <Button variant="outline-primary" type="submit" color="#39BCA9" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Link>
              </div>
         
      );
    }
}
