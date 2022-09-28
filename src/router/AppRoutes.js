import React, { useState, useEffect, useContext } from "react";
import DogSearch from "../pages/DogSearch";
import Welcome from "../pages/Welcome";
import Profile from "../pages/Profile";
import AdoptionForm from "../pages/AdoptionForm";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "../Components/Navbar";
import InfoDog from "../pages/InfoDog";
import Shelters from "../pages/Shelters";
import Login from "../pages/Login";
import Signup from "../pages/Register";
import Protected from "../router/Protected";
import Posts from "../pages/Posts";
import About from "../pages/About";
import MainChat from "../pages/Chat";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import FavoriteList from "../Components/FavoriteList";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../context/auth";


export default function AppRoutes(props) {
  const { user } = useContext(AuthContext);

  const [registeredName, setRegisteredName] = useState();

  async function getRegisteredName() {

    const auth = getAuth();
    if(auth.currentUser){
      const docRef = doc(db, "users", auth.currentUser.uid);
    console.log(docRef)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setRegisteredName(docSnap.data().name);
      
    } else {
      console.log("No such document!");
    }
  }
  }
 
  useEffect(() => getRegisteredName, [user]);

  
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar setFavorites={props.setFavorites} registeredName={registeredName} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/main" element={<DogSearch />} />
        <Route
          path="/main/:id"
          element={
            <Protected>
              <InfoDog />
            </Protected>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/main/:id/formulario" element={<AdoptionForm />} />
        <Route path="/favorites" element={<FavoriteList />} />
        <Route
          path="/posts"
          element={<Posts registeredName={registeredName} />}
        />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/chat"
          element={
            <Protected>
              <MainChat />
            </Protected>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <ToastContainer/>
    </BrowserRouter>
  </div>
  )
}