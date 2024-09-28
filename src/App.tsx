import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import MainCard from "./components/mainCard";

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
      <GridItem pl="2" padding={"4x"} area={"main"}>
        <MainCard />
      </GridItem>
    </Grid>
  );
}

export default App;
