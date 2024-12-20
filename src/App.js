import "./App.css";
import "./components/Main/Main.css";
import "./components/Main/About/About.css";
import "./components/Main/Hero/Hero.css";
import "./components/Main/Highlights/Highlights.css";
import "./components/Main/Testimonials/Testimonials.css";
import Header from "./components/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "./components/Main/About/About";
import Highlights from "./components/Main/Highlights/Highlights";
import Reservations from "./components/Main/Booking/Reservations"
import OrderOnline from "./components/OrderOnline";
import Login from "./components/Login";
import ConfirmBooking from "./components/Main/Booking/ConfirmBooking";

function App() {
  const location = useLocation(); // Aktuellen Pfad abfragen

  //Dynamische Klassen basierend auf Route
  // ABOUT
  const routeClasses = {
    "/about": "root-about",
    "/menu": "root-menu",
    confirmBooking: "root-confirmBooking",
    "/reservations": "root-reservations",
    "/orderOnline": "root-orderOnline",
    "/login": "root-login",
    "/": "root-default",
  };

  const rootClass = routeClasses[location.pathname] || "root-default";

  return (
    <div id='root' className={rootClass}>
      <Header />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/about' element={<About />} />
          <Route path='/menu' element={<Highlights />} />
          <Route path='/reservations' element={<Reservations />} />
          <Route path='/confirmBooking' element={<ConfirmBooking />} />
          <Route path='/orderOnline' element={<OrderOnline />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
