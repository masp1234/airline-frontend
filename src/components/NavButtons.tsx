import { Link } from "react-router-dom";
import { RoleGuard } from "../auth/RoleGuard";

const NavButtons = () => {
  return (
    <>
      <Link to="/">Flights</Link>
      <Link to="/my-bookings">My Bookings</Link>
      <RoleGuard allowedRoles={["Admin"]}>    
        <Link to="/create-flight">Create Flight</Link>
      </RoleGuard>
    </>
  );
};

export default NavButtons;
