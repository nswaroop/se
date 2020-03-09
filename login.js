import React from "react";
import './login.css'
import A from './admin'
import {Link} from  'react-router-dom'
import NewWindow from 'react-new-window'
import {BrowserRouter as Router,Route } from 'react-router-dom'
class FormElementCombined extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value1: '', value2: '',value3: 'admin',login:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getdata = this.getdata.bind(this);
        this.displayPage = this.displayPage.bind(this);
    }

    handleChange(event) {
        if (event.target.name === "username") {
            this.setState({ value1: event.target.value })
        }
        else if (event.target.name === "password") {
            this.setState({ value2: event.target.value })
        }
        else if (event.target.name === "type") {
            this.setState({ value3: event.target.value })
        }
    }

    handleSubmit(event) {
             this.getdata();
           
       if (this.state.value1 === '' || this.state.value2 === '')
       {
         if(this.state.login===1)
         {
        
         }
        }
       event.preventDefault();
       
    }
    getdata=()=>{
         var data= new URLSearchParams();
         console.log(this.state.value1)
     data.append("username",this.state.value1)
     data.append("password",this.state.value2)
     data.append("type",this.state.value3)
     fetch("http://localhost:8000/login",{
       method:'post',
       body:data
     })
    .then(response =>{return response.json()})
    .then(response =>{
     this.setState({login:response.log})
     this.displayPage(this.state.login);
    console.log(this.state.login)
})
}

displayPage=(index) =>//displayPage is a function with some flag variable(index) as a param
{
    switch(index){
        default:
        case 1:
        return   this.props.history.push({
                pathname: '/admin',
                search: '?query=abc',
                state: { detail: this.state.value1 }
              })
        //    return this.props.history.push('/n')
        case 2:
            return   this.props.history.push({
                    pathname: '/teacher',
                    search: '?query=abc',
                    state: { detail: this.state.value1 }
                  })
        // case 3:
        //     return   this.props.history.push({
        //                     pathname: '/n',
        //                     search: '?query=abc',
        //                     state: { detail: this.state.value1 }
        //             }) 
       
        // case 3:
        //     return   this.props.history.push({
        //                         pathname: '/n',
        //                         search: '?query=abc',
        //                         state: { detail: this.state.value1 }
        //             })
        case 0:
           return   alert("wrong credentials")
    }
}


   
    render() {
        
        return (
           
        <div class='login' >
                     <form id="form1" onSubmit={this.handleSubmit} name="myform"  >
                          <h1>Login</h1>    
                     <input type="text" value={this.state.value1} name="username"  placeholder='Username' onChange={this.handleChange} /> <br/><br/>
                     <input type="password" value={this.state.value2} name="password" placeholder='Password' onChange={this.handleChange}  style={{marginLeft:"30px",marginTop:'30px'}}/> <br/><br/>
                        <span class='one'>  <select  name='type' value={this.state.value3} onChange={this.handleChange} style={{marginLeft:"30px",marginTop:'30px'}}>
                                     <option>admin</option>
                                     <option>teacher</option>
                                     </select>
                                     </span> 
                  <input type="submit" value="submit" style={{marginLeft:"30px",marginTop:'30px'}}/>
                </form>
                <div class='shadow'></div>
                
               
             
                </div>
             
           
            
        )
    }
}
export default FormElementCombined
