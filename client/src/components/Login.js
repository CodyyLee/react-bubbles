import React, {useState} from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    credentials: {
      username: "",
      password: ""
    }
  })

  const submitHandler = e => {
    e.preventDefault();
    console.log(credentials);
    axios.post("http://localhost:5000/api/login", credentials.credentials)
    .then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.payload)
      props.history.push("/bubblepage")
    })
    .catch(err => {
      console.log(err)
    })
  }

  const changeHandler = e => {
    setCredentials({
      credentials: {
        ...credentials.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type='text' name="username" id="username" placeholder="Username" onChange={changeHandler} value={credentials.credentials.username}/>

        <input type="password" name="password" id="password" placeholder="Password" onChange={changeHandler} value={credentials.credentials.password}/>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
