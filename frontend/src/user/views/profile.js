import React  from 'react'
import { Button } from 'react-bootstrap';
import GlobalContext from '../state/GlobalContext';
import axios from "axios"
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';

const api=axios.create({
  baseURL:axios.defaults.baseURL
})

class EditCustomer extends React.Component  {
  static contextType = GlobalContext;  

  constructor(props) {
      super(props);
      this.state = {
          username:"",
          email:"",
          password:"",
          address:"",
          mobile_no:"",
          status:false,
          subscription:"",
          message: "Edit Customer Info",
          id:"",
          linked:false,
          profile_pic: null,
          edited:false,
          subscription_options:[
            {label:"One Month",value:1},
            {label:"Three Month",value:2},
            {label:"Six Month",value:3},
            {label:"One Year",value:4}
        ],
      }

      

      this.handleusernameChange= this.handleusernameChange.bind(this);
      this.handlePasswordChange= this.handlePasswordChange.bind(this);
      this.handleEmailChange= this.handleEmailChange.bind(this);
      this.handleaddressChange= this.handleaddressChange.bind(this);
      this.handlemobnoChange= this.handlemobnoChange.bind(this);
      this.handlestatusChange= this.handlestatusChange.bind(this);
      this.handleSubscriptionChange= this.handleSubscriptionChange.bind(this);
      this.handlelinked= this.handlelinked.bind(this);
      this.save= this.save.bind(this);
      this.delete= this.delete.bind(this);
  }


  handlePasswordChange( e) {
      e.preventDefault();
      this.setState({
          password: e.target.value

      })
  }

  handleusernameChange( e) {
    e.preventDefault();
    this.setState({
        username: e.target.value

    })
}

handlelinked() {
  
  this.setState({
      linked: !(this.state.linked)

  })
}

  handleEmailChange( e) {
      e.preventDefault();
      this.setState({
          email: e.target.value

      })
  }
  handleaddressChange( e) {
      e.preventDefault();
      this.setState({
          address: e.target.value

      })
  }
  handlemobnoChange( e) {
      e.preventDefault();
      this.setState({
          mobile_no: e.target.value

      })
  }
  handlestatusChange( e) {
      e.preventDefault();
      this.setState({
          status: e.target.value

      })
  }
  handleSubscriptionChange( e) {
    this.setState({
        subscription: e.value

    })
}

  
 
save(e){
  e.preventDefault();
  const action= this.context
    // console.log(sessionStorage.getItem("operation").operation)
    // console.log(action('get',{key:"operation"}))
  const u=action('get',{key:"userName"})

  
  var form= new FormData();
  form.append('username', this.state.username)
  form.append('email', this.state.email)
  form.append('password', this.state.password)
  form.append('address', this.state.address)
  form.append('status', this.state.status)
  form.append('mobile_no', this.state.mobile_no)
  form.append('subscription', this.state.subscription)
  form.append('profile_pic', this.state.profile_pic)
  console.log(this.state + form)

  axios.post(axios.defaults.baseURL+"/customers/operations/?operation=update&username="+u,form,{
    headers: {
      'content-type': 'multipart/form-data',
    }})
  .then(response =>{
    if(response.status===200){
      if(response.status===200){
        this.setState({
          id:response.data.id,
            username: response.data.username,
            email: response.data.email,
            mobile_no: response.data.mobile_no,
            status:response.data.status,
            subscription: response.data.subscription,
            address: response.data.address,
            profile_pic:response.data.profile_pic,
            linked:response.data.linked
        })
      }
      window.alert("update success!");
    }
  })



}
 delete =async(e)=>{
    let res= await api.post('/superadmin/deleteuser/',this.state.id+"/")
    console.log(res)
   } 


componentWillMount(){
  const action= this.context
    // console.log(sessionStorage.getItem("operation").operation)
    // console.log(action('get',{key:"operation"}))
  const u=action('get',{key:"userName"})

  console.log("PPPPPPPPPPPPPPPPPPPPPP")
  console.log(this.state.linked)
  
      axios.get(axios.defaults.baseURL+"/customers/operations/?operation=get&username="+u)
      .then(response=>{
        if(response.status===200){
          this.setState({
            id:response.data.id,
            username: response.data.username,
            email: response.data.email,
            mobile_no: response.data.mobile_no,
            status:response.data.status,
            subscription: response.data.subscription,
            address: response.data.address,
            profile_pic:response.data.profile_pic,
            linked:response.data.linked
          })
          console.log("@@@@@@@@@@@@@@@@@@@@@@@@")
          console.log()        }
      })


     


  


}
render() {

  console.log("url for profile_pic "+ this.state.profile_pic)
  //console.log()
  if(this.state.edited){
    return (<Redirect to="/customers"/>)
  }
  return (
    

    <Container fluid className="main-content-container  mt-3">
    <div className="card login-card">
          <div className="row no-gutters">
            <div className="">
              <div className="card-body">
                <p className="login-card-description">{this.state.message}</p>
                <form action="#!">
                <div className="form-group p-0 m-0">
                <img 
                style={{height:"100px"}}
                src={axios.defaults.baseURL+this.state.profile_pic}
                alt="profile pic"
                />
                </div>
                <div className="form-group p-0 m-0">
                  <label htmlFor="username" className="">Username</label>
                  <input  name="username" id="username" value={this.state.username} onChange={this.handleusernameChange} className="form-control" />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="email" className="">Email</label>
                  <input  id="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="password" className="">Password</label>
                  <input type="password" name="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="address" className="">Address</label>
                  <input  type="text-area" name="address" id="address" value={this.state.address} onChange={this.handleaddressChange} className="form-control" />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="mobno" className="">Mobile Number</label>
                  <input type="number" name="mobno" id="mobno" value={this.state.mobile_no} onChange={this.handlemobnoChange} className="form-control" />
                </div>
                <div className="form-group mb-1">
                  <label htmlFor="status" className="">Status</label>
                  <input readOnly = {true} name="status" id="status" value={this.state.status} onChange={this.handlestatusChange} className="form-control" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="Subscription" className="">Subscription</label>
                  <Select options={this.state.subscription_options} onChange={this.handleSubscriptionChange} />
                </div>
                
                <div className="row no-gutters no-margin no-padding">
                 <div className="col-md-1"> 
                 <Button theme="primary" onClick={this.save} >Save</Button>
                   </div> 
                   <div className="col">
                   </div>
                  
                </div>
                </form>
               
                <nav className="login-card-footer-nav">
                </nav>
              </div>
            </div>
          </div>
        </div>
        </Container>
  )
}
}

export default EditCustomer;

/*
<main className="d-flex align-items-center py-3 py-md-0">
      <div className="container mt-1">
        <div className="card login-card row no-gutters col-md-7">
          <div className="">
            <div className="">
              <div className="card-body">
                <p className="login-card-description">{this.state.message}</p>
                <form action="#!">
                { <div className="form-group p-0 m-0">
                    <label htmlFor="username" className="">Profile</label>
                    <input name="profile" type="file" value={this.state.pro} onChange={this.handleusernameChange} className="form-control" />
                  </div>  }
                  
              </form>
             
              <nav className="login-card-footer-nav">
              </nav>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  </main>




   
*/