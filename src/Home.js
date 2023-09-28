import {getAuth, signOut} from "firebase/auth";
import db from "./FirebaseConfig.js";
import axios from "axios"
import {get, ref, child, remove} from "firebase/database";
import {useLocation, Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import NavBar from "./NavBar";
import "./home.css";

function Home()
{
	const[info, setInfo] = useState([]);
	const[ans1, setAns1] = useState("");
	const[ans, setAns] = useState("");
	const[user, setUn] = useState("");
	const nav = useNavigate();

	useEffect(()=>{
		let r = ref(db)
		get(child(r, "patients/"))
		.then((ss)=>{
			if(ss.exists())
			{
				setInfo([]);
				let data = ss.val();
				console.log("data = ", data);
				Object.values(data).map((d)=>{
					setInfo((olddata)=>[...olddata, d]);
				});
				console.log("info ", info);
			}
			else
			{

				console.log("No data found!");
			}
		})
		.catch(err=>console.log(err));
	}, []);
	

		const logOff = (event) => {
		event.preventDefault();
		const auth = getAuth();
		localStorage.clear();
		signOut(auth)
		.then(res=>nav("/login"))
		.catch(err=>console.log("issue " +err));
	}

	
	const loc = useLocation();
	useEffect(()=>{
		let u = localStorage.getItem("un");
		if(u==null)
			nav("/login")
		else
			setUn(u);
	}, []);

	const delPatient = (id) => {
		let r = ref(db, "patients/" +id);
		remove(r)
		.then( () => {
			alert( id + " deleted successfully!" );
			window.location.reload();
		})
		.catch(err=> console.log(err));
	}

	const getQuote = () => {
		let urladd = "https://api.quotable.io/random";
		axios.get(urladd)
		.then(res=>{
			setAns(res.data.content)
			setAns1(res.data.author)
		})
		.catch(err=>alert("issue " +err));
	}
	useEffect(()=>{getQuote(); setInterval(getQuote, 120000)}, []);

	
	return(
		<>
			<center>
				<NavBar/>
				<h2> {ans} </h2>
				<h3>Author - {ans1}</h3>
				<h4>Welcome {user} </h4>
				<table border = "5" style = {{width: '70%'}}>	
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Age</th>
						<th>Gender</th>
						<th>Height</th>
						<th>Weight</th>
						<th>Delete</th>
					</tr>
					{
						info.map((e =>
							<tr style = {{"text-align": "center"}}>
								<td>{e.id}</td>
								<td>{e.name}</td>
								<td>{e.age}</td>
								<td>{e.gender}</td>
								<td>{e.height}</td>
								<td>{e.weight}</td>
				<td><button onClick = {()=> {if(window.confirm('Are u sure?'))delPatient(e.id)}}>Delete</button></td>
							</tr>		
						))

					}
				</table>
				<br/>

				<form onSubmit = {logOff}>
					<button>Log out</button>
				</form>
				

			</center>
		</>

	);
}
export default Home;