import React, { useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};



let socket;

const Chat = ({location}) => {
    const[name, setName] = useState('')
    const[room, setRoom] = useState('')
    const[message, setMessage] = useState('')
    const[messages, setMessages] = useState([])
    

useEffect(() => {
    const {name, room} = queryString.parse(location.search)

socket = io.connect('https://hnew-app.herokuapp.com/'
,connectionOptions);
    setName(name)
    setRoom(room)
// conecting to server.js
    socket.emit('join', {name, room}, () => {
          
    })
    //

    // disconnecting event
    return () => {
    socket.emit('disconnect');



    socket.off();
    }
    //.....
    
},[ connectionOptions, location.search]);

useEffect(() => {
// this event coming from server side
    socket.on('message', (message)=> {
        setMessages([...messages, message])

    }, [messages])
})


// function for sending messages...
const sendMessage = event => {
    event.preventDefault();

    if(message) {
        socket.emit('sendMessage', message, () => {
            setMessage('')
        })
        
   
}
}

//console.log(message, messages)



    return (
        <div className = "outerContainer">
            <div className = "container">
                <InfoBar name={name} />
                <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} 
            />
            </div>
        </div>
    )
}

export default Chat
