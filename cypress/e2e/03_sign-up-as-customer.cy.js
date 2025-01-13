describe('Sign up as customer', () => {
    it('should navigate to the signup page and complete the signup form', () => {
      const email = 'test100@example.com';
      const password = 'Password123';
      // Visit the home page
      cy.visit("http://localhost:5173");
  
      // Open the Drawer
      

      cy.get('[data-testid = "cyp-profile-img-menu-button"]').click(); // Adjust the selector as needed
  
      // Click on the Signup link
      cy.get('a[href="/signup"]').contains('Sign up').click();
  
      // Verify the URL
      cy.url().should('eq', 'http://localhost:5173/signup');
  
      // Fill out the form
      cy.get('input[placeholder="Enter e-mail"]').type(email);
      cy.get('input[placeholder="Enter password"]').type(password);
      cy.get('input[placeholder="Repeat password"]').type(password);
  
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

      //Login to verify the customer is created successfully
      cy.login(email, password);

      cy.logout();
      cy.url().should('eq', 'http://localhost:5173/');


    });
  });
