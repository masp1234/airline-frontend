import { HStack } from "@chakra-ui/react";
import HomeBackgroundCard from "../components/HomeBackgroundCard";
import SignupCard from "../components/SignupCard";

const SignUp = () => {
  return (
    <>
      <HStack spacing="0">
        <SignupCard />
        <HomeBackgroundCard />
      </HStack>
    </>
  );
};

export default SignUp;
