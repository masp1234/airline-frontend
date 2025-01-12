describe('Sign Up E2E Test', () => {
    it('should navigate to the signup page and complete the signup form', () => {
      // Visit the home page
      cy.visit("http://localhost:5173");
  
      // Open the Drawer
      

      cy.get('[data-testid = "cyp-profile-img-menu-button"]').click(); // Adjust the selector as needed
  
      // Click on the Signup link
      cy.get('a[href="/signup"]').contains('Sign up').click();
  
      // Verify the URL
      cy.url().should('eq', 'http://localhost:5173/signup');
  
      // Fill out the form
      cy.get('input[placeholder="Enter e-mail"]').type('test71@example.com');
      cy.get('input[placeholder="Enter password"]').type('Password123');
      cy.get('input[placeholder="Repeat password"]').type('Password123');
  
      // Submit the form
      cy.get('button').contains('Sign Up').click();


      // Verify loading Verify
      cy.contains('Pending...').should('exist');
      cy.contains('Please wait').should('exist');

      // Verify success Verify
      cy.contains('Account created').should('be.visible');
      cy.contains('Your account has been successfully created').should('be.visible');

      // Verify the URL
      cy.url().should('eq', 'http://localhost:5173/');
    });
  });
