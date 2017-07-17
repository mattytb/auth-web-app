import Axios from 'axios';
import {Settings} from '../../settings';

export function GetFacebookUser(accessToken){
		return new Promise((resolve, reject) => {

				Axios.post(`${Settings.ApiBaseUri}${Settings.GetFacebookUserUri}`, {accessToken : accessToken})
				.then(user => resolve(user))
				.catch(err => reject(err));

		});
}

export function GetUserStatus(token, userId){
		return new Promise((resolve, reject) => {

			Axios.post(`${Settings.ApiBaseUri}${Settings.GetUserStatus}`, {token : token, userId:userId})
			.then(response => resolve(response))
			.catch(err => reject(err));

	});
}

export function GetUsers(token, userId){
	return new Promise((resolve, reject) => {

			Axios.get(`${Settings.ApiBaseUri}${Settings.GetUsers}?token=${token}&userId=${userId}`)
			.then(users => resolve(users))
			.catch(err => reject(err));

	});
}

export function DeleteUser(token, userId){
	return new Promise((resolve, reject) => {

			Axios.delete(`${Settings.ApiBaseUri}${Settings.DeleteUser}/${userId}`, 
				{ 
					data :{ token:token, userId:userId }
				}
			)
			.then(userId => resolve(true))
			.catch(err => reject(err));
	});
}