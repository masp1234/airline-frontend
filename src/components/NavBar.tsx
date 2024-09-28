import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <>
      <HStack justifyContent="space-between" padding="10px">
        {/* HStack is a horizontal stack, Use Vstack for vertical. */}
        {/* Normally you shouldn't give width, ml, etc. but it squished the image otherwise. */}
        <Image src={logo} width="100px" ml="20px" mr="20px" />{" "}
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NavBar;
