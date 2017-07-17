import React from 'react';
import "../css/loggedInSection.css";

export default function LoggedInSection(props){
	return (
		<div id="loggedInSection">
			<img src={props.user.image}/>
			<div className="innerWrap">
				<span>Welcome, {props.user.name}</span>
				<a className="facebookLogoutButton" onClick={() => props.onClick()}>Log out</a>
			</div>
		</div>
	);
};

