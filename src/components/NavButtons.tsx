import { Link } from "react-router-dom";
import { RoleGuard } from "../auth/RoleGuard";

const NavButtons = () => {
  return (
    <>
      <Link to="/">Flights</Link>
      <RoleGuard allowedRoles={["Customer"]}>
        <Link to="/my-bookings">My Bookings</Link>
      </RoleGuard>
      
      <RoleGuard allowedRoles={["Admin"]}>    
        <Link to="/create-flight">Create Flight</Link>
      </RoleGuard>
    </>
  );
};

export default NavButtons;
