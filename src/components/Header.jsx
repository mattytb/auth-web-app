import "../css/header.css";

import React from 'react';
import FacebookButton from './FacebookButton';
import LoggedInSection from './LoggedInSection';
import Spinner from './Spinner';

export default class Header extends React.Component {

	constructor(props) {
      super(props);
   	}

	render(){

		let headerActions = null;

		if(this.props.loggedIn){
			headerActions = <LoggedInSection onClick={() => this.props.onLogoutClick()} user={this.props.user}/>;
		}
		else if(this.props.loggedIn === null){
			headerActions = <Spinner />;
		}
		else {
			headerActions = <FacebookButton onClick={() => this.props.onLoginClick()}/>;
		}

		return (
			<div id="header">
				<div className="inner">
					<span id="logo"></span>
					<div id="logoCell">
						<h1>Authenticate</h1>
						<span>Facebook login with an api</span>
					</div>
					{headerActions}
				</div>
			</div>
		);
	}
}