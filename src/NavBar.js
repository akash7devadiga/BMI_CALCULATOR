import {Link} from "react-router-dom";
function NavBar()
{
	const un = localStorage.getItem("un");
	return(
		<>
			<div className = "nav">
				{(un!=null)&&(<Link to = "/home">Home</Link>)}
				{(un!=null) && (<Link to = "/about">About</Link>)}
				{(un!=null) && (<Link to = "/create">Create</Link>)}
				{(un!=null) && (<Link to = "/enquiry"> Contact us</Link>)}
				{(un!=null) && (<Link to = "/change"> Change password</Link>)}
				
			</div>
		</>
	);

}

export default NavBar;