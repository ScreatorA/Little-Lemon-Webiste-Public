import Nav from "./Nav";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className='header'>
        <Link to='/'>
          <img
            src='./icons_assets/Logo.svg'
            alt='Little Lemon logo'
            id='scrollToTopLogo'
          />
        </Link>
        <Nav />
      </header>
    </>
  );
}
export default Header;
