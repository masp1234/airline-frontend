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
import { Navigate } from "react-router-dom";

const SignupCard = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [redirect, setRedirect] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const validateForm = () => {
    let valid = true;
    const errors = { email: "", password: "", repeatPassword: "" };

    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!email.includes("@")) {
      errors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    } else if (password.length < 6 || password.length > 30) {
      errors.password = "Password must be between 6 and 30 characters long";
      valid = false;
    }

    if (password !== repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const createUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/Users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast({
          title: "Account created",
          description: "Your account has been successfully created",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setRedirect(true);
      } else if (response.status === 409) {
        toast({
          title: "User already exists",
          description: "An account with this email already exists.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Account creation failed:", error);
      toast({
        title: "Account creation failed",
        description: "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Grid height="100%" width="60vw" bg="blackAlpha.200">
      <Box width="100%" maxWidth="450px" height="100vh" pl="10" pt="10">
        <Heading size="xl" mb="4">
          Sign up
        </Heading>
        <Divider orientation="horizontal" mb="4" w="32vw" />
        <Stack spacing={10} pl="5">
          <FormControl size={"lg"} isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter e-mail"
              borderColor="gray.500"
              focusBorderColor="orange.500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <FormHelperText color="red.500">{errors.email}</FormHelperText>
            )}
          </FormControl>
          <FormControl size={"lg"} isInvalid={!!errors.password}>
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
            {errors.password && (
              <FormHelperText color="red.500">{errors.password}</FormHelperText>
            )}
            <FormHelperText>
              Must be between 6 and 30 characters long
            </FormHelperText>
          </FormControl>
          <FormControl size={"lg"} isInvalid={!!errors.repeatPassword}>
            <FormLabel>Repeat password</FormLabel>
            <Input
              type={show ? "text" : "password"}
              placeholder="Repeat password"
              borderColor="gray.500"
              focusBorderColor="orange.500"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {errors.repeatPassword && (
              <FormHelperText color="red.500">
                {errors.repeatPassword}
              </FormHelperText>
            )}
          </FormControl>
          <Button
            variant="solid"
            colorScheme="orange"
            width="50%"
            onClick={() => {
              if (validateForm()) {
                toast({
                  title: "Pending...",
                  description: "Please wait",
                  status: "loading",
                  duration: 2000,
                  isClosable: true,
                });

                createUser();
              }
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
