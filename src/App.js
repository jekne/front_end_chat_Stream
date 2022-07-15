
// import './App.css';
// import Login from './Pages/Login';
// function App() {
//   return (
//     <div className="App">
  
//      <Login/>
//     </div>
//   );
// }

// export default App;



import './App.css';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import ChatPage from './Pages/ChatPage';


function App() {
  return (
    <div className="App">
     <Routes>

<Route exact path="/" element={<Login />} />
<Route path="/chat" element={<ChatPage/>}/>


</Routes>
    </div>
  );
}

export default App;
