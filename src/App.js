import React from 'react';
import './App.css';
import Main from './Components/Main'
import Home from './Components/Home'
import Profile from './Components/Profile';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from "./Components/Navbar";
// import Popup from "./Components/Popup";
import Dogs from './Components/Dogs';
import Map from './Components/Maps/Maps'
import { FavoriteProvider } from './context/favoritesContext';
import Login2 from "./Components/Login2"
import Signup2 from "./Components/Signup2"
import Protected from "./Components/protected";
import { AuthProvider } from './context/AuthContext';

function App() {

/*   const [popupLogin, setPopupLogin] = useState(false);
  const [popupSignin, setPopupSignin] = useState(false); */

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  console.log('userLogin', user)
  const handleChangeLogin = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  // const [userLogin, setUserLogin] = useState(() => {
  //   const initial = false;
  //   try {
  //     const data = localStorage.getItem("userLogin");
  //     return data ? JSON.parse(data) : initial;
  //   } catch (e) {
  //     return initial;
  //   }
  // });

  // useEffect(() => {
  //   localStorage.setItem("userLogin", JSON.stringify(userLogin));
  // }, [userLogin]);

  // const [newUsers, setNewUsers] = useState(() => {
  //   const initial = [];
  //   try {
  //     const data = localStorage.getItem("registeredUsers");
  //     return data ? JSON.parse(data) : initial;
  //   } catch (e) {
  //     return initial;
  //   }
  // });

  // useEffect(() => {
  //   localStorage.setItem("registeredUsers", JSON.stringify(newUsers));
  // }, [newUsers]);

  // function addNewUserLogin() {
  //   const newUserLogin = {
  //     email: loginValues.email,
  //     password: loginValues.password,
  //   };
  //   setUserLogin(newUserLogin);
  // }
   const [userLogin, setUserLogin] = useState(null)

  const isLoggedIn = userLogin ? true : false;

  const [favorites, setFavorites] = useState([])
 
  const updateFavoriteDogs = (name) =>{
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if(isFavorite >= 0) {
      updated.splice(isFavorite, 1)
    } else {
      updated.push(name);
    }
    setFavorites(updated);
  }

  return (
    <AuthProvider>
    <FavoriteProvider value={{favoriteDogs: favorites,
    updateFavoriteDogs: updateFavoriteDogs
    }}
    >
    <div className="App">
      <BrowserRouter>
      <Navbar
          isLoggedIn={isLoggedIn}
          
          user={user}
          setUser={setUser}
          userLogin={userLogin} setUserLogin={setUserLogin}
          
        />
        {/* <Popup
          triggerLogin={popupLogin}
          setTriggerLogin={setPopupLogin}
          triggerSignin={popupSignin}
          setTriggerSignin={setPopupSignin}
          isLoggedIn={isLoggedIn}
          setNewUsers={setNewUsers}
          newUsers={newUsers}
          user={user}
          setUser={setUser}
          addNewUserLogin={addNewUserLogin}
        /> */}


       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/main" element={<Main isLoggedIn={isLoggedIn}/>} />
        <Route path="/main/:id" element={
          <Protected isLoggedIn={isLoggedIn}><Dogs/></Protected>} 
         />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/maps" element={<Map />} />
        <Route path="/login" element={<Login2 setUser={setUser} userLogin={userLogin} setUserLogin={setUserLogin} user={user} handleChangeLogin={handleChangeLogin} />} />
        <Route path="/signup" element={<Signup2   />} />
      </Routes>
      </BrowserRouter>
    </div>
    </FavoriteProvider>
    </AuthProvider>
  );
}

export default App;