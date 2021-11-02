import './message.css'

function Message({message, own}) {
 
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img style={own ? {display: "none"}: {}} className="messageImg" src='' alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">
            1 hour ago
            </div>
        </div>
    )
}

export default Message
