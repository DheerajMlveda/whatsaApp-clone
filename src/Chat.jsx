import { faMicrophone } from "@fortawesome/free-solid-svg-icons"
import "./Chat.css";
import { LinkOutlined, MoreOutlined, SearchOutlined, SmileOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import db from "./Firebase";
import { addDoc, collection, documentId, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { useStateValue } from "./StateProvider";
function Chat() {
    const [{user} , dispatch] = useStateValue();
    // const [message, setMessage] = useState('')
    const [roomName, setRoomName] = useState('')
    const [input , setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const { roomId } = useParams();
    const sendMessage = (e) => {
        e.preventDefault();

        console.log('Your message ' + input)
        
        const messageRef = collection(db , "rooms" , roomId , "messages");
        const newMessage = {
            message : input,
            name : user.displayName,
            timestamp: serverTimestamp()

        }

        addDoc(messageRef , newMessage).then((docRef) => {
            console.log("document is written with " , docRef.id)
        }).catch((error) => {
            console.log('this is the error'  ,error);
        })
        setInput("");
    }

    useEffect(() => {

        if (roomId) {
            const q = query(collection(db, "rooms"), where(documentId(), "==", roomId))
            onSnapshot(q, (snapshot) => {
                setRoomName(snapshot.docs[0].data().name)
                // setRoomName(
                //     snapshot.docs.data().name
                // );
            });
            const messageRef = collection(db, "rooms", roomId, "messages");
            const messageQuery = query(messageRef, orderBy("timestamp", "asc"));
            onSnapshot(messageQuery, (snapshot) => {
                const messages = snapshot.docs.map((doc) => doc.data()); setMessages(messages);
                console.log(messages);
            })


        }



        return () => {
            console.log("clean up code here")
        }
    }, [roomId])

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://api.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />
                <div className="chat_headerInfo"><h3>
                    {roomName}
                </h3>
                    <p>{new Date( messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat_headerRight">
                    <SearchOutlined />
                    <LinkOutlined />
                    <MoreOutlined />
                </div>
            </div>
            <div className="chat_body">
                {
                messages.map((message) => (<p className={`chat_message ${message.name ===user.displayName && "chat_receiver"}`}>
                    <span className="chat_name">
                        {message.name}
                    </span>{message.message}
                    <span className="chat_timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>

                </p>))}


            </div>
            <div className="chat_footer">
                <SmileOutlined />
                <form >
                    <input value={input} onChange={(e) => {
                        setInput(e.target.value)
                    }} placeholder="Enter message" />
                    <button onClick={sendMessage} type='submit'>send message</button>
                </form>
                <FontAwesomeIcon icon={faMicrophone} />
            </div>


        </div>
    )
}

export default Chat