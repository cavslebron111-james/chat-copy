import React,{Component} from 'react'
import io from 'socket.io-client';
import {USER_CONNECTED,LOGOUT} from '../../Events'
import Loginform from '../Loginform';
import ChatContainer from '../chat/ChatContainer';
const socketUrl = "192.168.1.39:8888";
export default class Layout extends Component {
    constructor(props){
        super(props)
        this.state ={
            socket:null,
            user:null
        }
    }
    componentWillMount(){
        this.initsocket()
    }
        initsocket = ()=>{
     const socket =io(socketUrl)
     socket.on('connect',()=>{
         console.log('connected')
     })
     this.setState({socket});
    }

    SetUser=(user)=>{
        const {socket} = this.state;
        socket.emit(USER_CONNECTED,user);
        this.setState({user});
    }

    Logout=(user)=>{
        const {socket} = this.state;
        socket.emit(LOGOUT);
        this.setState({user:null}); 
    }
     render(){
   
   const {title} = this.props;
   const {socket,user} = this.state;
        return (
        <div className="container">
            { !user ?
          <Loginform socket={socket} SetUser={this.SetUser} />
           :
          <ChatContainer socket={socket} user={user} Logout={this.Logout} />
       
            }
           </div>
    )
}
}
