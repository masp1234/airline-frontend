import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from "./sections/Container";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./sections/Header";
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router> 
    <Grid
    templateAreas={{
      base: `"nav"
              "main"`,
      lg: `"nav"
           "main"`,
    }}
    >
      <GridItem pl="2" area={"nav"}>
        <Header />
      </GridItem>
      <GridItem pl="2" padding={"4x"} position={"relative"} area={"main"}>
        <Container>
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          </Routes>
        </Container>
      </GridItem>
    </Grid>
    </Router>
  );
}

export default App;
