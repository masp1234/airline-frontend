import { HStack, Image, useColorMode } from "@chakra-ui/react";
import logoDark from "../assets/logo-dark.webp";
import logoLight from "../assets/logo-light.webp";
import profileIconDark from "../assets/profile-dark.webp";
import profileIconLight from "../assets/profile-bright.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import NavButtons from "./NavButtons";

const NavBar = () => {
  const { colorMode } = useColorMode();
  const logo = colorMode === "dark" ? logoDark : logoLight;
  const profileIcon = colorMode === "dark" ? profileIconDark : profileIconLight;

  return (
    <>
      <HStack justifyContent="space-between" padding="10px">
        {/* HStack is a horizontal stack, Use VStack for vertical. */}
        <Image src={logo} width="100px" ml="20px" mr="20px" />
        <NavButtons />
        <ColorModeSwitch />
        {/* TODO: Replace image with button? */}
        <Image src={profileIcon} width="40px" ml="20px" mr="20px" />
      </HStack>
    </>
  );
};

export default NavBar;
