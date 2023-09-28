import {useState, useEffect, useRef} from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "./style.scss";
function Login()
{
	const rUn = useRef();
	const nav = useNavigate();
	const[un, setUn] = useState("");
	const[pw, setPw] = useState("");
	

	const hUn = (event) => {setUn(event.target.value);}
	const hPw = (event) => {setPw(event.target.value);}

	const save = (event) => {
		event.preventDefault();
		const auth = getAuth();
		signInWithEmailAndPassword(auth, un, pw)
		.then(res=>{
			localStorage.setItem("un",un);
			nav("/")
			alert("Login successful")
		})
		.catch(err=>{
			alert("User not found.");
			setUn("");
			setPw("");
			rUn.current.focus();
		});
	}
	useEffect(()=>{
		let u = localStorage.getItem("un");
		if(u != null)
			nav("/");
			
	}, []);
	
	return(
		<>
				<div className = "formContainer">
					<div className = "formWrapper">
					<span className = "title">Log in</span><br/>
						<form onSubmit = {save}>
							<input type = "email" placeholder = "Enter your email" onChange = {hUn} value = {un} ref = {rUn}  />
							<input type = "password" placeholder = "Enter your password" onChange = {hPw} value = {pw}/>
							<button>Sign In</button>
						</form>
							<div className = "register-nav-link">
								<p>You don't have an account? <Link to = "/register">Register</Link></p>
							</div>
							<div className = "login-nav-link">
								<p><Link to = "/forgot">Forgot your password?</Link></p>
							</div>
					</div>
				</div>
		</>
	);	
}

export default Login;