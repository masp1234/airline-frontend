import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
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
//  import { Navigate } from "react-router-dom";
  
  const SignupCard = () => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
//    const [redirect, setRedirect] = useState(false);
  
/*    if (redirect) {
      return <Navigate to="/success-page" />; // Change to your desired path
    }
*/
  
    return (
      <Grid height="100%" width="60vw" bg="blackAlpha.200">
        <Box width="100%" maxWidth="450px" height="100vh" pl="10" pt="10">
          <Heading size="xl" mb="4">
            Sign Up
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
              />
            </FormControl>
            <FormControl size={"lg"}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  borderColor="gray.500" // Custom border color
                  focusBorderColor="orange.500" // Custom focus border color
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>Must be minimum 6 characters long</FormHelperText>
            </FormControl>
            <FormControl size={"lg"}>
              <FormLabel>Repeat password</FormLabel>
              <Input
                type={show ? "text" : "password"}
                placeholder="Repeat password"
                borderColor="gray.500" // Custom border color
                focusBorderColor="orange.500" // Custom focus border color
              />
            </FormControl>
            <Button
              variant="solid"
              colorScheme="orange"
              width="50%"
              onClick={() => {
                // Placeholder promise to simulate our API call.
                const examplePromise = new Promise((resolve) => {
                  setTimeout(() => resolve(200), 2000);
                });
  
                // Will display the loading toast until the promise is either resolved
                // or rejected.
                toast.promise(examplePromise, {
                  success: {
                    title: "Account created",
                    description: "Your account has been successfully created",
                  },
                  error: {
                    title: "Account creation failed",
                    description: "Something went wrong",
                  },
                  loading: {
                    title: "Pending...",
                    description: "Please wait",
                  },
                });
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>
      </Grid>
    );
  };
  
  export default SignupCard;