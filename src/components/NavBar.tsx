import { HStack, Image, useColorMode } from "@chakra-ui/react";
import logoDark from "../assets/logo-dark.webp";
import logoLight from "../assets/logo-light.webp";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  const { colorMode } = useColorMode();
  const logo = colorMode === "dark" ? logoDark : logoLight;

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
