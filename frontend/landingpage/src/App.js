import React from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Anout from './pages/Anout'
import Profile from './pages/Profile'
import Registerpage from './pages/Registerpage'
import Cards from './components/Cards'
import Leaderboard from './components/Leaderboard'
import Dialogue from './components/Dialogue'
import EnterPhoneNo from './components/EnterPhoneNo'
import EnterEmail from './components/EnterEmail'
import Chat from './pages/Chat'
import Otp from './components/Otp'
import '../src/App.css'
import { BrowserRouter as Router , Routes ,Route} from 'react-router-dom';
import Chatbox from './components/Chatbox'






const App = () => {
  const players = [
    { id: 1, name: 'Vaskarjya', score: 10 },
    { id: 2, name: 'Saurabh', score: 8 },
    { id: 3, name: 'Progyan', score: 12 },
    { id: 4, name: 'Terron', score: 0 },
    { id: 5, name: 'Hirok', score: -1 },
  ];
  return (
    
    <>
     
    <Router>
      <NavBar title="Our Site Name Here "/>
      <Routes>

      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/Contact" element={<Contact/>}/>
      <Route exact path="/about" element={<Anout/>}/>
      <Route exact path="/Profile" element={<Profile/>}/>
      <Route exact path="/register" element={<Registerpage/>}/>
      <Route exact path="/Dialogue" element={<Dialogue/>}/>
      <Route exact path="/EnterPhoneNo" element={<EnterPhoneNo/>}/>
      <Route exact path="/EnterEmail" element={<EnterEmail/>}/>
      <Route exact path="/otppage" element={<Otp/>}/>
      <Route exact path="/chatbox" element={<Chatbox/>}/>
      <Route exact path="/Chat" element={<Chat/>}/>
      <Route exact path="/card" element={<React.Fragment>
        

        <div>
      <Cards
        title="hello"
        imageSrc="https://via.placeholder.com/300x350"
        content="sourav."
      />
    </div>

</React.Fragment>}/>
       <Route exact path="/Leaderbord" element={<React.Fragment>

        <div className="App">
      <Leaderboard players={players} />
    </div>
</React.Fragment>}/>
      </Routes>
      </Router>
    </>
  )
}

export default App

