function Footer() {
  const doorMatNavigation = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/menu", label: "Menu" },
    { to: "/reservations", label: "Reservations" },
    { to: "/orderOnline", label: "Order Online" },
    { to: "/login", label: "Login" },
  ];

  const contact = [
    { href: "#adress", label: "Adress" },
    { href: "#phoneNumber", label: "Phone Number" },
    { href: "#email", label: "Email" },
  ];

  const socialMediaLinks = [
    { href: "#adress", label: "Adress" },
    { href: "#phoneNumber", label: "Phone Number" },
    { href: "#email", label: "Email" },
  ];

  return (
    <footer className='footer'>
      <ul className='doormatNavigation'>
        <p>Doormat Navigation</p>
        {doorMatNavigation.map((footerLink) => (
          <li key={footerLink.to}>
            <a href={footerLink.to}>{footerLink.label}</a>
          </li>
        ))}
      </ul>

      <ul className='contact'>
        <p>Contact</p>
        {contact.map((contactLink) => (
          <li key={contactLink.href}>
            <a href={contactLink.href}>{contactLink.label}</a>
          </li>
        ))}
      </ul>

      <ul className='socialMediaLinks'>
        <p>Social Media Links</p>
        {socialMediaLinks.map((socialMediaLink) => (
          <li key={socialMediaLink.href}>
            <a href={socialMediaLink.href}>{socialMediaLink.label}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
export default Footer;
