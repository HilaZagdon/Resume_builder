import React, { useState, useContext } from 'react';
import NavBar from './Components/navBar/NavBar';
import SignIn from './Components/signIn/SignIn';
import SignUp from './Components/signUp/SignUp';
import { UserContext } from "./context/UserContext";
import { ThemeContext } from "./context/Theme";
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/home/Home";
import MyResumes from "./Pages/myResumes/MyResumes";
import Resume from "./Pages/resume/Resume";

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const { selectedTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const handleToggleSignIn = () => {
    setShowSignIn((prev) => !prev);
  };

  return (
    <div style={{...selectedTheme}}>
         <BrowserRouter>

      <div >
      <NavBar />
      </div>
      {showSignIn && <SignIn onClose={handleToggleSignIn} />}

       {user ? (
          <Routes>
            <Route
              path="/home"
              element={
                <Home  />
              }
            />
            <Route
              path="/myResumes"
              element={
                <MyResumes  />
              }
            />
            <Route
              path="/resume"
              element={
                <Resume/>
              }
            />
            <Route
              path="/"
              element={
                <Home />
              }
            />
                <Route
              path="/signUp"
              element={
                <SignUp />
              }
            />
                <Route
              path="/signIn"
              element={
                <SignIn />
              }
            />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        ) : (
          <Routes>
           <Route
              path="/home"
              element={
                <Home  />
              }
            />
            <Route
              path="/myResumes"
              element={
                <MyResumes  />
              }
            />
            <Route
              path="/resume"
              element={
                <Resume/>
              }
            />
            <Route
              path="/"
              element={
                <Home />
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
