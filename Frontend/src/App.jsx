

// function App() {
//   const [isLogin, setIsLogin] = useState(true);

//   const handleLogin = (data) => {
//     console.log("Login Data:", data);
//   };

//   const handleRegister = (data) => {
//     console.log("Register Data:", data);
//   };

//   return (
//     <div>
//       {isLogin ? (
//         <Login onLogin={handleLogin} />
//       ) : (
//         <Register onRegister={handleRegister} />
//       )}

//       <div className="text-center mt-4">
//         <button
//           onClick={() => setIsLogin(!isLogin)}
//           className="text-blue-600 underline"
//         >
//           {isLogin ? "Create an account" : "Already have an account? Login"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Base_Component/Login";
import Register from "./Base_Component/Register";
import Home from "./Base_Component/Home";
// import About from "./About";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />          
        {/* <Route path="/about" element={<About />} />     */}
        <Route path="/login" element={<Login />} />   
        <Route path="/register" element={<Register />} /> 
      </Routes>
    </Router>
  );
}

export default App;
