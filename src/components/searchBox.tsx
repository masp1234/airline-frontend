import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { base } from "framer-motion/client";

{/* This can definitely be more decoupled / split into more components */}

const SearchBox = () => {
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
          <HStack zIndex={2} spacing={8}>
            <Stack>
              <FormControl size={"lg"}>
                <FormLabel>Departure</FormLabel>
                <Select placeholder="Select airport">
                  <option>Placeholder</option>
                  <option>Nigeria</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Departure Date</FormLabel>
                <Input type="date" />
              </FormControl>
            </Stack>
            <Stack>
              <FormControl>
                <FormLabel>Arrival</FormLabel>
                <Select placeholder="Select airport">
                  <option>August's Airport</option>
                  <option>Ur mom</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Arrival Date</FormLabel>
                <Input type="date" />
              </FormControl>
            </Stack>
          </HStack>
        </CardBody>

        <HStack>
          <CardFooter>
            <Button variant="solid" colorScheme="orange">
              Search for Flights
            </Button>
          </CardFooter>
        </HStack>
      </Stack>
    </Card>
  );
};

export default SearchBox;