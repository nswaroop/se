import React, { Component } from 'react'
import "./about.css"
import {Jumbotron,Row,Col,Image,Button,Container,Grid,OverlayTrigger,Accordion,Card} from 'react-bootstrap';
export default class About extends Component {
    render() {
        return (
            <div style={{color:'black'}}>

  <h1 style={{marginLeft:"-500px",marginTop:"100px",color:"black"}}>Our Motive</h1>
 <Row>
<p style={{marginLeft:"500px",marginTop:"-100px",color:"black"}} >
It has been centuries since we are here
our home
planet earth
we have grown lots
we have changed a lot for good
also over looked a lot for good ?
doesnt seem like in the long run..
all those smelly disgusting
wastes are serious business now !
</p>

<p style={{marginLeft:"500px",marginTop:"5px",color:"black"}} >
who are we in the large spectacle that floating a directionless path in the
larger spectacle of things ?
here is to what we are and what we are capable of…
</p>


<p style={{marginLeft:"500px",marginTop:"5px",color:"black"}} >
the youngest population of the world
lets get our shit together for a better tommorrow
</p>


<p>
In our Waste Management System, there will be three major areas of consideration – Survey, Management, Public Awareness. In Survey management, people can file their complaints (if any) based on waste management and disposal in their area-identified by town and taluk name. It is just to take a survey and inform things to higher authorities. On Management sector, higher authorities will be notified if there is any complaints from public on their area and ideas about actions to be taken will be given. Authorities will have to login for security purpose and complaints will be classified based on area and appropriate authorities will be notified.
             In Public awareness sector, information about waste disposal methods and managing it, awareness on effects (health, environmental issues) of improper disposal, how to manage and reduce waste will be given.
             In addition to that we can get feedback from public which ensures further repeatance of mistakes and carelessness.
             </p>
             </Row>
             <hr style={{backgroundColor:"grey",marginLeft:"150px",marginRight:"150px"}}></hr>
         
<Container style={{marginBottom:"100px"}}>
  
             <h1 style={{paddingTop:"50px",paddingLeft:"30px",fontFamily:"comic",color:"white"}}>Our Team Members</h1>

  <Row style={{paddingLeft:"80px",marginTop:"100px"}}>
    <Col xs={6} md={4}>
  
   <Image src={require('./pic.jpg')}  roundedCircle  width="200px" height="200px"/>
 
   <h3 style={{color:"White",marginLeft:"60px",marginTop:"0px"}}>Nikhil</h3>
    <h5 style={{color:"White",marginLeft:"60px",marginTop:"-20px"}}>Devopler</h5>    </Col>
    <Col xs={6} md={4} style={{paddingLeft:"30px"}}>
  
      <Image src={require('./pic.jpg')}  roundedCircle  width="200px" height="200px"/>
    
    <h3 style={{color:"White",marginLeft:"50px",marginTop:"0px"}}>Reshmi</h3>
    <h5 style={{color:"White",marginLeft:"50px",marginTop:"-20px"}}>Devopler</h5>

    </Col>
    <Col xs={6} md={4} style={{paddingLeft:"30px"}}>
    
     <Image src={require('./pic.jpg')}  roundedCircle  width="200px" height="200px"/>
 
     <h3 style={{color:"White",marginLeft:"50px",marginTop:"0px"}}>Swaroop</h3>
    <h5 style={{color:"White",marginLeft:"60px",marginTop:"-20px"}}>Devopler</h5>    </Col>
  
  <Row style={{marginLeft:"200px",marginTop:"120px",marginBottom:"10px"}}>
    <Col xs={6} md={4}>
 
   <Image src={require('./pic.jpg')}  roundedCircle  width="200px" height="200px"/>
    
   <h3 style={{color:"White",marginLeft:"50px",marginTop:"0px"}}>Nivedha</h3>
    <h5 style={{color:"White",marginLeft:"60px",marginTop:"-20px"}}>Devopler</h5>    </Col>
    <Col xs={6} md={4} style={{marginLeft:"150px"}}>
   
      <Image src={require('./pic.jpg')}  roundedCircle  width="200px" height="200px"/>
  
      <h3 style={{color:"White",marginLeft:"50px",marginTop:"0px"}}>Mithil</h3>
    <h5 style={{color:"White",marginLeft:"60px",marginTop:"-20px"}}>Tester</h5>    </Col>
    </Row>
  </Row>
</Container>
<hr style={{backgroundColor:"grey",marginLeft:"150px",marginRight:"150px"}}></hr>

<Accordion >
  <Card bg="dark" style={{marginLeft:"500px",marginRight:"500px",borderRadius:"30px",marginBottom:"0px"}}>
    <Accordion.Toggle as={Card.Header} eventKey="0">
   <center>Contact Details</center>   
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
     <Jumbotron style={{color:"black",fontFamily:"comic"}}>
      <p>Address    :   <span style={{paddingLeft:"0px",marginTop:"10px"}} ><p>14/119,Hitech Colony,Stephen Road , NewYork</p></span></p>
    <br></br>
    <p>Ph.NO    :   <span style={{paddingLeft:"0px",marginTop:"-10px"}} ><p>+(123)1111111  ,   (118)7777777</p></span></p>
    <br></br>
    <p>Email    :   <span style={{paddingLeft:"0px",marginTop:"-10px"}} ><p>wastepower@gmail.com</p></span></p>

     </Jumbotron>

      </Card.Body>
    </Accordion.Collapse>
  </Card>
 </Accordion>

            </div>


        )
    }
}
