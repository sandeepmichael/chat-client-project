import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Join.css'

const Join = () => {
const[name, setName] = useState('')
const[room, setRoom] = useState('')


//click handlers..
const onNamechange =(event) => {
    setName(event.target.value)
}

const onRoomchange = (event) =>  {
    setRoom(event.target.value)
}

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join To ChatRoom</h1>
             <div>
                 <input placeholder='join with username' className="joinInput" type="text" onChange={onNamechange} />
             </div>
             <div>
             <input placeholder='Room password' className="joinInput mt-20" type="text" onChange={onRoomchange} />
             </div>
              <Link onClick={event => (!name || !room) ? event.preventDefault() : null}  to={`/chat?name=${name}&room=${room}`}>
              <button className="button mt-20" type="submit">Sign in</button>
              </Link>

            </div>
            
        </div>
    )
}

export default Join;
