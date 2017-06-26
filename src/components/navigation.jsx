import React from 'react';
import {withRouter, Link} from 'react-router-dom'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class NavItemWithoutRouter extends React.Component {
 
	constructor(props) {
		super(props);
		this.handleLink = this.handleLink.bind(this);
	}
    
    handleLink(path) {
        this.props.history.push(path);
    }

    render() {
        const { to, eventKey, children, onSelect, location } = this.props;
	    return (
	        <NavItem eventKey={eventKey} active={location.pathname === to} onSelect={onSelect} onClick={()=>this.handleLink(to)}>
	            {children}
	        </NavItem>
	    );
    }
}

const RouterNavItem = withRouter(NavItemWithoutRouter)


class NavigationStructure extends React.Component {

	render(){

		return (
			
			<Navbar fixedTop collapseOnSelect>
	
				<Navbar.Header>
			    	
			    	<Navbar.Brand>
			    		<Link to="/">BackOffice GO</Link>
			      	</Navbar.Brand>

			    	<Navbar.Toggle />

			    </Navbar.Header>
			    
			    <Navbar.Collapse>
			    
			      	<Nav pullRight>
			        	<RouterNavItem eventKey={1} to="/">
			        		<FontAwesome name='tachometer' /> Dashboard
			        	</RouterNavItem>
			        	<RouterNavItem eventKey={1} to="/customer-search">
			        		<FontAwesome name='search' /> Customer Search
			        	</RouterNavItem>
			        	<RouterNavItem eventKey={1} to="/customer-feedback">
			        		<FontAwesome name='comments' /> Customer Feedback
			        	</RouterNavItem>
			        	<RouterNavItem eventKey={1} to="/agents">
			        		<FontAwesome name='users' /> Support Agents
			        	</RouterNavItem>
			        	<NavDropdown eventKey={3} title={<span><i className="fa fa-user fa-fw"></i> `LoginName`</span>} id="basic-nav-dropdown">
				        	<RouterNavItem eventKey={1} to="/">Home</RouterNavItem>
				        	<RouterNavItem eventKey={1} to="/hello">Sample Page</RouterNavItem>
				        	<MenuItem divider />
				        	<MenuItem eventKey={3.3}>Separated link</MenuItem>
			        	</NavDropdown>
			    	</Nav>

				</Navbar.Collapse>

			</Navbar>
		);
	}
}

class Navigation extends React.Component {
	
	render(){

		return(
			
			<div className="row">
            	<div className="col-md-12">
            		<NavigationStructure />
            	</div>
            </div>
		);
	}
}

export default Navigation;