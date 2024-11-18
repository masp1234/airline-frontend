import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import profileIconDark from "../assets/profile-dark.webp";
import profileIconLight from "../assets/profile-bright.webp";
import { Link } from "react-router-dom";
import { NoRole, RoleGuard } from "../auth/RoleGuard";
import Logout from "../hooks/handleLogout"

const ProfileIcon = () => {
  const { colorMode } = useColorMode();
  const profileIcon = colorMode === "dark" ? profileIconDark : profileIconLight;
  const dropDownColor = colorMode === "dark" ? "#1A202C" : "#F7FAFC";
  const dropDownHoverColor = colorMode === "dark" ? "#181D29" : "#EDF2F7";

  return (
    <Menu>
      <MenuButton
        as={Box}
        cursor="pointer"
        _hover={{ backgroundColor: "blackAlpha.200" }} // TODO: Figure out how to make the highlight cover the whole vertical grid-space. Or maybe just delete it.
       // height="100%"
      >
        <Image
          src={profileIcon}
          alt="Profile"
          width="50px"
          height="50px"
          ml="20px"
          mr="20px"
          transform="scale(1.1)" // Increases size of icon without affecting its grid.
        />
      </MenuButton>
      <MenuList backgroundColor={dropDownColor}>
      <NoRole>
        <Link to="/signup">
          <MenuItem
            backgroundColor={dropDownColor}
            _hover={{ backgroundColor: dropDownHoverColor }}
          >
            <Box>
              <p>User Signup</p>
            </Box>
          </MenuItem>
        </Link>
      </NoRole>
      <NoRole>
        <Link to="/login">
          <MenuItem
            backgroundColor={dropDownColor}
            _hover={{ backgroundColor: dropDownHoverColor }}
          >
            <Box>
              <p>User Login</p>
            </Box>
          </MenuItem>
        </Link>
      </NoRole>
      <RoleGuard allowedRoles={["Admin", "Customer"]}>
        <MenuItem
          backgroundColor={dropDownColor}
          _hover={{ backgroundColor: dropDownHoverColor }}
        >
          <Box>
            <p>My Profile</p> {/* Purely to add a bit more content to the dropdown */}
          </Box>
        </MenuItem>
      </RoleGuard>
      <RoleGuard allowedRoles={["Admin", "Customer"]}>
        <Link to="/" onClick={
          Logout
        }>
        <MenuItem
          backgroundColor={dropDownColor}
          _hover={{ backgroundColor: dropDownHoverColor }}
        >
          <Box>
            <p>User logout</p>
          </Box>
        </MenuItem>
        </Link>
      </RoleGuard>
      </MenuList>
    </Menu>
  );
};

export default ProfileIcon;
