import { Link } from "react-router-dom";
const NavButtons = () => {
  return (
    <>
      <Link to="/" >Flights</Link>
      <Link to="/my-bookings" >My Bookings</Link>
    </>
    
  );
};

export default NavButtons;
