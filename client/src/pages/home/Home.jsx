//WARNING: THIS IS SOME SHITTY CODE HERE, AM STILL TESTING

import './home.css'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import {Context} from "../../contextAPI/Context"
import axios from 'axios'
import { useContext , useState , useEffect, useRef} from 'react'
import { io } from "socket.io-client"


function Home() {
    const [convs,setConvs] = useState([])
    const [chat,setChat] = useState(null)
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const socket = useRef()
    const {user} = useContext(Context)
    const scrollRef = useRef();

    useEffect(() =>{
        socket.current = io("ws://localhost:8000")
        socket.current?.on("getMessage", message =>{
           setArrivalMessage({
              sender: message.senderId,
              text: message.text,
              createddAt: Date.now
           })
        })
    },[])
    useEffect(()=>{
        arrivalMessage && chat?.members.includes(arrivalMessage.sender) && 
        setMessages(prev=>[...prev,arrivalMessage])
    },[arrivalMessage,chat])
    
    useEffect(()=>{
        socket.current.emit("init" , user.id)
        socket.current.on("getUsers", users=>{
            console.log(users)
        })
    },[user])
  

   
    useEffect(()=>{
        const getConvs = async () =>{
            try {
                //apiCall-----------------------------------------
                const res = await axios.get("/convs/"+user.id)
                setConvs(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getConvs()
    },[])
    useEffect(()=>{
        const getMessages = async () =>{
            try {
                //apicall------------------------------------
                const res = await axios.get("/messages/"+chat?._id)
                
                setMessages(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMessages()
    },[chat])
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    },[messages])

    const onSubmit= async (e) =>{
        e.preventDefault()
        console.log("chat:",chat?._id)
        const message = {
            
            conversationID: chat._id,
            sender: user.id,
            text:newMessage
            
        }
        const recieverId = chat.members.find(member => member !== user.id)
        socket.current.emit("sendMessage",{
            senderId: user.id,
            recieverId,
            text: newMessage
        })
        try {
            //apicall---------------------------------------------------
            const res = await axios.post("/messages",message);
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="messenger">
            <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input className="chatMenuInput" type="text" placeholder="serach for friends" />
                {convs.map(e => (
                    <div onClick={()=>{setChat(e)}}>
                    <Conversation conv={e} currentUser={user}/>
                    </div>
                ))}
            </div>
            </div>
           
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        chat ? <>
                    
                    <div className="chatBoxTop">
                        {messages.map(m=>(
                            <div ref={scrollRef}>
                                <Message message={m} own={m.sender === user.id}/>
                            </div>
                        ))}
                    </div></> :  <div> No conversation selected</div>}
                    <form className="chatBoxBottom" onSubmit={onSubmit}>
                        <input onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} type="text" className="chatMessageInput" placeholder="write text here"/>
                        <button className="chatSubmitButton" type="submit">Send</button>
                    </form>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    online
                </div>
            </div>
        </div>
    )
}

export default Home

