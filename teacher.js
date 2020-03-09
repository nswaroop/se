import React, { useState,Component ,ReactRadioButtonGroup} from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import {Jumbotron,Row,Col,Image,Button,Container,Grid,OverlayTrigger,Nav,Modal,Radio,Card} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import { withRouter } from "react-router"
import PropTypes from "prop-types"
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import './admin.css'


class NavbarPage2 extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      }
    constructor(props) {
        super(props);
        this.state = { username:'',log:'',show: false,show1 : false,show2 : false ,setShow: "false",date:' ',inf:[],reason:' '};
        this.handleClose1 = this.handleClose1.bind(this);
        this.handleShow1 = this.handleShow1.bind(this);
        this.handleClose2 = this.handleClose2.bind(this);
        this.handleShow2 = this.handleShow2.bind(this);
        this.handleChange=this.handleChange.bind(this);
        
      }
      handleChange(event) {
        
        if (event.target.name === "date"){
          this.setState({date: event.target.value});
          
          }
          if (event.target.name === "reason"){
            this.setState({reason: event.target.value});
            
            }


      }
         
   handleClose1() 
       { 
        if (this.state.date===' '||this.state.reason===' ')
        {
          alert("please enter the required details ")
         
         }
         else
         {
        
          this.getdata1()
         
        }
        
       }
       handleShow1() 
       {
            this.setState({ show1: true });
        }
         
        handleClose2() 
        { 
       
          
         
            this.setState({ show2: false });
        
         
        }
        handleShow2() 
        {
             this.setState({ show2: true });
             this.getdata3()
         }


getdata1=()=>{
          console.log("hi from getdata 1");
          console.log(this.state.username);
          console.log(this.state.date);
          console.log(this.state.reason);
          var data= new URLSearchParams();
          data.append("name",this.state.username)
          data.append("date",this.state.date)
          data.append("reason",this.state.reason)
          fetch("http://localhost:8000/insert_upd",{
            method:'post',
            body:data
          })
         .then(response =>{return response.json()})
         this.setState({ show1: false,date:' ',reason:' ' });
        
}         

getdata3=()=>{
  console.log("hi from getdata 3");
   console.log(this.state.username);
  var data= new URLSearchParams();
  data.append("name",this.state.username)
  fetch("http://localhost:8000/alloted",{
    method:'post',
    body:data
  })
 .then(response =>{return response.json()})
 .then(response =>{
  this.setState({inf:response.detail})

   console.log(this.state.inf)
 
})
}

render() {
  this.state.username=this.props.location.state.detail
  const listItems = this.state.inf.map((string) =>
  <li>{string}</li>
  );
  return (
      
<div style={{backgroundcolor: "rgb(71, 68, 68)",marginLeft:"10px",marginRight:"1100px",borderRadius:"10px",marginTop:"30px",border:"3px solid grey",color:"black"}} className="a">
<Nav  className="flex-column" style={{marginLeft:"30px",paddingRight:"50px"}}>
<Image src={require('./panda.png')}  roundedCircle  width="100px" height="100px" style={{marginTop:"40px",marginLeft:"50px",marginBottom:"50px",marginRight:"-50px"}}/>
  
<br></br>
{/* first one */}
  <hr className="a"></hr>
  <Nav.Link eventKey="/complaint" className="a" onClick={this.handleShow2} style={{color:'black'}}>Allotment details</Nav.Link>
   
  <Modal show={this.state.show2} onHide={this.handleClose2} style={{color:"black",fontSize:"20px"}} className='p'>

<Modal.Header closeButton>
  <Modal.Title>
  <center className='k' >Details</center>
        
  </Modal.Title>
</Modal.Header>
<Modal.Body> 
 <h4> Date:       Room:        Division:          Strength:</h4>
  <ul>{listItems}</ul>
</Modal.Body>
<Modal.Footer> 
</Modal.Footer>
</Modal>  

<br></br>
{/* second one */}
  <hr className="a"></hr>
  <Nav.Link eventKey="/complaint" className="a" onClick={this.handleShow1} style={{color:'black'}}>Modification</Nav.Link>

  <Modal show={this.state.show1} onHide={this.handleClose1} style={{color:"black",fontSize:"20px"}} className='p'>

        <Modal.Header closeButton>
          <Modal.Title><center className='k'>Updates</center>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br></br>
          <br></br>                  
        <p style={{marginTop:"-30px",fontSize:"20px"}}><span>Date:</span> <input type="date" value={this.state.date} name="date" placeholder='Date' onChange={this.handleChange} style={{width:"100px",marginLeft:"25px",height:"30px",borderRadius:"50px",marginTop:"10px",fontSize:"10px"}}/></p> 
      <br></br>
      <p style={{fontSize:"30px"}}>Reason:</p>
      <p style={{marginLeft:"5px",marginTop:"-30px",fontSize:"30px"}}> <textarea value={this.state.reason} name="reason" placeholder='Reason behind the updation' onChange={this.handleChange} style={{width:"400px",marginLeft:"15px",height:"150px",marginTop:"10px",borderRadius:"5px",fontSize:"20px",marginLeft:"1px"}}/></p> 

        </Modal.Body>
        <Modal.Footer>
          <Button name="submit" variant="primary" onClick={this.handleClose1}>
            submit
          </Button> 
        </Modal.Footer>
          </Modal>

  <hr className="a"></hr>
  <Nav.Link eventKey="/home" href="/login" className="a" style={{color:'black'}}>Logout</Nav.Link>
</Nav>
</div>
    );
  }
}

export default NavbarPage2;