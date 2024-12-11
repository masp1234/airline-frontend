describe('Booking - a customer should be able to search for flights and create a booking.', () => {

    beforeEach(() => {
      cy.login("customer@example.com", "123123");
    });
  
    it('Should create a booking.', () => {
      // Assert the "Round Trip" checkbox is checked
      cy.contains('Round Trip')
        .closest('div')
        .find('input[type="checkbox"]')
        .should('be.checked');
  
      // Set the number of passengers
      cy.contains("Passenger")
        .closest('div')
        .find("input[type='text']")
        .clear()
        .type("2");
  
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

        cy.enterPassengerInformation("First Name", "1. Passenger", "Test")
        cy.enterPassengerInformation("Last Name", "1. Passenger", " Passenger")
        cy.enterPassengerInformation("Email", "1. Passenger", "test@example.com")
        cy.enterPassengerInformation("First Name", "2. Passenger", "Test")
        cy.enterPassengerInformation("Last Name", "2. Passenger", " Passenger")
        cy.enterPassengerInformation("Email", "2. Passenger", "anothertest@example.com")

        cy.get("button").contains("Submit Booking").click();

        cy.get("div").contains("Success").should("be.visible");

        cy.logout();
        cy.url().should('eq', 'http://localhost:5173/');
      });

  });
  