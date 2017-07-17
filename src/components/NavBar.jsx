import "../css/navBar.css";
import React from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends React.Component {

	constructor(props) {
      super(props);
   	}

	render(){

		let showLink = "hide";
		this.props.loggedIn ? showLink = "show" : showLink = "hide";

		return (
			<div id="navBar">
				<div className="inner">
					<ul>
						<li>
							<NavLink exact to="/" activeClassName="selected">Home</NavLink>
						</li>
						<li>
							<NavLink to="/showUsers" activeClassName="selected" className={showLink}>Users</NavLink>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}