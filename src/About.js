import {useNavigate} from "react-router-dom";

function About()
{
	const nav = useNavigate();
	return(
		<>
				<center>
				<div className = "about-header">
				<h2>About</h2>
				</div>
				<div className = "about-para">
					<p>This is a simple BMI calculator <br/>
						application made using
						React & Firebase.
					</p>
				</div>
				<br/><br/>
				<div className = "features-header">
				<h2>Features</h2>
				</div>
				<div className = "about-list">
				<ol style = {{listStyle: 'none'}}>
					<li>Add, Delete & View users.</li>
					<li>User details is stored in Firebase Realtime Database.</li>
					<li>Firebase authentication for email and password logins.</li>
				</ol>
				</div>
				<br/><br/>
				<div className = "contact-header">
				<h2>Contact</h2>
				</div>
				<div className = "about-email" >
				<span>Email: devadigaakash303@gmail.com</span>
				</div>
				<br/><br/><br/>
				<button onClick = {() => {nav("/")}}>Back</button>
			</center>
		</>

	);

}
export default About;