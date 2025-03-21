import "./header.css"; 
import logo from "../../images/logo.svg"; 
import avatar from "../../images/avatar.svg"; 

function Header(){
    return (
    
    <header className="header">
        <img className="header__logo" src={logo}/>
        <p className="header__date-and-location">Date, Location</p>
        <button className="header__add-clothes-btn"> + Add Clothes</button>
         <div className="header_user-container">
            <p className="header_username">Terrence Tegegne</p>
            <img class="header_avatar" src={avatar} alt="Terrence Tegegne" ></img>
         </div>

    </header>
    )
}
export default Header; 