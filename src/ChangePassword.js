import "./style.scss";
import {useState, useEffect, useRef} from "react";
import {getAuth, updatePassword, onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom";

function ChangePassword()
{
	
	useEffect(()=>{
		const un = localStorage.getItem("un");
		if(un==null)
			nav("/login");
	}, []);
	const[pw1, setPw1] = useState("");
	const[pw2, setPw2] = useState("");
	const rPw1 = useRef();
	const nav = useNavigate();

	const hPw1 = (event) => {setPw1(event.target.value);}
	const hPw2 = (event) => {setPw2(event.target.value);}
	
	const save = (event) => {
		event.preventDefault();
		if(pw1==pw2)
		{
			const auth   = getAuth();
			onAuthStateChanged(auth, (user) => {
				updatePassword(user, pw1)
				.then(res=>{
					alert("Password changed successfully!");
					localStorage.clear();
					nav("/login");
				})
				.catch(err=>console.log(err));
			})

		}
		else
		{
			alert("Passwords do not match!");
			setPw1("");
			setPw2("");
			rPw1.current.focus();
		}
	}
		
	
	return(
		<>
			<div className = "formContainer">
					<div className = "formWrapper">
					<span className = "title">Change Password</span><br/>
						<form onSubmit = {save}>
							<input type = "password" placeholder = "Enter your new password" onChange = {hPw1} value = {pw1} ref = {rPw1}  />
							<input type = "password" placeholder = "Confirm your new password" onChange = {hPw2} value = {pw2}   />
							<button> Change </button>
							<button onClick = {()=> {nav("/")}}>Back</button>
						</form>
						
					</div>
				</div>
		</>
	);

}
export default ChangePassword;