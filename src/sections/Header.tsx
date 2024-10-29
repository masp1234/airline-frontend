import { HStack, Image, useColorMode, 
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  useDisclosure,
  Show,
  Hide,
  VStack,
} from "@chakra-ui/react";
import logoDark from "../assets/logo-dark.webp";
import logoLight from "../assets/logo-light.webp";
import ColorModeSwitch from "../components/ColorModeSwitch";
import NavButtons from "../components/NavButtons";
import ProfileIcon from "../components/ProfileIcon";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";


const Header = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose} = useDisclosure()

  const logo = colorMode === "dark" ? logoDark : logoLight;
  return (
    <>
    <HStack justifyContent="space-between" padding="10px">
      {/* HStack is a horizontal stack, Use VStack for vertical. */}
      {/* Normally you shouldn't give width, ml, etc. but it squished the logo-image otherwise. */}
      <Image src={logo} width="100px" ml="20px" mr="20px" />
      <Show above="lg">
        <HStack spacing={50} justifyContent="flex-start" width="70%">
          <NavButtons/>
        </HStack>
        
        <ColorModeSwitch />
        <ProfileIcon />

      </Show>
      {/* TODO: Replace image with button? */}
      <Hide above="lg">
        <FiMenu onClick={onOpen} size={35}/>
      </Hide>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}      >
        <DrawerOverlay />
        <DrawerContent
        onClick={onClose}>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <VStack spacing={25} width="70%">
              <NavButtons />
              <ColorModeSwitch />
              <Link to="/signup" >Signup</Link>
              <Link to="/login" >login</Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  </>
  )
}

export default Header
