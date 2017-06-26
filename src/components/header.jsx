import React from 'react';
import logo from '../logo.svg';
import Navigation from './navigation';

class Header extends React.Component {

	render(){

		return(

			<div className="header">
				<Navigation />
			</div>

		);
	}
}

export default Header;