import React from 'react';
import {Form, Button} from 'react-bootstrap';
import ProfileSnapshot from './profileSnapshot.js';
import ErrorProfile from './ErrorProfile.js';
import axios from 'axios';

import './styles.css';
import './returningRushee.css';

export default class RegisterReturningRushee extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email:'', 
        user:{name: 'Taasin Saquib', email: 'taasin.saquib@gmail.com', year: '4th', major: 'CSE'}, 
        profile: []
      };
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }

    handleEmailChange(event) {
      this.setState({email: event.target.value});
    }

    handleSearch(event)
    {
      //console.log("searchin");        
      
      axios.get("http://localhost:3005/rushee/getRushee", {
        "headers": {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        "params": {"email": this.state.email}
      })
      .then(res => {
        if(res.data.Status !== "Success"){
          alert(res.data.Message);
        }
        console.log(res.data.Data);
        if(res.data.Data.length === 0){
          console.log("hi");
        }
        else{
          // todo - map Data to ProfileSnapshot
          const userList = res.data.Data.map((rushee) => 
            <ProfileSnapshot user = {rushee}/>
          );
          this.setState({profile: userList});
          // this.setState({user:res.data.Data[0]});
          // this.setState({profile:<ProfileSnapshot user = {this.state.user}/>});
        }
      })
      .catch(err => {
        alert(err);
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
        <div className='background_solid'>

          <h1 className="title">RETURNING RUSHEE </h1>
          <h3 className="title">We're happy to have you back!</h3>

            
              <Form id="searchContainer">

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange} />
                </Form.Group>
                <Button variant="outline-primary" type="submit" color="#39BCA9" onClick={this.handleSearch}>Search</Button>

              </Form>
            
              <div className='form-container'>
                  {this.state.profile}
              </div>

            </div>
         
      );
    }
}
