import { HStack, Image, useColorMode } from "@chakra-ui/react";
import logoDark from "../assets/logo-dark.webp";
import logoLight from "../assets/logo-light.webp";
import ColorModeSwitch from "../components/ColorModeSwitch";
import NavButtons from "../components/NavButtons";
import ProfileIcon from "../components/ProfileIcon";

const Header = () => {
    const { colorMode } = useColorMode();
  const logo = colorMode === "dark" ? logoDark : logoLight;
  return (
    <>
    <HStack justifyContent="space-between" padding="10px">
      {/* HStack is a horizontal stack, Use VStack for vertical. */}
      {/* Normally you shouldn't give width, ml, etc. but it squished the logo-image otherwise. */}
      <Image src={logo} width="150px" ml="20px" mr="20px" />
      <NavButtons />
      <ColorModeSwitch />
      <ProfileIcon />
    </HStack>
  </>
  )
}

export default Header
