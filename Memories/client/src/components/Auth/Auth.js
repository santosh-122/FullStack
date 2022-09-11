// import React,{useState,useEffect} from 'react';
// import { Avatar, Container, Grid, Paper, TextField, Typography,Button } from '@material-ui/core';
// //import {  Avatar,Button,Paper} from "";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
// import { useDispatch, } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Icon from './icon'
// import Input from './Input';
// import useStyles from './styles'
// import {GoogleLogin} from 'react-google-login'
// import {gapi} from 'gapi-script';

// const Auth = () => {
//     const {showPassword,setShowPassword}=useState(false)
//     const classess=useStyles();
//     const [isSignUp,setIsSignup] = useState(false);
//     const navigate = useNavigate();

//     const clientId="509283662326-tocvkthe6jmitq0taa64t6994smgqrep.apps.googleusercontent.com"

//     const dispatch = useDispatch()
    

//     useEffect(() => {
//       function start() {
//         gapi.client.init({
//           clientId: clientId,
//           scope: "",
//         });
//       };
  
//       gapi.load('client:auth2', start);
//     });

//     // const accessToken = gapi.auth.getToken().access_token;
//     // console.log(accessToken)
   
//     const googleSuccess = async(res) => {
//       const result = res?.profileObj ;
//       const token = res?.tokenId;
//       try {
//         dispatch({type:'AUTH',data:{result,token}});
//         navigate("/")
//       } catch (error) {
//          console.log(error);
        
//       }
//     };
//     const googleFailure = (error) => {
//          console.log(error)
//           console.log("google sign in was unseccssfull.Try again later")
//     };
//     // const isSignUp= true
//     const handleSubmit=()=>{

//     }
//     const handleChange=() => {

//     }
//     const handleShowPassword=()=>{
//         setShowPassword((prevShowPassword)=>!prevShowPassword)
//     }
//     const switchMode=()=>{
//         setIsSignup((prevShowPassword)=>!prevShowPassword)
//         handleShowPassword(false)
//     }
//   return (
//     <Container component="main" maxWidth="xs">
//         <Paper className={classess.paper} elevation={3}>
//             <Avatar className={classess.avatar}>
//                 <LockOutlinedIcon/>

//             </Avatar>
//             <Typography variant='h5' >{isSignUp ? 'SignUp':'SignIn'}</Typography>
//             <form className={classess.form} onSubmit={handleSubmit}>
// <Grid container spacing={2}>
// {
//     isSignUp &&(
//         <>
//         <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
//         <Input name="lastName" label="Last Name" handleChange={handleChange} half />
//       </>
//       )}
//       <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
//       <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
//       { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
//     </Grid>
//     <Button type="submit" fullWidth variant="contained" color="primary" className={classess.submit}>
//       { isSignUp ? 'Sign Up' : 'Sign In' }
//     </Button>
//     <GoogleLogin
//             clientId={clientId}
//             render={(renderProps) => (
//               <Button className={classess.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
//                 Google Sign In
//               </Button>
//             )} 
//             onSuccess={()=>{googleSuccess()}}
//             onFailure={()=> {googleFailure()}}
//             cookiePolicy="single_host_origin"
//             // isSignedIn={true}
//           />
//     <Grid container justify="flex-end">
//             <Grid item>
//               <Button onClick={switchMode}>
//                 { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
//               </Button>
//             </Grid>
//           </Grid>
// </form>

//         </Paper>
//     </Container>
//   );
// };

// export default Auth;

import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import jwt_decode from 'jwt-decode';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
 import { signin, signup } from '../../actions/auth';
import AUTH from '../../reducers/auth';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [user,setUser] = useState({});
  
  function handleCallback(response){
     console.log("ENcode:" + response.credential);
     console.log("profile" + response.profileObj);
    var userObject = jwt_decode(response.credential);
    setUser(userObject)
    const result = userObject;
       try {
         dispatch({type:'AUTH',data:{result}});
         navigate("/")
       } catch (error) {
          console.log(error);       
       }

  }
  useEffect(() => {
     /* global google */
    google.accounts.id.initialize({
     client_id:"973809061615-h3isib6b3ef9qkfdfq0hd0fu8hbohqgc.apps.googleusercontent.com",
     callback: handleCallback
    })
 
    google.accounts.id.renderButton(
     document.getElementById("signInDiv"),
     {theme:"outline",size:"large",aligen:"right"}
    );
   },[]);

  const [showPassword, setShowPassword] = useState(false);
  // const [showLogin,setShowLogin] = useState(true);
  // const[showLogout,setShowLogout] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const clientId="973809061615-h3isib6b3ef9qkfdfq0hd0fu8hbohqgc.apps.googleusercontent.com"

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };

  //const googleSuccess = (res) => {
    // const result = res?.profileObj;
    // const token = res?.tokenId;
    //console.log("Login",res.profileObj);
   
  //   try {
  //     dispatch({ type: AUTH, data: { result, token } });

  //     navigate('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
   //};

  // const googleError = (res) =>  console.log("Login Failed",res);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  //  const onSignoutSuccess =() => {
  //   alert("signed out")
   
  //   console.clear();
  //  }
  return (
    <Container component="main" maxWidth="xs">
      
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <div id ="signInDiv"></div>
          
          {/* <GoogleLogin
            clientId= {clientId}
            // render={(renderProps) => (
            //   <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
            //     Google Sign In
            //   </Button>
            // )}
            buttonText = 'Login'
            // scope='https://www.googleapis.com/auth/drive.file'
            onSuccess={() => {googleSuccess()}}
             onFailure={googleError}
            cookiePolicy={"single_host_origin"}
          
          />  */}
        
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>

  );
};

export default SignUp;
