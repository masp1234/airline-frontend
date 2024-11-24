import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import profileIconDark from "../assets/profile-dark.webp";
import profileIconLight from "../assets/profile-bright.webp";
import { Link, useNavigate } from "react-router-dom";
import { NoRole, RoleGuard } from "../auth/RoleGuard";
import useRoleStore from "../store";
import BASE_URL from "../util/baseUrl";
import { useState } from "react";

const ProfileIcon = () => {
  const { colorMode } = useColorMode();
  const profileIcon = colorMode === "dark" ? profileIconDark : profileIconLight;
  const dropDownColor = colorMode === "dark" ? "#1A202C" : "#F7FAFC";
  const dropDownHoverColor = colorMode === "dark" ? "#181D29" : "#EDF2F7";

  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/Users/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        useRoleStore.getState().setRole(null);
        toast({
          title: "Logged out",
          description: "You have successfully logged out",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        navigate("/");
      } else {
        toast({
          title: "Logout failed",
          description: "Something went wrong",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: "Logout failed",
        description: "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Menu>
      <MenuButton
        as={Box}
        cursor="pointer"
        _hover={{ backgroundColor: "blackAlpha.200" }} // TODO: Figure out how to make the highlight cover the whole vertical grid-space. Or maybe just delete it.
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
          <MenuItem
            backgroundColor={dropDownColor}
            _hover={{ backgroundColor: dropDownHoverColor }}
            onClick={handleLogout}
          >
            <Box>
              <p>User logout</p>
            </Box>
          </MenuItem>
        </RoleGuard>
      </MenuList>
    </Menu>
  );
};

export default ProfileIcon;