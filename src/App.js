import logo from './logo.svg';
import './App.css';
import  Register from "./Register";
import "./style.scss";
import Home from "./Home.js";
import Login from "./Login";
import {app} from "./FirebaseConfig.js";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ForgotPassword from "./ForgotPassword.js";
import Enquiry from "./Enquiry.js";
import ChangePassword from "./ChangePassword.js";
import Create from "./Create.js";
import About from "./About.js";

function App() {
  return (
    <div className="App">
      	<BrowserRouter>
		<Routes>
			<Route path = "/" element = {<Home/>} />
			<Route path = "/login" element = {<Login/>} />
			<Route path = "/register" element = {<Register/>} />
			<Route path = "*" element = {<Navigate to = "/"/>} />
			<Route path = "/forgot" element = {<ForgotPassword/>} />
			<Route path = "/enquiry" element = {<Enquiry/>} />
			<Route path = "/change" element = {<ChangePassword/>} />
			<Route path = "/create" element = {<Create/>} />
			<Route path = "/about" element = {<About/>} />
		</Routes>
	</BrowserRouter>
    </div>
  );
}

export default App;
