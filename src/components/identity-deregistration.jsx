import React from 'react';
import $ from 'jquery';
import ApiEndpoints from '../endpoints.js';
import {Button} from 'react-bootstrap';

let api_endpoints = new ApiEndpoints();
const ENDPOINTS = api_endpoints.returnEndpoints();

class LoadingButton extends React.Component{

   constructor(props) {
      super(props);

      this.buttonValState = {
         default: 'Deregister Identity',
         loading: 'Deregistering Identity...',
         success: 'Deregistered'
      }

      this.state = {
         data                : {},
         result              : '',
         errors              : [],
         buttonValue         : this.buttonValState.default,
         regId               : '1234567891011',
         agentStatus         : true,
         disabled           : false
      };
   }

   handleClick = (e) => {

      this.setState({
         disabled: true,
         buttonValue: this.buttonValState.loading
      });

      var deregsiterData = {
         'regId' : this.state.regId
      }

      $.ajax({
         url: ENDPOINTS.agent_deregister,
         dataType: 'json',
         type: 'GET',
         data: deregsiterData,
         success: function(data) {
            
            setTimeout(() => {
               
               this.setState({
                  data: data,
                  result: data.status,
                  buttonValue: this.buttonValState.success
               });

            }, 2000);

         }.bind(this),
         error: function(xhr, status, err) {
            
            setTimeout(() => {
               
               this.setState({
                    result: 'Could not deregister identity. Please try again!',
                    buttonValue: this.buttonValState.default,
                    disabled: false
                });

               console.error(status, err.toString());
            }, 2000);

         }.bind(this)
      });

   }

   render() {

      return (
         <div>
            
            {console.log(this.state.result)}

            <Button bsStyle="primary" disabled={this.state.disabled} onClick={this.handleClick}>
               {this.state.buttonValue}
            </Button>
         </div>
      );
   }

};

export default LoadingButton;