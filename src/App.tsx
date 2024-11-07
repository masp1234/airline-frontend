import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from "./sections/Container";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./sections/Header";
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

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
      <GridItem area={"nav"}>
        <Header />
      </GridItem>
      <GridItem padding={"4x"} position={"relative"} area={"main"}>
        <Container>
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          </Routes>
        </Container>
      </GridItem>
    </Grid>
    </Router>
  );
}

export default App;
