import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Header } from "./layout";
import Home from "./pages/Home";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Add from "./pages/Add";
import Register from "./pages/Register";
import Bia from "./pages/Bia";
import Meal from "./pages/Meal";
import Diet from "./pages/Diet";
import Option from "./pages/Option";
import DeliveryPickup from "./pages/DeliveryPickup";
import DeliveryDate from "./pages/DeliveryDate";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <Router>
      <GlobalStyle />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member/:id" element={<Member />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<Add />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bia/:id" element={<Bia />} />
        <Route path="/meal/:id" element={<Meal />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="option/:id" element={<Option />} />
        <Route path="/delivery-pickup" element={<DeliveryPickup />} />
        <Route path="/delivery-date" element={<DeliveryDate />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirm" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
