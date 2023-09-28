import {useState, useRef, useEffect} from "react";
import {get, set, ref, child} from "firebase/database";
import db from "./FirebaseConfig.js";
import {useNavigate} from "react-router-dom";
import NavBar from "./NavBar.js";
import "./style.scss";
function Create()
{
	const nav = useNavigate();
	const rId= useRef();
	const[id, setId] = useState("");
	const[name, setName] = useState("");	
	const[age, setAge] = useState("");
	const[height, setHeight] = useState("");	
	const[weight, setWeight] = useState("");	
	const[gender, setGender] = useState("male");
	const[category, setCategory] = useState("");
	const[bmi, setBmi] = useState("");
	const hId = (event) => {setId(event.target.value);}
	const hName = (event) => {setName(event.target.value);}
	const hAge  = (event) => {setAge(event.target.value);}
	const hHeight = (event) => {setHeight(event.target.value);}
	const hWeight = (event) => {setWeight(event.target.value);}
	const hGender = (event) => {setGender(event.target.value);}

	
	useEffect(()=>{rId.current.focus()}, []);
	
	const save = (event) => {
		event.preventDefault();
		if(id.length == "")
		{
			alert("Id cannot be empty!");
			setId("");
			setName("");
			setAge("");
			setHeight("");
			setWeight("");
			rId.current.focus();
			return;

		
		}
		else if(id < 0)
		{
			alert("Id cannot be negative!");
			setId("");
			setName("");
			setAge("");
			setHeight("");
			setWeight("");
			rId.current.focus();
			return;


		}
		else if((! name.match(/^[A-Za-z ]+$/)) || (name.trim().length == 0) )
		{
			alert("Invalid name! Name can only contain alphabets");	
			setId("");
			setName("");
			setAge("");
			setHeight("");
			setWeight("");
			rId.current.focus();
			return;
		}
		else if (name.length == "")
		{
			alert("Name cannot be empty!");
			setId("");
			setName("");
			setAge("");
			setHeight("");
			setWeight("");
			rId.current.focus();
			return;

		}
		else if (name.length < 2)
		{
			alert("Name should contain atlease two alphabets!");
			setId("");
			setName("");
			setAge("");
			setHeight("");
			setWeight("");
			rId.current.focus();
			return;
		}
		
		else if (age <= 0)
		{

			alert("Age cannot be zero or negative!");
			setId("");
			setName("");
			setAge("");
			setHeight("");
			setWeight("");
			rId.current.focus();
			return;
		}

		else if (age.length == "")
		{
			alert("Age cannot be empty!");
			setId("");
			setName("");
			setAge("");
			setHeight("");
			setWeight("");
			rId.current.focus();
			return;

		}
		else if (height <= 0.0)
		{
			alert("Height cannot be zero or negative!");
			setId("");
			setName("");
			setAge("");
			setHeight("");
			setWeight("");
			rId.current.focus();
			return;
		}
		else if (height.length == "")
		{
			alert("Height cannot be empty!");
			setId("");
			setName("");
			setAge("");
			setHeight("");
			setWeight("");
			rId.current.focus();
			return;

		}
		else if (weight<=0.0)
		{
			alert("Weight cannot be zero or negative!");
			setId("");
			setName("");
			setAge("");
			setHeight("");
			setWeight("");
			rId.current.focus();
			return;
		}
		else if (weight.length == "")
		{
			alert("Weight cannot be empty!");
			setId("");
			setName("");
			setAge("");
			setHeight("");
			setWeight("");
			rId.current.focus();
			return;

		}

		let bmi1 = weight/(height*height);
		setBmi(bmi1.toFixed(2));
		if((bmi1>=18.5) && (bmi1<25))
			setCategory("Healthy");
		else if((bmi1>=25) && (bmi1<30))
			setCategory("Overweight");
		else if(bmi1>=30)
			setCategory("Obese");
		else
			setCategory("Underweight");

			
		
		let r1 = ref(db);
		get(child(r1, "patients/" +id))
		.then((ss)=>{
			if(ss.exists())
			{
				alert(id + " already exists");
				setId("");
				setName("");
				setAge("");
				setHeight("");
				setWeight("");
				setBmi("");
				setCategory("");	
				rId.current.focus();

			}
			else
			{
				let r2 = ref(db, "/patients/" +id);
				let data = {id, name, age, height, weight, gender};	
				set(r2, data);
				alert("Record added successfully!");
				setId("");
				setName("");
				setAge("");
				setHeight("");
				setWeight("");
				setBmi("");
				setCategory("");
				setGender("male");
			}


		})
		.catch(err=>console.log("issue "+err));
	}
	return(
		<>
			
					
			<div className = "formContainer">
					<div className = "formWrapper">
					<span className = "title">Create</span><br/>
						<form onSubmit = {save}>
							<input type = "number" placeholder = "Enter id" onChange = {hId} value = {id} ref = {rId}/>
							<input type = "text" placeholder = "Enter name"  onChange = {hName} value = {name} />
							<input type = "number" placeholder = "Enter age" onChange = {hAge} value = {age}/>
							<input type = "number" placeholder = "Enter height in metres" step = "any" min ="1.0" max = "3.0" onChange = {hHeight}
								value = {height} />
							<input type = "number" placeholder = "Enter weight in kgs" step = "any" onChange = {hWeight}
								value = {weight} min = "1.0" max = "600.0"/>
							
							<label>Select your gender</label><select name = "gender" onChange = {hGender}>
								<option value = "male" >Male</option>
								<option value = "female">Female</option>
								<option value = "others">Other</option>
							</select>
							<div>
								<h3>Your bmi is {bmi}. You are {category}.</h3>
			
							</div>
						
							<button>Save</button>
							<button onClick = {()=>{nav("/")}}>Back</button>
						</form>
						
					</div>
				</div>
			</>
	);

}
export default Create;