import { Button, HStack } from "@chakra-ui/react";

const NavButtons = () => {
  return (
    <HStack spacing={50} justifyContent="flex-start" width="70%">
      <Button variant="link" size={"lg"}>Flights</Button>
      <Button variant="link" size={"lg"}>My Bookings</Button>
    </HStack>
  );
};

export default NavButtons;
