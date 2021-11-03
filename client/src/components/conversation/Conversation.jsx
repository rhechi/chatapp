import './conversation.css'
import { useState , useEffect } from 'react'
import axios from 'axios';


function Conversation({conv , currentUser}) {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        const friendID = conv.members.find(m => m !== currentUser.id);
        const getUser = async () =>{
            try {          
                //apicall---------------------------------------
                const res = await axios.get("/users/"+friendID)
               // console.log(res.data)
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    },[currentUser,conv])
    return (
        <div className="conversation">
            <img className="conversationImg" src={user?.profilePicture} alt="" />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}

export default Conversation
