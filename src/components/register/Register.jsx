import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already exists! Please use a different email.");
      } else {
        alert("Error registering user: " + error.message);
      }
      console.error("Error registering user:", error.message);
    }
  };
  
  const [user] = useAuthState(auth);
  if(user){
    console.log("user logged in", user);
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
        <>
    <form onSubmit={handleRegister}>
        <input
        type="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
    <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Register;
