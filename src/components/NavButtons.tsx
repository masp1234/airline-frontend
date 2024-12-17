import { Link } from "react-router-dom";
import { RoleGuard } from "../auth/RoleGuard";

const NavButtons = () => {
  return (
    <>
      <RoleGuard allowedRoles={["Customer"]}>
        <Link to="/my-bookings">My Bookings</Link>
        <Link to="/">Flights</Link>
      </RoleGuard>
      
      <RoleGuard allowedRoles={["Admin"]}>    
        <Link to="/create-flight">Create Flight</Link>
        <Link to="/manage-flights">Manage Flights</Link>
      </RoleGuard>
    </>
  );
};

export default NavButtons;
