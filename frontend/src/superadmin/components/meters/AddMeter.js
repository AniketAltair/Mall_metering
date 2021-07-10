import axios from 'axios';
import React, { Component } from 'react'
import { Button, Container } from 'react-bootstrap';
class AddMeter extends Component {
        constructor(props) {
            super(props);
            this.state = {
                message:"Add new Meter",
                meter_name:"",
                meter_url:"",
            }
            this.handleMeterNameChange= this.handleMeterNameChange.bind(this);
            this.hanleConnectionChange= this.hanleConnectionChange.bind(this);
            this.AddMeter= this.AddMeter.bind(this);
        }


        handleMeterNameChange(e){
            e.preventDefault();
            this.setState({
                meter_name:e.target.value
            })
        }
        hanleConnectionChange(e){
            e.preventDefault();
            this.setState({
                meter_url:e.target.value
            })
        }

        AddMeter(e){
            e.preventDefault();
            axios.post(axios.defaults.baseURL+"/superadmin/meters/?operation=add",this.state).then(response => (
                            window.alert("add new connection  name" + this.state.meter_name + " connection "+ this.state.meter_url
                            
                            + " please go to meter table to see meter")
            )

            ).catch(err =>(
              console.log(err.response)
            ))


            this.setState({
              meter_name:"",
              meter_url:""
            })
          }
    
        render() {
        return (

          <Container fluid className="main-content-container  mt-3">
          <div className="card login-card">
                <div className="row no-gutters">
                  <div className="">
                    <div className="card-body">
                      <p className="login-card-description">{this.state.message}</p>
                      <form action="#!">
                        <div className="form-group mb-4">
                          <label htmlFor="metername" className="label">Meter Name</label>
                          <input  id="name" name="metername" type="name" value={this.state.meter_name} placeholder=" enter the name for meter" onChange={this.handleMeterNameChange} className="form-control" />
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="connection" className="label">Connection</label>
                          <input type="url" name="connection" id="connection" value={this.state.meter_url} onChange={this.hanleConnectionChange} className="form-control" />
                        </div>
                        
                        <Button theme="primary" onClick={this.AddMeter}>Add</Button>
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

export default AddMeter
