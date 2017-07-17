const storage_key = "MTB_FB_USER";

export function createUser(token, id, name, image){

		const user = {token:token, id:id, name:name, image:image};
		const stringifiedUser = JSON.stringify(user);

		localStorage.setItem(storage_key, stringifiedUser);
}

export function getUser(){

		const user = localStorage.getItem(storage_key);
		return JSON.parse(user);
}

export function deleteUser(){
		localStorage.removeItem(storage_key);
}