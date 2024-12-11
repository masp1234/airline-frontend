describe('Managing flights - making sure that you can create, update and delete a flight.', () => {

  beforeEach(() => {
    cy.login("admin@example.com", "123123");
    cy.visit("http://localhost:5173/create-flight");
    });

  it('Should be able to create, update and delete a flight.', () => {
    const labelNames = ['airline', 'airplane', 'departure', 'destination'];

    // checks for more than 1 option, to account for the default placeholder option
    const optionsGreaterThanAmount = 1;
    labelNames.forEach((labelName) => cy.verifyAmountOfOptions(optionsGreaterThanAmount, labelName));

    const departureAirport = "Los Angeles International Airport"
    const arrivalAirport = "Denver International Airport";
    const airline = "Delta Airlines";
    const airplane = "Airbus A320";
    cy.findAndSelectItem(departureAirport, "departure")
    cy.findAndSelectItem(arrivalAirport, "destination")
    cy.findAndSelectItem(airline, "airline")
    cy.findAndSelectItem(airplane, "airplane")
    
    const date1YearFromNow = new Date(); // Get the current date
    date1YearFromNow.setFullYear(date1YearFromNow.getFullYear() + 1);
    cy.get("[type='text']")
      .clear()
      .type(date1YearFromNow.toLocaleDateString());
    cy.get("[type='time']")
      .clear()
      .type('08:00:00');
      cy.get('button.chakra-button')
      .should('be.visible')
      .and('contain', 'Submit')
      .click();

    // Verify that the "Success" toast is shown
    cy.get("div").contains("Success").should("be.visible");


    // Find the flight that just got created in manage flights and click on it
    cy.visit("http://localhost:5173/manage-flights")

    cy.findAndSelectItem(departureAirport, "Departure")
    cy.findAndSelectItem(arrivalAirport, "Arrival")
    cy.get("[type='text']")
      .clear()
      .type(date1YearFromNow.toLocaleDateString());
      cy.get("td")
      .should("contain", departureAirport)
      .and("contain", arrivalAirport)
      .then((elements) => {
        // Click the first matching element - the Flight Code in this case.
        elements[0].click();
      });

    // Update the flight
    cy.get('button.chakra-button').contains("Update").should("be.disabled");

    cy.get("[type=time").clear().type("15:30:00");

    cy.get('button.chakra-button').contains("Update").should("be.enabled").click();


    // Delete the flight
    cy.get('button.chakra-button').contains("Delete")
      .click();


    cy.get(".chakra-modal__footer").find("button").contains("Delete").click();

    cy.url().should('eq', 'http://localhost:5173/manage-flights');

    cy.logout();

    // Trying to navigate to /manage-flights when not logged in should redirect you to the main page
    cy.visit("http://localhost:5173/manage-flights")
    cy.url().should('eq', 'http://localhost:5173/');
  });
});

