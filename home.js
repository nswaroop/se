import React, { Component } from 'react'
import './home.css'
import {Jumbotron,Row,Col,Image,Carousel,Button,Container,Grid,OverlayTrigger} from 'react-bootstrap';
export default class home extends Component {
    render() {
        return (
            <div>
               <Image src={require('./icon1.png')}  roundedCircle  width="400px" height="400px" style={{marginLeft:"950px",marginTop:"40px"}}/>
              
               <div className='b'>
               <p >
               

New Barry is a private deemed-to-be-university and Institute of Eminence based in Yanam, Andhra Pradesh, India. The multi-campus, multi-disciplinary University currently has 3 campuses with 8 constituent schools across Andhra Pradesh, Telangana, Tamil Nadu and Karnataka</p>
               </div>
     
    <Carousel style={{marginTop:"30px",marginBottom:"30px"}}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require('./c1.jpg')}
      alt="First slide"
      width="100px"
      height="400px"
    />
    <Carousel.Caption>
      <h3 style={{marginTop:"120px",color:"black"}}><strong>ClassRoom</strong></h3>
      <p style={{color:"black"}}>Interactive class rooms</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require('./c2.jpg')}
      alt="Third slide"
      width="100px"
      height="400px"
    />

    <Carousel.Caption>
      <h3 style={{marginTop:"100px",color:"black"}}>Library</h3>
      <p>Large resources available</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require('./c3.jpg')}
      alt="Third slide"
      width="100px"
      height="400px"
    />

    <Carousel.Caption>
      <h3 style={{color:"black"}}>Sports</h3>
      <p>Everyone indulge in sporting activities.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
            </div>
        )
    }
}
