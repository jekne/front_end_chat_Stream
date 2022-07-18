//working 
// import '@stream-io/@stream-io/stream-chat-css/dist/css/index.css';
import './App.css';
import './App.css';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import ChatPage from './Pages/ChatPage';
import Join from './Pages/Join';
import { useState } from 'react';
import Lobby from './Pages/Lobby';



// function App() {
//   return (
//     <div className="App">
//      <Routes>

// <Route exact path="/" element={<Login />} />
// <Route path="/chat" element={<ChatPage/>}/>

// <Route path="/lobby" element={<Lobby/>}/>
// <Route path="/join" element={<Join/>}/>
// </Routes>
//     </div>
//   );
// }


//working 

//test

function App() {
  const [connectUser, setConnectUser] = useState("");
  console.log("what is connectUser!!!!!!!!!?", connectUser);
  return connectUser ? (
    <Lobby connectUser={connectUser} />
  ) : (
    <Login setConnectUser={setConnectUser} />
    
  );
}


//test






export default App;
