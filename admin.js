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
        this.state = { log:'',show: false,show1 : false,show2 : false ,setShow: "false",date:'',day:'mon',Invigilator:'',Room:'',capacity:[],Strength :'',branch:'',periods:'',year:'',B:'',inv:[],rooms:[],cap:'',div:[],date1:'',room1:'',inv1:'',branch1:'',strength1:'',name4:[],date4:[],reason4:[],name5:[],name6:[],namec1:'',namec2:'' };
        this.handleClose1 = this.handleClose1.bind(this);
        this.handleShow1 = this.handleShow1.bind(this);
        this.handleClose2 = this.handleClose2.bind(this);
        this.handleShow2 = this.handleShow2.bind(this);
        this.handleClose3 = this.handleClose3.bind(this);
        this.handleShow3 = this.handleShow3.bind(this);
        this.handleChange=this.handleChange.bind(this);
        
      }
      handleChange(event) {
        
        if (event.target.name === "day"){
          this.setState({day: event.target.value});
          
          }
          if (event.target.name === "year"){
            this.setState({year: event.target.value});
            
            }
            if (event.target.name === "B"){
              this.setState({B: event.target.value});
              
              }
          if (event.target.name === "periods"){
          
            this.setState({periods: event.target.value});
            }
            if (event.target.name === "date"){
          
              this.setState({date: event.target.value});
                  
              }
        if (event.target.name === "invigilator"){
              this.setState({Invigilator: event.target.value});
            }
        if (event.target.name === "room"){
              this.setState({Room: event.target.value});
            }
        if (event.target.name === "branch"){
              this.setState({branch: event.target.value});
              
              }
        if (event.target.name === "strength") {
                  this.setState({Strength:event.target.value})
              
          }
          if (event.target.name === "date1") {
            this.setState({date1:event.target.value})
        
    }
    if (event.target.name === "change_name1") {
      this.setState({namec1:event.target.value})
  
}
if (event.target.name === "change_name2") {
  this.setState({namec2:event.target.value})

}

      }
         
   handleClose1() 
       { 
        if (this.state.date === '' || this.state.day === ''||this.state.Invigilator === '' || this.state.Room === ''|| this.state.strength === ''||this.state.branch === '')
        {
          alert("please enter the values ")
         
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
         }
         handleClose3() 
         { 
        
           
          
             this.setState({ show3: false });
         
          
         }
         handleShow3() 
         {
              this.setState({ show3: true });
          }
   getdata1=()=>{
    console.log(this.state.date)
    console.log(this.state.Room)
    console.log(this.state.Invigilator)
    console.log(this.state.branch)
    console.log(this.state.Strength)
    console.log(this.state.div)
    console.log(this.state.B)
    console.log(this.state.cap)
    var data= new URLSearchParams();
    data.append("date",this.state.date)
    data.append("room",this.state.Room)
    data.append("inv",this.state.Invigilator)
    data.append("branch",this.state.branch)
    data.append("strength",this.state.Strength)
    data.append("div",this.state.div)
    data.append("B",this.state.B)
    data.append("cap",this.state.cap)
    fetch("http://localhost:8000/insert",{
      method:'post',
      body:data
    })
   .then(response =>{return response.json()})
   .then(response =>{
    this.setState({log:response.log})
    if(this.state.log===1)
    {
      alert("excess strength")
    }
    else if(this.state.log===2)
    {
      alert("Branch entry is wrong")
    }
    else if(this.state.log===3)
    {
      alert("excess strength from a branch look out")
    }
    else if(this.state.log===4)
    {
      alert("No.of branches and strengths input not same")
    }
    else
    {
      alert("Done")
      this.setState({ show1: false,date:'',day:'mon',Invigilator:'',Room:'',capacity:[],Strength :'',branch:'',periods:'',year:'',B:'',inv:[],rooms:[],cap:'',div:[]});
    }
   console.log("done")
   })
}


 getdata2=()=>{
    console.log("hi from getdata 2");
    console.log(this.state.day);
    console.log(this.state.date);
if(this.state.date === '' || this.state.day === ''||this.state.year === '' || this.state.B === ''||this.state.periods === '')
{
  alert("Enter requied details")
}
else{
  var data= new URLSearchParams();
  data.append("date",this.state.date)
  data.append("day",this.state.day)
  data.append("year",this.state.year)
  data.append("B",this.state.B)
  data.append("periods",this.state.periods)
  fetch("http://localhost:8000/retrieve",{
    method:'post',
    body:data
  })
 .then(response =>{return response.json()})
 .then(response =>{
  this.setState({inv:response.teach})
  this.setState({rooms:response.rooms})
  this.setState({capacity:response.capacity})
  this.setState({div:response.div})
   console.log(this.state.inv)
 console.log(this.state.rooms)
 console.log(this.state.capacity)
 console.log(this.state.div)
})
}
}

getdata3=()=>{
  console.log("hi from getdata 3");
 
  console.log(this.state.date1);
  var data= new URLSearchParams();
  data.append("date1",this.state.date1)
  fetch("http://localhost:8000/info",{
    method:'post',
    body:data
  })
 .then(response =>{return response.json()})
 .then(response =>{
  this.setState({inv1:response.inv})
  this.setState({room1:response.room})
  this.setState({branch1:response.branch})
  this.setState({strength1:response.strength})
   console.log(this.state.inv1)
 console.log(this.state.room1)
 console.log(this.state.bracnh1)
 console.log(this.state.strength1)
})
}

getdata4=()=>{
  console.log("hi from getdata 4");
  var data= new URLSearchParams();
  fetch("http://localhost:8000/i_up",{
    method:'post',
    body:data
  })
 .then(response =>{return response.json()})
 .then(response =>{
  this.setState({name4:response.name})
  this.setState({date4:response.date})
  this.setState({reason4:response.reason})
 console.log(this.state.name4)
 console.log(this.state.date4)
 console.log(this.state.reason4)
this.handleShow3()
})
}
getdata5=()=>{
  console.log("hi from getdata 5");
  var data= new URLSearchParams();
  data.append("name",this.state.name4[this.state.name4.length-1])
  data.append("date",this.state.date4[this.state.name4.length-1])
  fetch("http://localhost:8000/get",{
    method:'post',
    body:data
  })
 .then(response =>{return response.json()})
 .then(response =>{
  this.setState({name5:response.name})
   console.log(this.state.name5)
})
}
getdata6=()=>{
  console.log("hi from getdata 6");
  var data= new URLSearchParams();
  data.append("name",this.state.name4[this.state.name4.length-2])
  data.append("date",this.state.date4[this.state.name4.length-2])
  fetch("http://localhost:8000/get",{
    method:'post',
    body:data
  })
 .then(response =>{return response.json()})
 .then(response =>{
  this.setState({name6:response.name})
  console.log(this.state.name6)
})
}

getdata7=()=>{
  console.log("hi from getdata 7");
  var data= new URLSearchParams();
  console.log(this.state.namec1);
  data.append("cname",this.state.namec1)
  data.append("name",this.state.name4[this.state.name4.length-1])
  data.append("date",this.state.date4[this.state.name4.length-1])
  fetch("http://localhost:8000/update",{
    method:'post',
    body:data
  })
 .then(response =>{return response.json()})
 .then(response =>{
  console.log('done')
 
})
alert("updated")
}
getdata8=()=>{
  console.log("hi from getdata 8");
  var data= new URLSearchParams();
  data.append("cname",this.state.namec2)
  data.append("name",this.state.name4[this.state.name4.length-2])
  data.append("date",this.state.date4[this.state.name4.length-2])
  fetch("http://localhost:8000/update",{
    method:'post',
    body:data
  })
 .then(response =>{return response.json()})
 .then(response =>{
  console.log('done')
  
})
alert("updated")
}
getdata9=()=>{
  console.log("hi from getdata 9");
  var data= new URLSearchParams();
  data.append("name",this.state.name4[this.state.name4.length-1])
  data.append("date",this.state.date4[this.state.name4.length-1])
  fetch("http://localhost:8000/delete",{
    method:'post',
    body:data
  })
 .then(response =>{return response.json()})
 .then(response =>{
  console.log('done')
  
})
alert("deleted")
}
getdata10=()=>{
  console.log("hi from getdata 9");
  var data= new URLSearchParams();
  data.append("name",this.state.name4[this.state.name4.length-2])
  data.append("date",this.state.date4[this.state.name4.length-2])
  fetch("http://localhost:8000/delete",{
    method:'post',
    body:data
  })
 .then(response =>{return response.json()})
 .then(response =>{
  console.log('done')
  
})
alert("deleted")
}
render() {
  // this.state.username=this.props.location.state.detail
  var n= this.state.inv.length
  var len=this.state.name4.length
  var n1= this.state.rooms.length
  var invig=[' ']
  var room=[]
  var room1=this.state.room1
  var inv1=this.state.inv1
  var branch1=this.state.branch1
  var strength1=this.state.strength1
  for(var i=0;i<n;i++)
  {
    invig.push(this.state.inv[i])
  }
  for(var i=0;i<n1;i++)
  {
    room.push(this.state.rooms[i])

  }
  console.log(room)
  for(var i=0;i<n1;i++)
  {
    if(this.state.Room===this.state.rooms[i])
    {
        this.state.cap=this.state.capacity[i]
        
    }

  }
  var cap=this.state.cap

  const listItems = this.state.div.map((number) =>
  <li>{number}</li>
  );
var name5=this.state.name5
var name6=this.state.name6
 
  
  return (
      
      <div style={{backgroundcolor: "rgb(71, 68, 68)",marginLeft:"10px",marginRight:"1100px",borderRadius:"10px",marginTop:"30px",border:"3px solid grey",color:"black"}} className="a">
<Nav  className="flex-column" style={{marginLeft:"30px",paddingRight:"50px"}}>
<Image src={require('./panda.png')}  roundedCircle  width="100px" height="100px" style={{marginTop:"40px",marginLeft:"50px",marginBottom:"50px",marginRight:"-50px"}}/>
  
<br></br>
{/* first one */}
  <hr className="a"></hr>
  <Nav.Link eventKey="/complaint" className="a" onClick={this.handleShow2} style={{color:'black'}}>Day Report</Nav.Link>
   
  <Modal show={this.state.show2} onHide={this.handleClose2} style={{color:"black",fontSize:"20px"}} className='p'>

<Modal.Header closeButton>
  <Modal.Title>
  <center className='k' >Report</center>
          <hr></hr>
          
  <p style={{marginTop:"20px",fontSize:"20px"}}><span>Date:</span> <input type="date" value={this.state.date1} name="date1" placeholder='Date' onChange={this.handleChange} style={{width:"100px",marginLeft:"25px",height:"30px",borderRadius:"50px",marginTop:"10px",fontSize:"10px"}}/></p> 
  <Button variant="primary" onClick={this.getdata3} style={{marginLeft:'200px'}}>
            Check
          </Button> 
  </Modal.Title>
</Modal.Header>
<Modal.Body>
  <p>Room: {room1}</p>
  <p>Invigilator: {inv1}</p>
  <p>Branches: {branch1}</p>
  <p>Strength: {strength1}</p>

</Modal.Body>
<Modal.Footer>
 
</Modal.Footer>
  </Modal>  

{/* second one */}
  <hr className="a"></hr>
  <Nav.Link eventKey="/complaint" className="a" onClick={this.handleShow1} style={{color:'black'}}>Room Allocation</Nav.Link>

  <Modal show={this.state.show1} onHide={this.handleClose1} style={{color:"black",fontSize:"20px"}} className='p'>

        <Modal.Header closeButton>
          <Modal.Title><center className='k'>Allocation</center>
          <hr></hr>
          <br></br>
          <p style={{marginLeft:"5px",marginTop:"-30px",fontSize:"20px"}}><span>S_year:</span> <input type="text" value={this.state.year} name="year" placeholder='years' onChange={this.handleChange} style={{width:"100px",marginLeft:"15px",height:"30px",borderRadius:"50px",marginTop:"10px",fontSize:"10px",marginLeft:"1px"}}/></p> 
          <p style={{marginLeft:"220px",marginTop:"-55px",fontSize:"20px"}}><span>Branches:</span> <input type="text" value={this.state.B} name="B" placeholder='branches' onChange={this.handleChange} style={{width:"100px",marginLeft:"15px",height:"30px",borderRadius:"50px",marginTop:"10px",fontSize:"10px",marginLeft:"15px"}}/></p> 
  
          <p style={{marginTop:"20px",fontSize:"20px"}}><span style={{marginTop:"-350px",fontSize:"20px"}}>Day:</span><select  name='day' value={this.state.day} onChange={this.handleChange} style={{marginTop:'-200px',width:"100px",marginLeft:"35px",height:"30px",borderRadius:"50px",marginTop:"30px",fontSize:"10px"}}>
                                     <option>mon</option>
                                     <option>tue</option>
                                     <option>wed</option>
                                     <option>thu</option>
                                     <option>fri</option>
                                     <option>sat</option>
                                     </select>
                                     </p>
          <p style={{marginLeft:"220px",marginTop:"-55px",fontSize:"20px"}}><span>Periods:</span> <input type="text" value={this.state.periods} name="periods" placeholder='x-x' onChange={this.handleChange} style={{width:"100px",marginLeft:"25px",height:"30px",borderRadius:"50px",marginTop:"10px",fontSize:"10px"}}/></p> 
          
          <p style={{marginTop:"50px",fontSize:"20px"}}><span>Date:</span> <input type="date" value={this.state.date} name="date" placeholder='Date' onChange={this.handleChange} style={{width:"100px",marginLeft:"25px",height:"30px",borderRadius:"50px",marginTop:"10px",fontSize:"10px"}}/></p> 
          <Button name="proceed" variant="primary" onClick={this.getdata2} style={{marginLeft:'200px'}}>
            Proceed
          </Button> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p ><span style={{marginTop:"50px",fontSize:"20px"}}>Invigilator :</span><select  name='invigilator' value={this.state.Invigilator} onChange={this.handleChange} style={{width:"250px",marginLeft:"10px",height:"30px",borderRadius:"50px",marginTop:"30px",fontSize:"10px"}}>
              {invig.map((value, index) =>  <option key={index} value={value}>{value}</option>)} 
                                     </select>
                                     </p>
       <p ><span style={{marginTop:"30px",fontSize:"20px"}}>Room No.:</span><select  name='room' value={this.state.Room} onChange={this.handleChange} style={{width:"100px",marginLeft:"15px",height:"30px",borderRadius:"50px",marginTop:"30px",fontSize:"10px"}}>
   {/* loop in the list   */}
     {room.map((value, index) =>  <option key={index} value={value}>{value}</option>)} 
                                     </select>
                                     </p>
  <p style={{marginTop:"0px",fontSize:"15px"}}>Seating Capacity:{cap}</p>
       <p style={{marginTop:"15px",marginLeft:"5px",marginBottom:'50px'}}>Branch :
      <input type="text" value={this.state.branch} name="branch"  placeholder='branch' onChange={this.handleChange} style={{marginTop:"0px",marginLeft:"15px",width:"150px",height:"30px",borderRadius:"50px",marginTop:"30px",fontSize:"15px",textAlign:"center",paddingRight:"10px"}}/> <br/><br/>
      </p>  
      <p style={{marginTop:"-140px",marginLeft:"275px"}}>Strength :
      <input type="text" value={this.state.Strength} name="strength"  placeholder='strength' onChange={this.handleChange} style={{marginTop:"0px",marginLeft:"15px",width:"80px",height:"30px",borderRadius:"50px",marginTop:"30px",fontSize:"15px",textAlign:"center",paddingRight:"10px"}}/> <br/><br/>
      </p>  
     <h3 className='k'>Remaining branches</h3>
  <ul>{listItems}</ul>
      
        </Modal.Body>
        <Modal.Footer>
          <Button name="submit" variant="primary" onClick={this.handleClose1}>
            submit
          </Button> 
        </Modal.Footer>
          </Modal>

{/* Third one */}

<hr className="a"></hr>
  <Nav.Link eventKey="/complaint" className="a" onClick={this.getdata4} style={{color:'black'}}>Update Request</Nav.Link>

  <Modal show={this.state.show3} onHide={this.handleClose3} style={{color:"black",fontSize:"20px"}}>

        <Modal.Header closeButton>
          <Modal.Title><center>Update</center></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Accordion >
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
           <pre>Name:   <span>{this.state.name4[len-1]}</span></pre> 
           <br></br>
           <pre>Date: <span>{this.state.date4[len-1]}</span></pre> 
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body><pre>Reason: <span>{this.state.reason4[len-1]}</span></pre> 
      <hr></hr>
      <Button variant="primary" onClick={this.getdata5}>
            Modify
          </Button> 
          <Button variant="primary" onClick={this.getdata9} style={{}}>
            Reject
          </Button> 
          <hr></hr>
          <p ><span style={{marginTop:"50px",fontSize:"20px"}}>Invigilator :</span><select  name='change_name1' value={this.state.namec1} onChange={this.handleChange} style={{width:"250px",marginLeft:"10px",height:"30px",borderRadius:"50px",marginTop:"30px",fontSize:"10px"}}>
              <option>    </option>
              {name5.map((value, index) =>  <option key={index} value={value}>{value}</option>)} 
                                     </select>
                                     </p>
          <hr></hr>
      <Button variant="primary" onClick={this.getdata7}>
            update
          </Button> 
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1">
           <pre>Name:   <span>{this.state.name4[len-2]}</span></pre> 
           <br></br>
           <pre>Date: <span>{this.state.date4[len-2]}</span></pre> 
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body> <pre>Reason: <span>{this.state.reason4[len-2]}</span></pre> 
      <hr></hr>
      <Button variant="primary" onClick={this.getdata6}>
            Modify
          </Button> 
          <Button variant="primary" onClick={this.getdata10} style={{}}>
            Reject
          </Button> 
          <hr></hr>
          <p ><span style={{marginTop:"50px",fontSize:"20px"}}>Invigilator :</span><select  name='change_name2' value={this.state.namec2} onChange={this.handleChange} style={{width:"250px",marginLeft:"10px",height:"30px",borderRadius:"50px",marginTop:"30px",fontSize:"10px"}}>
              {name6.map((value, index) =>  <option key={index} value={value}>{value}</option>)} 
                                     </select>
                                     </p>
          <hr></hr>
      <Button variant="primary" onClick={this.getdata8}>
            update
          </Button> 
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleClose3}>
            close
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