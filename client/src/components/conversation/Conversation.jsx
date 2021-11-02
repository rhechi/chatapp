import './conversation.css'
import { useState , useEffect } from 'react'
import axios from 'axios';


function Conversation({conv , currentUser}) {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        const friendID = conv.members.find(m => m !== currentUser.id);
        const getUser = async () =>{
            try {          
                const res = await axios("/users/"+friendID)
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
    },[currentUser,conv])
    return (
        <div className="conversation">
            <img className="conversationImg" src={user.profilePicture} alt="" />
            <span className="conversationName">{user.firstName}</span>
        </div>
    )
}

export default Conversation
