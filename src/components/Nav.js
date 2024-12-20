import { Link } from "react-router-dom";

function Nav() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/menu", label: "Menu" },
    { to: "/reservations", label: "Reservations" },
    { to: "/orderOnline", label: "Order Online" },
    { to: "/login", label: "Login" },
  ];

  return (
    <nav className='navigation'>
      <ul className='nav-menu'>
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default Nav;
