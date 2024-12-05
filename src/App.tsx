import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Container from "./sections/Container.tsx";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./sections/Header";
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import CreateFlight from './pages/CreateFlight';
import FindTicket from "./pages/FindTicket.tsx";
import BookingTickets from "./pages/BookingTickets.tsx";
import ManageFlight from "./pages/ManageFlight.tsx";
import ManageFlights from "./pages/ManageFlights.tsx";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
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
            <Route path='/create-flight' element={<CreateFlight/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/find-ticket/departure' element={<FindTicket/>}/>
            <Route path='/find-ticket/return' element={<FindTicket/>}/>
            <Route path='/booking' element={<BookingTickets/>}/>
            <Route path='/manage-flights' element={<ManageFlights/>}/>
            <Route path='/manage-flights/:flightId' element={<ManageFlight/>}/>
            </Routes>
          </Container>
        </GridItem>
      </Grid>
      </Router>
    </QueryClientProvider>

  );
}

export default App;
