
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase-config';
import { useState } from 'react';
import { userContext } from "../../App";
import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

firebase.initializeApp(firebaseConfig)


function LogIn() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    error: '',
    sucess: false
  });

  const [loggedInUser ,setLoggedInuser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL

        }
        setUser(signedInUser)
        console.log(displayName, email, photoURL);
      })
      .catch(err => {
        console.log(err.message);
      })

  }

  const handlesignedOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          password: '',
          photo: '',
        }
        setUser(signedOutUser);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log('signed Out');
  }

  const handleBlur = (e) => {
    console.log(e.target.name, e.target.value);
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

    }
    if (e.target.name === 'password') {
      const isPasswordStrong = e.target.value.length > 6
      const passWordHasNumber = /\d{1}/.test(e.target.value)

      isFieldValid = isPasswordStrong && passWordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

  }
  const handleSubmit = (e) => {

    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.sucess = true;
          setUser(newUserInfo)
          console.log(res);
          updateUserName(user.name)
          setLoggedInuser(newUserInfo)
        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.sucess = false
          setUser(newUserInfo)

        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.sucess = true;
          setUser(newUserInfo)
          console.log('sign in sucessfully', res.user)
          setLoggedInuser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.sucess = false
          setUser(newUserInfo)
        });

    }
    e.preventDefault();
  }
  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
        console.log(result)
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
        console.log(error)
      });
  }
  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,

    })
      .then(() => {
        console.log('user name updates succesfully')
      }).catch((error) => {
        console.log(error)
      });
  }

  return (
    <div style={{textAlign:'center'}}>

      {
        user.isSignedIn ? <button onClick={handlesignedOut}>Sign out</button> :
          <button onClick={handleSignIn}>Sign in</button>
      }
      <button onClick={handleFbSignIn}>Sing in Using facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome , {user.name}</p>
          <p>Your Email {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <h1>Our Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label><br></br>

      <form onSubmit={handleSubmit} action="">

        {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name" />}


        <input type="text" onBlur={handleBlur} name="email" placeholder="your Email" required /><br />
        <input type="password" onBlur={handleBlur} name="password" placeholder="Your password" required /><br />
        <input type="submit" value="submit" />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.sucess && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'loggedIn'}Sucessfully</p>
      }
    </div>
  );
}

export default LogIn;
