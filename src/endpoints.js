class ApiEndpoints{
    
    constructor(){

        /** 
         * Production & Mock Local Server Endpoints
         * Run mock server:
         * via scripts, `npm run mockserver-start` or manually `REACT_APP_API_ENDPOINTS=mockserver npm start`
         */
        if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_API_ENDPOINTS === 'mockserver') {
          
            this.endpointList = {
                agent_register : '/api/registration',
                agent_login: '/api/login',
                agent_deregister: '/api/deregister'
                agent_suspend: 'agent_suspend'
            }
        }
        else {

        	this.endpointList = {
                agent_register : '/api/registration.json',
                agent_login: '/api/login.json',
                agent_deregister: '/api/deregister.json'
                agend_suspend: 'agend_suspend.json'
            }
    	}
    }

    returnEndpoints(){
        return this.endpointList;
    }

}

export default ApiEndpoints;