import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyD_3WCAhwNv6iNwfeJnAFlJtaNHc3SczB8",
    authDomain: "crwn-db-2f313.firebaseapp.com",
    projectId: "crwn-db-2f313",
    storageBucket: "crwn-db-2f313.appspot.com",
    messagingSenderId: "760264863351",
    appId: "1:760264863351:web:a21e8194c06a1c0846e072",
    measurementId: "G-RC04E4VZ3B"
};

export const createUserProfiledocument = async (userAuth, additionalData) => {
	if (!userAuth) return ;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	
	if (!snapShot.exists){
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		}catch(error){
			console.log('error creating user.', error.message);
		}
	}
	return userRef;
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;


