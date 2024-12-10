import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { handleLogin } from "../auth/handleLogin";
import useUserStore from "../store";
import LoginUser from "../types/LoginUser";

const LoginCard = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [redirect, setRedirect] = useState(false);

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useUserStore((state) => state.setUser);

  const handleLoginBtn = async ()=> {
    const loginUser: LoginUser = { email, password };
    toast({
      title: "Pending...",
      description: "Please wait",
      status: "loading",
      duration: 2000,
      isClosable: true,
    });
    handleLogin(loginUser, setRedirect, toast).then( (user) => setUser(user.role, user.email));

  }
  // Redirect to our home page after successful sign up.
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Grid height="100%" width="60vw" bg="blackAlpha.200">
      <Box width="100%" maxWidth="450px" height="100vh" pl="10" pt="10">
        <Heading size="xl" mb="4">
          Log in
        </Heading>
        <Divider orientation="horizontal" mb="4" w="32vw" />
        <Stack spacing={10} pl="5">
          <FormControl size={"lg"}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter e-mail"
              borderColor="gray.500"
              focusBorderColor="orange.500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl size={"lg"}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                borderColor="gray.500"
                focusBorderColor="orange.500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            variant="solid"
            colorScheme="orange"
            width="50%"
            onClick={handleLoginBtn}
          >
            Log in
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
};

export default LoginCard;