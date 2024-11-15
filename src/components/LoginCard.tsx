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

const LoginCard = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [redirect, setRedirect] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/Users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {

        toast({
          title: "Logged in",
          description: "You have successfully logged in",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setRedirect(true);
      } else if (response.status === 401) {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        throw new Error("Login failed"); // Add backend logic for other errors
      }
    } catch (error) {
      console.log("Error logging in as: ", email, ": ", error);
      toast({
        title: "Login failed",
        description: "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    }
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
            onClick={() => {
              

              // Will display the loading toast until the promise is either resolved
              // or rejected.
              toast({
                title: "Pending...",
                description: "Please wait",
                status: "loading",
                duration: 2000,
                isClosable: true,
              });

              handleLogin();
            }}
          >
            Log in
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
};

export default LoginCard;
