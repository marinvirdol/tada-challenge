describe('Header', () => {
  it('should have the correct text', () => {
    cy.visit('/');

    cy.get('[data-cy=header]').should('contain', 'My Dream Destinations');
  });
});