import { Stack, Image } from "@chakra-ui/react";
import bg from "../assets/homeBG.webp";

const HomeBackgroundCard = () => {
  return (
    <Stack height="100vh" width="100%" position="relative" zIndex={0}>
      <Image src={bg} height="100vh" width="100vw" objectFit="cover" />
    </Stack>
  );
};

export default HomeBackgroundCard;