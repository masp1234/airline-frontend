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
      const arrivalAirport = "John F. Kennedy International Airport";

      cy.findAndSelectItem(departureAirport, "Departure")
      cy.findAndSelectItem(arrivalAirport, "Arrival");
  
      // For "Departure Date"
      cy.contains("Departure Date")
        .closest(".chakra-form-control")
        .find("[type='text']")
        .click();
  

      cy.get(".react-datepicker__day")
        .contains("25")
        .click();
        
      cy.contains("Return Date")
        .closest(".chakra-form-control")
        .find("[type='text']")
        .click();
  
        cy.get('.react-datepicker__current-month').should('not.contain', 'January 2025'); 
        cy.get('.react-datepicker__navigation--next').click();
        cy.get('.react-datepicker__current-month').should('contain', 'January 2025');
        
        // Have to match exactly 3, otherwise it will try to pick "30"
        cy.get(".react-datepicker__day").contains(/^3$/).click();

        cy.get("button").contains("Search for Flights").click();
        
        cy.get("button").contains("Select").click();
        cy.get("button").contains("Next").click();

        cy.get("button").contains("Select").click();
        cy.get("button").contains("Next").click();

        cy.enterPassengerInformation("First Name", "1. Passenger", "Test")
        cy.enterPassengerInformation("Last Name", "1. Passenger", " Passenger")
        cy.enterPassengerInformation("Email", "1. Passenger", "test@example.com")
      });

  });
  