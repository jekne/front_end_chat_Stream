//working 
// import '@stream-io/@stream-io/stream-chat-css/dist/css/index.css';
import './App.css';
import './App.css';
import Login from './Pages/Login.js';
import { Routes, Route } from 'react-router-dom';
import ChatPage from './Pages/ChatPage.js';
import { useState } from 'react';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';


//test
function App() {
  const [connectUser, setConnectUser] = useState("");

  console.log("what is connectUser!!!!!!!!!?", connectUser);

 return connectUser ? (
    <ChatPage connectUser={connectUser} />
  ) : (
    <Login setConnectUser={setConnectUser} />
    
  ); 


}
//test

// function App() {
//   return (
//     <div className="App">
//      <Routes>

// <Route exact path="/" element={<Login />} />
// <Route path="/chat" element={<ChatPage/>}/>

// </Routes>
// <Chat/>
//     </div>
//   );
// }
//working 


export default App;
