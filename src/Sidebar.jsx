import { SmileOutlined, MoreOutlined, MessageOutlined, SearchOutlined, } from '@ant-design/icons'
import db from "./Firebase"
import "./Sidebar.css"
import React, { useState, useEffect } from "react"
import SidebarChat from './SidebarChat'
import { Image } from 'antd'
import { useStateValue } from './StateProvider'
import { collection, onSnapshot, query, } from 'firebase/firestore'
function Sidebar() {

    const [rooms, setRooms] = useState([])
    const [{user} , dispatch] = useStateValue();
    useEffect(() => {
        //              onSnapshot(q , (querySnapshot) => {
        //                 querySnapshot.forEach ( (doc) =>{
        //                     console.log(doc);
        //                 })
        //              })
        //         // db.app.automaticDataCollectionEnabled(true)

        //     //    onSnapshot( collectionRef,(querySnapshot) => {
        //     //     console.log(querySnapshot.data);
        //     // })
        //    console.log(rooms)
        const q = query(collection(db, "rooms",));

        const rooms = onSnapshot(q, (snapshot) => {
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });

        return () => {
            rooms()
        }
    }

        , [])
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Image
                    width={45} style={{ border: "2px solid black", borderRadius: "20px" }}
                    src={user?.photoURL}
                />
                <div className='sidebar_header_right'>
                    <SmileOutlined onClick={() => console.log("hello there")} />
                    <MoreOutlined onClick={() => console.log("hello there")} />
                    <MessageOutlined onClick={() => console.log("hello there")} />
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">

                    <SearchOutlined style={{ color: 'grey' }} />
                    <input placeholder='Search name or number' type="text" /></div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {rooms.map((room) => {
                    console.log(room)
                    return <SidebarChat key={room.id} id={room.id} name={room.data.name} />

                })}
            </div>
        </div>

    )
}

export default Sidebar