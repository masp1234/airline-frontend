import { Button, HStack } from "@chakra-ui/react";

const NavButtons = () => {
  return (
    <HStack>
      <Button variant="link">Flights</Button>
      <Button variant="link">My Bookings</Button>
    </HStack>
  );
};

export default NavButtons;
