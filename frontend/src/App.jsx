import Login from "./pages/Login"
import SignUp from "./pages/SingUp"
import { Routes,Route } from "react-router"
import HomePage from "./pages/HomePage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Note from "./pages/Note.jsx";


const App = () => {
	return <div>
		<Routes>
			<Route path="/" element={<HomePage/>}/>
			<Route path="/dashboard" element={<Dashboard/>}/>
			<Route path="/notes" element={<Note/>}/>
			<Route path="/signup" element={<SignUp/>}/>
			<Route path="/login" element={<Login/>}/>
		</Routes>
	</div>
}

export default App
