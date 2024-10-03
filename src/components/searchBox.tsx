import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

{/* This can definitely be more decoupled / split into more components? */}

const SearchBox = () => {
  const airports = [
    { name: "Copenhagen Airport", code: "CPH" },
    { name: "Placeholder Airport", code: "PLH" },
  ]
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
            <Stack spacing={8}>
              <FormControl size={"lg"}>
                <FormLabel>Departure</FormLabel>
                <Select placeholder="Select airport">
                {airports.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.name}
                    </option>                   
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Departure Date</FormLabel>
                <Input type="date" />
              </FormControl>
            </Stack>
            <Stack spacing={8}>
              <FormControl>
                <FormLabel>Arrival</FormLabel>
                <Select placeholder="Select airport">
                  {airports.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.name}
                    </option>                   
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Return Date</FormLabel>
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