import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"
import Container from "./sections/Container";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./sections/Header";
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import CreateFlight from './pages/CreateFlight';
import { AuthProvider } from './auth/AuthContext';
import { RoleProtectedRoute } from './auth/RoleGuard';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
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
            <Route path='/create-flight' element={
              <RoleProtectedRoute allowedRoles={["Admin"]}>
                <CreateFlight/>
              </RoleProtectedRoute>
              }/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
          </Container>
        </GridItem>
      </Grid>
      </Router>
    </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
