import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

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
      <GridItem pl="2" area={"nav"}>
        <NavBar />
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
