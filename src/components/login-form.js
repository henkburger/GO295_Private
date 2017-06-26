import React from 'react';
import $ from 'jquery';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Panel} from 'react-bootstrap';

class LoginForm extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            registrantUsername  : '',
            registrantPassword  : '',
            data                : {},
            result              : ''
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
                this.setState({
                    data: data,
                    result: data.status,
                    registrantUsername  : '',
                    registrantPassword  : ''
                });

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

                <span>{this.state.result}</span>

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
                    Login
                </Button>

            </form>
        );
    }
}

class DisplayLoginForm extends React.Component{

    render() {
        return(

            <Panel>
                <h1>Login</h1>
                <p>&nbsp;</p>
                <LoginForm endpoint='/api/login'/>
            </Panel>
        );
    }
}

export default DisplayLoginForm;