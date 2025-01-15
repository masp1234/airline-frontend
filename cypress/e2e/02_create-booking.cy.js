describe('Booking - a customer should be able to search for flights and create a booking.', () => {

    beforeEach(() => {
      cy.login("customer@example.com", "123123");
      cy.url().should('eq', 'http://localhost:5173/');
    });
  
    it('Should create a booking.', () => {
      // Assert the "Round Trip" checkbox is checked
      cy.contains('Round Trip')
        .closest('div')
        .find('input[type="checkbox"]')
        .should('be.checked');
  
      // Set the number of passengers
      const numberOfPassengers = 2;
      cy.contains("Passenger")
        .closest('div')
        .find("input[type='text']")
        .clear()
        .type(numberOfPassengers);
  
      // Set departure and arrival airports
      const departureAirport = "Los Angeles International Airport";
      const arrivalAirport = "Denver International Airport";

      cy.findAndSelectItem(departureAirport, "Departure")
      cy.findAndSelectItem(arrivalAirport, "Arrival");
  
      // For "Departure Date"
      cy.contains("Departure Date")
        .closest(".chakra-form-control")
        .find("[type='text']")
        .click();
      
      const currentDate = new Date();

      cy.get(".react-datepicker__day")
        .contains(currentDate.getDate() + 4)
        .click();
        
      cy.contains("Return Date")
        .closest(".chakra-form-control")
        .find("[type='text']")
        .click();

        cy.get(".react-datepicker__day").contains(currentDate.getDate() + 9).click();

        cy.get("button").contains("Search for Flights").click();

        cy.url().should("eq", "http://localhost:5173/find-ticket/departure")
        
        cy.get("button.chakra-button").contains("Select").click();
        cy.get("button.chakra-button").contains("Next").click();

        cy.url().should("eq", "http://localhost:5173/find-ticket/return")

        cy.get("button.chakra-button").contains("Select").click();
        cy.get("button.chakra-button").contains("Next").click();

        const firstPassenger = {
          firstName: "First",
          lastName: "Passenger",
          email: "test@example.com"
        }
        const secondPassenger = {
          firstName: "Second",
          lastName: "Passenger",
          email: "anothertest@example.com"
        }

        cy.enterPassengerInformation("First Name", "1. Passenger", firstPassenger.firstName)
        cy.enterPassengerInformation("Last Name", "1. Passenger", firstPassenger.lastName)
        cy.enterPassengerInformation("Email", "1. Passenger", firstPassenger.email)
        cy.enterPassengerInformation("First Name", "2. Passenger", secondPassenger.firstName)
        cy.enterPassengerInformation("Last Name", "2. Passenger", secondPassenger.lastName)
        cy.enterPassengerInformation("Email", "2. Passenger", secondPassenger.email)

        cy.get("button").contains("Submit Booking").click();

        cy.url().should('eq', 'http://localhost:5173/my-bookings');

        /*
        Filter the list to only elements containing the text for a ticket.
        This is to ensure that usage of the .chakra-card class elsewhere on the page does not mess up the test. If no other usage, cy.get(".chakra-card").should('have.length.greaterThan, 1);
        would be enough
        */
      
        cy.get(".chakra-card")
          .filter((index, element) => Cypress.$(element).text().includes("Confirmation"))
          .should('have.length.greaterThan', 2)
          .last()
          .click();
          
        cy.url().should('match', /http:\/\/localhost:5173\/my-bookings\/\d+/);

        const textFields = [
          "Flight Code",
          "Price",
          "Class",
          "Departure Port",
          "Arrival Port",
          "Travel Time",
          "Departure Time",
          "Arrival Time",
          "Email",
          "First Name",
          "Last Name",
        ];
        
        cy.get(".chakra-card")
          .filter((_, element) => Cypress.$(element).text().includes("Flight Information"))
          // Check that the number of tickets is equal to the number of chosen passengers times 2, since it is a return flight.
          .should('have.length', numberOfPassengers * 2)
          .each(($card) => {
           // Assert that each card contains all the required text fields with some value
            cy.wrap($card).within(() => {
              textFields.forEach((field) => {
              // Check that the field contains the label and some text after the colon
              cy.contains(".chakra-text", field).invoke('text').then((text) => {
              // Split the text by the colon and assert there is content after the colon
              const [label, value] = text.split(":").map(t => t.trim());
              // Ensure the label matches the expected field
              expect(label).to.eq(field);
              // Ensure there is a value after the colon
              expect(value).to.not.be.empty; 
              });
            });
          });
          });

        cy.logout();
        cy.url().should('eq', 'http://localhost:5173/');
      });



  });
  