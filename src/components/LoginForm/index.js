import { useState } from "react";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const LoginForm = () =>{

    const[username, setUserName] = useState("");
    const[password, setPassword] = useState("");
    const[showSubmitError, setShowSubmitError] = useState(false);
    const[errorMsg,setErrorMsg] = useState("");

    const jwtToken = Cookies.get("jwtToken")
    if(jwtToken !== undefined){
      return <Redirect to="/"/>
    }

    const onChangeUsername = event => {
        setUserName(event.target.value)
      }
    
     const onChangePassword = event => {
        setPassword(event.target.value)
      }
    
      const onSubmitSuccess = jwtToken => {
        const {history} = this.props
    
        Cookies.set('jwtToken', jwtToken, {
          expires: 30,
        })
        history.replace('/')
      }
    
      const onSubmitFailure = errorMsg => {
        setShowSubmitError(true);
        setErrorMsg(errorMsg);
      }
    
      const submitForm = async event => {
        event.preventDefault()
        
        const userDetails = {username, password}
        const url = 'https://totality-frontend-challenge-asp5.onrender.com/login'
        const options = {
          method: 'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
          onSubmitSuccess(data.jwt_token)
        } else {
          onSubmitFailure(data.errorMsg)
        }
      }
    
      const renderPasswordField = () => {
       
    
        return (
          <>
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="password-input-field"
              value={password}
              onChange={onChangePassword}
              placeholder="Password"
            />
          </>
        )
      }
    
      const renderUsernameField = () => {
        
    
        return (
          <>
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={onChangeUsername}
              placeholder="Username"
            />
          </>
        )
      }
    
      
        
        
    
        return (
          <div className="login-form-container">
            <img
              src="https://dynamic.design.com/preview/logodraft/43516114-5515-482c-a1bb-5c1b04ac19aa/image/large.png"
              className="login-website-logo-mobile-img"
              alt="website logo"
            />
            <img
              src="https://img.freepik.com/free-vector/house-searching-concept-landing-page_23-2148298496.jpg?t=st=1722402196~exp=1722405796~hmac=569dced6941c8f3fd0ed86de0c29b2ad7bb119a7d70f6e145b7"
              className="login-img"
              alt="website login"
            />
            <form className="form-container" onSubmit={submitForm}>
              <img
                src="https://dynamic.design.com/preview/logodraft/43516114-5515-482c-a1bb-5c1b04ac19aa/image/large.png"
                className="login-website-logo-desktop-img"
                alt="website logo"
              />
              <div className="input-container">{renderUsernameField()}</div>
              <div className="input-container">{renderPasswordField()}</div>
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
              <p>if you don't have an Account please <Link to="/register">Register</Link></p>
            </form>
            
          </div>
        )
      

}
export default LoginForm;