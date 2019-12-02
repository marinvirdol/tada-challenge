Cypress.Commands.add('insertDestination', (name, description) => {
  cy.get('[data-cy=name]').type(name);
  cy.get('[data-cy=description').type(description);
  cy.get('[data-cy=destination-form]').submit();
});