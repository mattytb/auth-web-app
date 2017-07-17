import "../css/content.css";
import React from 'react';

export default class Content extends React.Component {
	render(){
		return (
			<div id="content">
				<div className="inner">
					<div className="bgWrap">
						<h2>Welcome</h2>
						<p>This site is an example of using Facebook login with an API</p>
						<p>It uses React.js and Node.JS</p>
						<p>There will also be a React Native app for both iOS and Android to follow</p>
						<h3>On Login</h3>
						<p>On login you will be able to see a list of dummy users and users who have also logged in to the app</p>
					</div>
				</div>
			</div>
		);
	}
}