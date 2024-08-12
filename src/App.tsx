import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Header } from "./layout";
import Home from "./pages/Member";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bia from "./pages/Bia";
import Meal from "./pages/Meal";
import Diet from "./pages/Diet";
import Option from "./pages/Option";
import DeliveryPickup from "./pages/DeliveryPickup";
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
        <Route path="/bia" element={<Bia />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="option" element={<Option />} />
        <Route path="/delivery-pickup" element={<DeliveryPickup />} />
      </Routes>
    </Router>
  );
}

export default App;
