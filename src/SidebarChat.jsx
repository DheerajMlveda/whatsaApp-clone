import "./sidebarChat.css"
import React from 'react'
import { Avatar } from "antd"
import { useState, useEffect } from 'react'
import db from "./Firebase"
import { Link } from "react-router-dom"
import { collection, addDoc, query, orderBy, onSnapshot, doc } from 'firebase/firestore'

function SidebarChat({ id, name, addNewChat }) {
    const [messages, setMessages] = useState([])

    const createChat = async () => {
        const roomName = prompt("Create new chat")

        if (roomName) {
            //do something
            try {
                console.log(roomName);
                const collectionRef = await addDoc(collection(db, "rooms"), {
                    name: roomName,
                }
                )
            } catch (e) {
                console.error("error while doing" + e)
            }

        }
    }
    useEffect(() => {
        if(!id)return;
        const roomId = id;
        
        
        const query1 = query(collection( db  , "rooms" , roomId , "messages" , ),orderBy("timestamp" , "desc"))
        const unsub = onSnapshot(query1, (snapshot) => {
            const message = snapshot.docs.map((doc) => doc.data()); setMessages(message);
            console.log(message);
            console.log(snapshot);
        })
    
      return () => {
        unsub();
      }
    }, [id])
    
    


    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                {/* <Image
                width={30} height={30} preview={false} style={{ border: "2px solid black", borderRadius: "20px" }}
                src="https://api.dicebear.com/api/human/adas.svg"
            /> */}
                <Avatar src={`https://api.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>

    ) : (
        <div onClick={() => createChat()}>

            <h1 >Add new Chat</h1>
        </div>

    )


}

export default SidebarChat