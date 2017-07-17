import "../css/deleteButton.css";

import React from 'react';
import { DeleteUser } from '../clients/ApiClient';

export default class DeleteUserButton extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){

		DeleteUser(this.props.token, this.props.userId).then(result => {
			this.props.onClick();
		}).catch(err => {
			alert(err);
		})
	}

	render(){
		return (
			<button id="deleteButton" onClick={this.handleClick}>Delete</button>
		)
	}
}