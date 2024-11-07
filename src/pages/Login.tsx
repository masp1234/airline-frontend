import { HStack } from "@chakra-ui/react";
import LoginCard from "../components/LoginCard";
import HomeBackgroundCard from "../components/HomeBackgroundCard";

const Login = () => {
  return (
    <>
      <HStack>
        <LoginCard />
        <HomeBackgroundCard />
      </HStack>
    </>
  );
};

export default Login;
