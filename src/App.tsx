import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./layout";
import Home from "./pages/Home";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
