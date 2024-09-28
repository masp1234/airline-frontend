import { Stack, Image } from "@chakra-ui/react";
import bg from "../assets/homeBG.webp";

const mainCard = () => {
  return (
    <Stack height="100vh" width="100%">
      <Image src={bg} height="100%" width="100%" objectFit="cover" />
    </Stack>
  );
};

export default mainCard;
