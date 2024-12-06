import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Container from "./sections/Container.tsx";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./sections/Header";
import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CreateFlight from "./pages/CreateFlight";
import FindTicket from "./pages/FindTicket.tsx";
import BookingTickets from "./pages/BookingTickets.tsx";
import ManageFlight from "./pages/ManageFlight.tsx";
import ManageFlights from "./pages/ManageFlights.tsx";
import { NoRoleProtectedRoute, RoleProtectedRoute } from "./auth/RoleGuard.tsx";

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
                <Route path="/" element={<Home />} />
                <Route
                  path="/my-bookings"
                  element={
                    <RoleProtectedRoute allowedRoles={["Customer", "Admin"]}>
                      <MyBookings />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <NoRoleProtectedRoute>
                      <SignUp />
                    </NoRoleProtectedRoute>
                  }
                />
                <Route
                  path="/create-flight"
                  element={
                    <RoleProtectedRoute allowedRoles={["Admin"]}>
                      <CreateFlight />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <NoRoleProtectedRoute>
                      <Login />
                    </NoRoleProtectedRoute>
                  }
                />
                <Route
                  path="/find-ticket/departure"
                  element={
                    <RoleProtectedRoute allowedRoles={["Customer", "Admin"]}>
                      <FindTicket />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/find-ticket/return"
                  element={
                    <RoleProtectedRoute allowedRoles={["Customer", "Admin"]}>
                      <FindTicket />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/booking"
                  element={
                    <RoleProtectedRoute allowedRoles={["Customer", "Admin"]}>
                      <BookingTickets />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/manage-flights"
                  element={
                    <RoleProtectedRoute allowedRoles={["Admin"]}>
                      <ManageFlights />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/manage-flights/:flightId"
                  element={
                    <RoleProtectedRoute allowedRoles={["Admin"]}>
                      <ManageFlight />
                    </RoleProtectedRoute>
                  }
                />
              </Routes>
            </Container>
          </GridItem>
        </Grid>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
