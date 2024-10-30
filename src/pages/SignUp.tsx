import { HStack } from "@chakra-ui/react";
import HomeBackgroundCard from "../components/HomeBackgroundCard";
import SignupCard from "../components/SignupCard";

const SignUp = () => {
  return (
    <>
      <HStack>
        <SignupCard />
        <HomeBackgroundCard />
      </HStack>
    </>
  );
};

export default SignUp;
