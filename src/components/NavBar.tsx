import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";

const NavBar = () => {
  return (
    <>
      <HStack>
        {/* HStack is a horizontal stack, Use Vstack for vertical. */}
        {/* Normally you shouldn't give width, ml, etc. but it squished the image otherwise. */}
        <Image src={logo} width="100px" ml="20px" mr="20px" />{" "}
        <Text>NavBar</Text>
      </HStack>
    </>
  );
};

export default NavBar;
