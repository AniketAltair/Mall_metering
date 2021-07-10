import React, { Component } from 'react'
import Logo  from "../../assets/logo/logo.jpg";
// import LoginCardImage from "../../assets/images/5.jpg";
import { Button } from 'react-bootstrap';
import GlobalContext from '../../state/GlobalContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class Login extends Component {
        
        static contextType = GlobalContext;  
        constructor(props) {
            super(props);
            this.state = {
                username:"",
                password:"",
                message: "Sign into your account",
                isLoggedIn: false,
                state:"error",

            }
            this.handleUserNameChange= this.handleUserNameChange.bind(this);
            this.handlePasswordChange= this.handlePasswordChange.bind(this);
            this.login= this.login.bind(this);
        }

        handleUserNameChange( e) {
            e.preventDefault();
            this.setState({
                    username: e.target.value
            })
        }
        handlePasswordChange( e) {
            e.preventDefault();
            this.setState({
                password: e.target.value

            })
        }

        login(e){
          e.preventDefault();

          if(this.state.password.length<1){
            this.setState({
              message: "password field cannot be empty"
            })
            return false
          }
          if(this.state.username.length<1){
            this.setState({
              message: "username field cannot be empty"
            })
            return false
          }
          const action= this.context
          // validate empty


          // axios.post("http://164.52.200.223:8006/users/loginuser/",
          //    this.state
          //   )
          //   .then(response=>{
          //       if(response.status===200){
          //           const token= response.data.token
          //           const expires= response.data.expiry
          //           sessionStorage.setItem("userName",this.state.username)
          //           sessionStorage.setItem("isLoggedIn",true)
          //           sessionStorage.setItem("token",token)
          //           sessionStorage.setItem("expires",expires)
          //           action('set',{key:"isLoggedIn",value:true})
          //           action('set',{key:"token",value:token})
          //           action('set',{key:"userName",value:this.state.username})
          //       }
          //   }).catch(err=>(
          //       console.log(err.response)
          //   ))
          axios.post(axios.defaults.baseURL+"/customers/logincustomer/",
          this.state
         ).then(response=>{
             if(response.status===200){
                 const token= response.data.token
                 const expires= response.data.expiry
                 sessionStorage.setItem("SU_isLoggedIn",true)
                 sessionStorage.setItem("SU_token",token)
                 sessionStorage.setItem("SU_expires",expires)
                 sessionStorage.setItem("SU_userName",this.state.username)
                 action('set',{key:"isLoggedIn",value:true})
                 action('set',{key:"token",value:token})
                 action('set',{key:"userName",value:this.state.username})
             }
         }).catch(error=>{
           if(error.response.status===400){
             console.log(error.response)
             this.setState({
               message: "Invalid password"
             })
           }
             


         })
          
           
        }
    
    
      render() {
        const action=this.context
        if(action('get',{key:"isLoggedIn"})===true){
          return (<Redirect to ="/home" />)
        }
        return (

            <main className="login-page w-100 d-flex align-items-center"  >
            <div className="w-100  row">
              <div className="col-lg-7 col-md-3 col-sm-1 "></div>
              <div className="card col-lg-4 col-md-6 col-sm-11 b-block login-card">
                <div className="row no-gutters">
                  <div className="">
                    <div className="card-body">
                      <div className="brand-wrapper ">
                        <img src={Logo}  alt="logo" className="logo " />
                      </div>
                      <p className={"login-card-description"+this.state.state}>{this.state.message}</p>
                      <form action="#!">
                        <div className="form-group">
                          <label htmlFor="username" className="">Username</label>
                          <input type="username" name="username" id="username" value={this.state.username} onChange={this.handleUserNameChange} className="form-control"   />
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="password" className="">Password</label>
                          <input type="password" name="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" />
                        </div>
                        <Button theme="primary" onClick={this.login}>Login</Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
          </main>

        )
    }
}

export default Login
