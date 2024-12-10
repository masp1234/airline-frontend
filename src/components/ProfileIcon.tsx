import React from "react";
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
import { handleLogout } from "../auth/handleLogout";
import { useAppDispatch } from "../hooks/useRedux";
import { clearLoginUser } from "../redux/loginUserReduser";

const ProfileIcon: React.FC = () => {
  const { colorMode } = useColorMode();
  const profileIcon = colorMode === "dark" ? profileIconDark : profileIconLight;
  const dropDownColor = colorMode === "dark" ? "#1A202C" : "#F7FAFC";
  const dropDownHoverColor = colorMode === "dark" ? "#181D29" : "#EDF2F7";
  const dispatch = useAppDispatch();

  const toast = useToast();
  const navigate = useNavigate();
  const handleUserOnLogout = ()=> {
    dispatch(clearLoginUser());
  }
  return (
    <Menu>
      <MenuButton
        as={Box}
        cursor="pointer"
        _hover={{ backgroundColor: "blackAlpha.200" }}
      >
        <Image
          src={profileIcon}
          alt="Profile"
          width="50px"
          height="50px"
          ml="20px"
          mr="20px"
          transform="scale(1.1)"
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
                <p>Sign up</p>
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
                <p>Log in</p>
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
              <p>My Profile</p>
            </Box>
          </MenuItem>
        </RoleGuard>
        <RoleGuard allowedRoles={["Admin", "Customer"]}>
          <MenuItem
            backgroundColor={dropDownColor}
            _hover={{ backgroundColor: dropDownHoverColor }}
            onClick={() => handleLogout(handleUserOnLogout, toast, navigate)}
          >
            <Box>
              <p>Log out</p>
            </Box>
          </MenuItem>
        </RoleGuard>
      </MenuList>
    </Menu>
  );
};

export default ProfileIcon;
