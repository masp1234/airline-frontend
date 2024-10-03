import {  HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavButtons = () => {
  return (
    <HStack spacing={50} justifyContent="flex-start" width="70%">
      <Link to="/" >Flights</Link>
      <Link to="/my-bookings" >My Bookings</Link>
      {/*<Button variant="link" size={"lg"}  >Flights</Button>
      <Button variant="link" size={"lg"}>My Bookings</Button>*/}
    </HStack>
  );
};

export default NavButtons;
