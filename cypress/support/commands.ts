/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })´

Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://localhost:5173/login');
    cy.get("[type='email']").type(email);
    cy.get("[type='password']").type(password);
    cy.get('button.chakra-button').contains("Log in").click();   
  });

Cypress.Commands.add("logout", () => {
    cy.get(".chakra-menu__menu-button").click();
    cy.get("button").contains("Log out").click();
})

Cypress.Commands.add("findAndSelectItem", (optionName, labelName) => {
    cy.get('label')
      .contains(labelName)
      .closest('.chakra-form-control')
      .find('select')
      .select(optionName);
  });

Cypress.Commands.add("verifyAmountOfOptions", (amount, labelName) => {
    cy.get('label')
      .contains(labelName)
      .closest('.chakra-form-control')
      .find('select option') // Ensure this targets the correct elements
      .should('have.length.greaterThan', amount);
  });

Cypress.Commands.add("enterPassengerInformation", (label, description, information) => {
    cy.get('div')
        .contains(description)
        .closest(".chakra-stack")
        .find(".chakra-form-control")
        .contains(label)
        .closest('div')
        .find("input")
        .type(information)
    
    // Ticket is created when email has been put in and the on-blur is triggered. This to ensure that it happens for the last passenger as well.
    cy.get('div')
      .contains(description)
      .click();
})

//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }