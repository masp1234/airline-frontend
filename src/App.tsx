import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <Grid
    templateAreas={{
      base: `"nav"
              "main"`,
      lg: `"nav"
           "main"`,
    }}
    >
      <GridItem pl="2" bg="orange.300" area={"nav"}>
        Nav
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
