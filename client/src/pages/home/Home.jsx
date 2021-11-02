import './home.css'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import {Context} from "../../contextAPI/Context"
import axios from 'axios'
import { useContext , useState , useEffect, useRef} from 'react'

function Home() {
    const [convs,setConvs] = useState([])
    const [chat,setChat] = useState(null)
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
    const {user} = useContext(Context)
    const scrollRef = useRef();
    useEffect(()=>{
        const getConvs = async () =>{
            try {
                
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
                const res = await axios.get("/messages/"+chat.id)
                setMessages(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMessages()
    },[chat])

    const onSubmit= async (e) =>{
        e.preventDefault()
        const message = {
            sender: user.id,
            text:newMessage,
            conversationID:chat.id
        }
        try {
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
                            <Message message={m} own={m.sender === user.id}/>
                        ))}
                    </div></> :  <div> No conversation selected</div>}
                    <form className="chatBoxBottom" onSubmit={onSubmit}>
                        <textarea onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} type="text" className="chatMessageInput" placeholder="write text here"/>
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

