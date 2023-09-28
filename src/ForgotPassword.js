import "./style.scss";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";

function ForgotPassword()
{
	const rUn = useRef();
	const nav = useNavigate();
	const[un, setUn] = useState("");
	const hUn = (event) => {setUn(event.target.value);}
	const send = (event) =>{
		event.preventDefault();
		const auth = getAuth();
		sendPasswordResetEmail(auth, un)
		.then(res=> {
			alert("Please check your email!");
			nav("/login")
		
		})
		.catch(err=>
		{
			console.log("issue " +err)
			alert("Please enter a registered email id!");
			setUn("");
			rUn.current.focus();
		});
	}
	useEffect(()=>{
		let u = localStorage.getItem("un");
		if(u!=null)
			nav("/home");
	}, []);
	return(
		<>
			<div className = "formContainer">
					<div className = "formWrapper">
					<span className = "title">Reset Password</span><br/>
						<form onSubmit = {send}>
							<input type = "email" placeholder = "Enter your registered email"  onChange = {hUn} value = {un} ref = {rUn}  />
							<button> Reset </button>
							<button onClick = {()=>{nav("/login")}}> Back </button>
						</form>
						
					</div>
				</div>
		</>


		);
}
export default ForgotPassword;