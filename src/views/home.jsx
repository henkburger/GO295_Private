import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import DisplayRegisterForm from '../components/registration-form';
import LoginForm from '../components/login-form';
import LoadingButton from '../components/identity-deregistration';
import SuspendButton from '../components/identity-suspend';

class HomePage extends React.Component {

	render(){

		return(

			<Grid>
				<Row>
					
					<Col xs={12} md={6}>
						<LoginForm />

						<LoadingButton />
						<SuspendButton />
					</Col>
					
					<Col xs={12} md={6}>
						<DisplayRegisterForm />
					</Col>

				</Row>
			</Grid>

		);
	}
}

export default HomePage;