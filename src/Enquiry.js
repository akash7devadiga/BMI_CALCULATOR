import "./style.scss";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import emailjs from "@emailjs/browser";
function Enquiry()
{
	const nav = useNavigate("");
	const rName = useRef("");
	const[name, setName] = useState("");
	const[no, setNo] = useState("");
	const[query, setQuery] = useState("");

	const hName = (event) => {setName(event.target.value);}
	const hNo = (event) => {setNo(event.target.value);}
	const hQuery = (event) => {setQuery(event.target.value);}
	
	const send = (event) => {
		event.preventDefault();
		
		if(name.length == "")
		{
			alert("Name cannot be empty!");
			setName("");
			setNo("");
			setQuery("");
			rName.current.focus();
			return;
		}
		else if ((! name.match(/^[A-Za-z ]+$/)))
		{
			alert("Invalid name!");
			setName("");
			setNo("");
			setQuery("");
			rName.current.focus();
			return;

		}

		else if (name.trim().length == 0)
		{
			alert("Name cannot contain only spaces!");
			setName("");
			setNo("");
			setQuery("");
			rName.current.focus();
			return;
		}
		else if (name.length < 2)
		{
			alert("Name should contain atleast two characters!");
			setName("");
			setNo("");
			setQuery("");
			rName.current.focus();
			return;

		}
		else if (no.length == "")
		{
			alert("Phone number cannot be empty!");
			setName("");
			setNo("");
			setQuery("");
			rName.current.focus();
			return;

		}
		else if (query.length == "")
		{
			alert("Please enter your query!");
			setName("");
			setNo("");
			setQuery("");
			rName.current.focus();
			return;

		}


		let data = {"from_name" : name, "from_number": no, "message" : query};
		emailjs.send("service_6cswb7l","template_p5ucdd5", data,"VNPO0kXFLc7fzZtHV")
		.then(res=>{
			setName("");
			setNo("");
			setQuery("");
			rName.current.focus();
			alert("We will get back to you in 2 hours.")

		})
		.catch(err=>console.log(err));
	}
	return(
		<>
			<div className = "formContainer">
					<div className = "formWrapper">
					<span className = "title">Enquiry</span><br/>
						<form onSubmit = {send}>
							<input type = "text" placeholder = "Enter your name" onChange = {hName} value = {name} ref = {rName}/>
							<input type = "number" placeholder = "Enter your phone number" onChange = {hNo} value = {no}/>
							<textarea placeholder = "How can we help you?" rows = {5} cols = {30} onChange = {hQuery} value = {query}/>
							<button>Submit</button>
							<button onClick = {()=>{nav("/")}}>Back</button>
						</form>
						
					</div>
				</div>

		</>
	);

}
export default Enquiry;