import "../css/content.css";
import "../css/showUsers.css";

import React from 'react';
import { GetUsers } from '../clients/ApiClient';
import { Redirect } from 'react-router-dom';
import Spinner from './Spinner';
import DeleteUserButton from './DeleteUserButton';


export default class ShowUsers extends React.Component {

	constructor(props) {

		super(props);
		this.state = {
			users:null,
			error:null
		}
  	}

  	componentDidMount() {
		GetUsers(this.props.user.token, this.props.user.id)
		.then(response => {
			this.setState({users:response.data});
		}).catch(err => {
			this.setState({error :true})
		});
  	}

  	render(){
		
		var users = null;

		if(this.state.error){
			users = <Redirect to="/" />
		}
		else if(this.state.users){

			users = <ul>
			{ this.state.users.map((user, index) => {
			 	return (

			 		<li key={index}>
			 			<img src={user.image} alt={user.name}/> 
			 			<span>{user.name}</span>
			 			{this.props.user.id === user.id ? <DeleteUserButton userId={user.id} token={this.props.user.token} onClick={() => this.props.onLogoutClick()} /> : null }
			 		</li>
		 		) 
			})} </ul>
		}
		else {
			users = <Spinner />;
		}
		
		return (
			<div id="content">
				<div className="inner">
					<div className="bgWrap users">
						{users}
					</div>
				</div>
			</div>
		);
	}
}