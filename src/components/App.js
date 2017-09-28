import "../css/app.css";
import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import {createUser, getUser, deleteUser } from '../modules/Storage';
import { Settings } from '../../settings';
import { GetFacebookUser, GetUserStatus } from '../clients/ApiClient';

import Content from './Content';
import ShowUsers from './ShowUsers';

export default class App extends React.Component {

	constructor(props) {

  		super(props);

      this.state = {
          loggedIn:null,
          user : null,
          fireRedirect:false
      }

      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

	componentDidMount() {

      window.fbAsyncInit = function() {
        console.log('facebook loaded');
         FB.init({
            appId      : Settings.FBAppId,
            cookie     : true,  
            xfbml      : true,  
            version    : 'v2.1' 
         });

         FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
         }.bind(this));

      }.bind(this);

      (function(d, s, id) {
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) return;
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

     var user = getUser();

     if(user){
          GetUserStatus(user.token, user.id).then(result => {
            if(!result.data.success) {
              this.setState({ loggedIn:false, user:null, fireRedirect:false });
              deleteUser();
            }
            else {
              this.setState({ loggedIn:true, user:user, fireRedirect:false });
            }
          }).catch(err => {
              this.setState({ loggedIn:false, user:null, fireRedirect:false });
              deleteUser();
          });
     }
     else {
        this.setState({ loggedIn:false });
     }
  }

  statusChangeCallback(response) {
      if (response.status === 'connected') {}
      else {
        this.setState({loggedIn:false, user:null, fireRedirect:false});
        deleteUser();
      }
  }

  handleLoginClick() {

    var self = this;
    
    FB.login(function(response){

      GetFacebookUser(response.authResponse.accessToken)
      .then(response => {

          const data = response.data;

          createUser(data.token, data.userId, data.name, data.image);

          self.setState({loggedIn:true, user:getUser(),fireRedirect:true});
      });

    }, {scope: 'email,public_profile', return_scopes: true});
  }

   handleLogoutClick() {
      var self = this;
      FB.logout(function(response){
         deleteUser();
         self.setState({loggedIn:false, user:null, fireRedirect:false});
      });
   }

  render () {

    let headerProps = {
      onLoginClick : this.handleLoginClick,
      loggedIn : this.state.loggedIn, 
      onLogoutClick: this.handleLogoutClick,
      user:this.state.user
    }

    let navBarProps = {
      loggedIn : this.state.loggedIn
    }

    let contactProps = {
      loggedIn : this.state.loggedIn
    }

    let showUsersProps = {
      loggedIn : this.state.loggedIn,
      user : this.state.user,
      onLogoutClick: this.handleLogoutClick
    }

    return (
      <div>
        <Header {...headerProps} />
        <Router>
          <div>
            <NavBar {...navBarProps} />
            <Route path='/' exact component={Content} />
            <PrivateRoute path='/showUsers' component={ShowUsers} {...showUsersProps}  />
            {this.state.fireRedirect ? <Redirect to='/showUsers'/> : null}
          </div>
        </Router>
      </div>
		)
	}
}