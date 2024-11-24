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
  Button,
  useToast,
} from "@chakra-ui/react";
import logoDark from "../assets/logo-dark.webp";
import logoLight from "../assets/logo-light.webp";
import ColorModeSwitch from "../components/ColorModeSwitch";
import NavButtons from "../components/NavButtons";
import ProfileIcon from "../components/ProfileIcon";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { NoRole, RoleGuard } from "../auth/RoleGuard";
import { handleLogout } from "../auth/handleLogout";
import useRoleStore from "../store";


const Header = () => {
  const { colorMode } = useColorMode();
  const buttonColor = colorMode === "dark" ? "#EFEFF1" : "#2F343F";
  const buttonHoverColor = colorMode === "dark" ? "#EFEFF1" : "#2F343F"; // Necessairy to retain the color on hover.
  const { isOpen, onOpen, onClose} = useDisclosure()

  const navigate = useNavigate();
  const setRole = useRoleStore((state) => state.setRole);
  const toast = useToast();

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
              <ColorModeSwitch />
              <NavButtons />
              <NoRole>
                <Link to="/signup" >Signup</Link>
                <Link to="/login" >Login</Link>
              </NoRole>
              <RoleGuard allowedRoles={["Admin", "Customer"]}>
                <Link to="/" >Profile</Link> {/* Fluff addition */}
              </RoleGuard>
              <RoleGuard allowedRoles={["Admin", "Customer"]}>
                <Button
                  variant="link"
                  color={buttonColor}
                  _hover={{ color: buttonHoverColor }}
                  width="100%"
                  mb="4"
                  fontWeight="normal"
                  onClick={() => handleLogout(setRole, toast, navigate)}
                >
                  User Logout
                </Button>
              </RoleGuard>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  </>
  )
}

export default Header
