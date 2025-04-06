import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear(); 
  
  return (
    <footer className="footer">
      <p className="footer__text" >Developed by Mary Ruelas</p>
      <p className="footer__year">{currentYear}</p>
    </footer>
  );
}

export default Footer;