import { Route, Routes } from "react-router";
import "./App.css"
import Chat from "./Chat"
import Sidebar from "./Sidebar";
import { useState } from "react";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
function App() {
  const [{user} , dispatch] = useStateValue();
  return (
    <>
    <div className="app">
      {!user? ( <Login/>): (<div className="app_body">
      <Sidebar/>
      <Routes>
      <Route path="/">
        homescreen
      </Route>
      <Route path="rooms/:roomId" element={<Chat/>}/>
        </Routes>
      </div>)
     
}
      </div>
    </>
  );
}

export default App;
