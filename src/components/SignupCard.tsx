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

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Grid height="100%" width="60vw" bg="blackAlpha.200">
      <Box width="100%" maxWidth="450px" height="100vh" pl="10" pt="10">
        <Heading size="xl" mb="4">
          Sign Up
        </Heading>
        <Divider orientation="horizontal" mb="4" />
        <Stack spacing={10} pl="5">
          <FormControl size={"lg"}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter e-mail" />
          </FormControl>
          <FormControl size={"lg"}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
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
            />
          </FormControl>
          <Button
            variant="solid"
            colorScheme="orange"
            width="50%"
            onClick={() => {
              toast({
                title: "User created.",
                description: "Your account has been created successfully.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              setRedirect(true);
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
};

/*const SignupCard = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      position="absolute"
      zIndex={1}
      display="flex"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Stack>
        <CardBody>
          <Box
            width="100%"
            display="flex"
            //    alignItems="center"
            justifyContent="left"
            position="relative"
          >
            <Heading size="lg">Sign Up</Heading>
          </Box>
          <Divider orientation='horizontal' mb="2" mt="2" />
          <HStack zIndex={2} spacing={8}>
            <Stack spacing={8}>
              <FormControl size={"lg"}>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Enter e-mail" />
              </FormControl>
              <FormControl size={"lg"}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl size={"lg"}>
                <FormLabel>Repeat password</FormLabel>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Repeat password"
                />
              </FormControl>
            </Stack>
          </HStack>
        </CardBody>
        <CardFooter>
            <Button variant="solid" colorScheme="orange">
                Sign Up
            </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};*/

export default SignupCard;
