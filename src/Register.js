import "./style.scss";
import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";


function Register()
{
	
	const nav = useNavigate();
	
	const[un, setUn] = useState("");
	const[pw, setPw] = useState("");

	
	const hUn = (event) => {setUn(event.target.value);}
	const hPw = (event) => {setPw(event.target.value);}
	
	const register = (event) => {
		event.preventDefault();
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, un, pw)
		.then(res=>{
			alert("Registration Successful!");
			nav("/login")

		})
		.catch(err=>console.log("issue " +err));
	}
	useEffect(()=>{
		let u = localStorage.getItem("un");
		if(u != null)
			nav("/home")
	}, []);
	return(
		<>
			
				<div className = "formContainer">
					<div className = "formWrapper">
					<span className = "title">Register</span><br/>
						<form onSubmit = {register}>
							
							<input type = "email" placeholder = "Enter your email" onChange = {hUn} />
							<input type = "password" placeholder = "Enter your password" onChange = {hPw}/>
							<button>Sign Up</button>
						</form>
							<div className = "register-nav-link">
								<p>Already have an account?<Link to = "/login"> Login</Link></p>
							</div>
					</div>
				</div>
		

		</>
	);
}
export default Register;