import React from 'react';
import $ from 'jquery';
import ApiEndpoints from '../endpoints.js';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Panel, Alert} from 'react-bootstrap';

var api_endpoints = new ApiEndpoints();
const ENDPOINTS = api_endpoints.returnEndpoints();

class RegistrationForm extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            registrantFirstName : '',
            registrantLastName  : '',
            registrantEmail     : '',
            registrantMobile    : '',
            registrantUsername  : '',
            registrantPassword  : '',
            data                : {},
            result              : '',
            errors              : []
        };
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    getValidationState = (id) => {
        var fieldValue = this.state[id];
        if(fieldValue !== undefined){
            
            const length = fieldValue.length;
        
            if (length > 10)
                return 'success';
            else if (length > 5)
                return 'warning';
            else if (length > 0)
                return 'error';
        }
    }

    validateEmail = (id) => {
        var fieldValue = this.state[id];
        
        if(fieldValue === '' || fieldValue === undefined)
            return;

        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(re.test(fieldValue))
            return 'success';
        else
            return 'error';
    }

    onSubmit = (e) => {
    
        e.preventDefault();

        var registrantData = {
            'fname' : this.state.registrantFirstName,
            'lname' : this.state.registrantLastName,
            'email' : this.state.registrantEmail,
            'mobile' : this.state.registrantMobile,
            'username' : this.state.registrantUsername,
            'password' : this.state.registrantPassword
        }

        $.ajax({
            url: this.props.endpoint,
            dataType: 'json',
            type: 'GET',
            data: registrantData,
            success: function(data) {
                //We set the state again after submission, to update with the submitted data

                console.log('');

                if(data.regId){
                    var result = <Alert bsStyle="success">Your account was sucessfully created with ID: {data.regId}</Alert>;

                    this.setState({
                        data: data,
                        result: result,
                        errors: errors,
                        registrantFirstName : '',
                        registrantLastName  : '',
                        registrantEmail     : '',
                        registrantMobile    : '',
                        registrantUsername  : '',
                        registrantPassword  : ''
                    });
                }
                
                if(data.error){
                    
                    var result = <Alert bsStyle="danger">Oops, something went wrong!</Alert>; 
                    var errors = data.errors;

                    this.setState({
                        result: result,
                        errors: errors
                    });
                }

                console.log(this.state);

            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({
                    result: err
                });
                
                console.error(this.props.endpoint, status, err.toString());
            }.bind(this)
        });

    }

    generateField(id, label, type, value, placeholder, handler, validation, helpMsg) {

        return (       
            <FormGroup controlId={id} validationState={validation}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={handler}
                    />
                {helpMsg && <HelpBlock>{helpMsg}</HelpBlock>}
            </FormGroup>
        );
    }
    
    render(){

        return(

            <form onSubmit={this.onSubmit}>

                {this.state.result}

                {this.generateField(
                    'registrantFirstName',
                    'Name',
                    'text',
                    this.state.registrantFirstName, 
                    '',
                    this.handleChange,
                    //this.handleChange,
                    //this.getValidationState('registrantName')
                )}

                {this.generateField(
                    'registrantLastName',
                    'Surname',
                    'text',
                    this.state.registrantLastName, 
                    '',
                    this.handleChange,
                    //this.handleChange,
                    //this.getValidationState('registrantName')
                )}

                {this.generateField(
                    'registrantEmail',
                    'Email',
                    'email',
                    this.state.registrantEmail, 
                    '',
                    this.handleChange,
                    //this.handleChange,
                    this.validateEmail('registrantEmail')
                )}

                {this.generateField(
                    'registrantMobile',
                    'Mobile No.',
                    'text',
                    this.state.registrantMobile, 
                    '',
                    this.handleChange,
                    //this.handleChange,
                    //this.getValidationState('registrantName')
                )}

                {this.generateField(
                    'registrantUsername',
                    'Username',
                    'text',
                    this.state.registrantUsername, 
                    '',
                    this.handleChange,
                    //this.handleChange,
                    //this.getValidationState('registrantName')
                )}

                {this.generateField(
                    'registrantPassword',
                    'Password',
                    'text',
                    this.state.registrantPassword, 
                    '',
                    this.handleChange,
                    //this.handleChange,
                    //this.getValidationState('registrantName')
                )}

                <Button type="submit">
                    Submit
                </Button>

            </form>
        );
    }
}

class DisplayRegisterForm extends React.Component{

    render() {
        return(

            <Panel>
                <h1>Register</h1>
                <p>&nbsp;</p>
                <RegistrationForm endpoint={ENDPOINTS.agent_register} />
            </Panel>  
        );
    }
}

export default DisplayRegisterForm;