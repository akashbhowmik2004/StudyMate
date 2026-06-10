import Login from "./pages/Login"
import SignUp from "./pages/SingUp"
import { Routes,Route } from "react-router"
import HomePage from "./pages/HomePage.jsx";


const App = () => {
	return <div>
		<Routes>
			<Route path="/" element={<HomePage/>}/>
			<Route path="/signup" element={<SignUp/>}/>
			<Route path="/login" element={<Login/>}/>
		</Routes>
	</div>
}

export default App
