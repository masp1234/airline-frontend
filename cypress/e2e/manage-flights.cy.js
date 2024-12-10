describe('Create flight page - making sure that you can choose the right information.', () => {

  beforeEach(() => {
    cy.login("admin@example.com", "123123");
    cy.visit("http://localhost:5173/create-flight");
    });

  it('Navigates to the create-flight page and verifies select options', () => {
    const labelNames = ['airline', 'airplane', 'departure', 'destination'];

    // checks for more than 1 option, to account for the default placeholder option
    const optionsGreaterThanAmount = 1;
    labelNames.forEach((labelName) => verifyAmountOfOptions(optionsGreaterThanAmount, labelName));

    const departureAirport = "Los Angeles International Airport"
    const arrivalAirport = "Denver International Airport";
    const airline = "Delta Airlines";
    const airplane = "Airbus A320";
    findAndSelectItem(departureAirport, "departure")
    findAndSelectItem(arrivalAirport, "destination")
    findAndSelectItem(airline, "airline")
    findAndSelectItem(airplane, "airplane")
    
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

    findAndSelectItem(departureAirport, "Departure")
    findAndSelectItem(arrivalAirport, "Arrival")
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
    cy.url().should('eq', 'http://localhost:5173');
  });
});

// Helper function for verifying options in select fields
const verifyAmountOfOptions = (amount, labelName) => {
  cy.get('label')
    .contains(labelName)
    .closest('.chakra-form-control')
    .find('select option') // Ensure this targets the correct elements
    .should('have.length.greaterThan', amount);
};

const findAndSelectItem = (optionName, labelName) => {
  cy.get('label')
    .contains(labelName)
    .closest('.chakra-form-control')
    .find('select')
    .select(optionName);
};
