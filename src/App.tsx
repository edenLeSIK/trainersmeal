import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Header } from "./layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <Router>
      <GlobalStyle />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
