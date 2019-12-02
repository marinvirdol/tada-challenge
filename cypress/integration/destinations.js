describe('Destinations', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.localStorage.clear();
      }
    });

  });

  it('should display a message when there is no destination in the list', () => {
    cy.get('[data-cy=destination-list--empty]')
      .should('contain', 'Are you sure you enjoy travelling? You don\'t have any dream destination.')
  });

  it('should be able to add a new destination', () => {

    cy.get('[data-cy=expansion-destination-form]').click();

    cy.get('[data-cy=destination-form]').should('exist');

    cy.get('[data-cy=name]').type('Hawai');
    cy.get('[data-cy=description').type('Beautiful place');
    cy.get('[data-cy=submit]').click();

    cy.get('[data-cy=destination-item]').as('item').should('have.length', 1);

    cy.get('@item')
      .first()
      .find('[data-cy=destination-name]').should('contain', 'Hawai');

    cy.get('@item')
      .first()
      .find('[data-cy=destination-description]').should('contain', 'Beautiful place');
  });

  it('should be able to clear all the destinations in the list', () => {
    cy.get('[data-cy=expansion-destination-form]').click();

    cy.insertDestination(Array(10).join('a'), Array(20).join('x'));
    cy.insertDestination(Array(10).join('b'), Array(20).join('y'));
    cy.insertDestination(Array(10).join('c'), Array(20).join('z'));

    cy.get('[data-cy=destination-item]')
      .should('have.length', 3);

    cy.get('[data-cy=clear-destination-list]').click();

    cy.get('[data-cy=destination-list--empty]').should('exist');
    cy.get('[data-cy=destination-item]')
      .should('have.length', 0);
  });

  it('should be able to edit a destination', () => {
    cy.get('[data-cy=expansion-destination-form]').click();

    cy.insertDestination(Array(10).join('a'), Array(20).join('x'));
    cy.insertDestination(Array(10).join('b'), Array(20).join('y'));
    cy.insertDestination(Array(10).join('c'), Array(20).join('z'));
    cy.get('[data-cy=destination-list] [data-cy=destination-item]').eq(1).as('item');

    cy.get('@item')
      .invoke('attr', 'data-uuid')
      .then(uuid => {
        cy.get('@item')
          .find('[data-cy=destination-edit]')
          .click();

        cy.url().should('contain', '/destinations/'+uuid);

        cy.get('[data-cy=name]').clear().type('Hawai');
        cy.get('[data-cy=description').clear().type('Beautiful place');
        cy.get('[data-cy=submit]').click();

        cy.get('@item')
        .find('[data-cy=destination-name]').should('contain', 'Hawai');

        cy.get('@item')
        .find('[data-cy=destination-description]').should('contain', 'Beautiful place');

      });

  });

  it('should be able to move to navigate using the paginator', () => {
    cy.get('[data-cy=expansion-destination-form]').click();

    cy.insertDestination(Array(10).join('a'), Array(20).join('x'));
    cy.insertDestination(Array(10).join('b'), Array(20).join('y'));
    cy.insertDestination(Array(10).join('c'), Array(20).join('z'));
    cy.insertDestination(Array(10).join('d'), Array(20).join('n'));
    cy.insertDestination(Array(10).join('e'), Array(20).join('p'));
    cy.insertDestination(Array(10).join('f'), Array(20).join('q'));
    cy.insertDestination(Array(10).join('g'), Array(20).join('r'));
    cy.insertDestination(Array(10).join('h'), Array(20).join('t'));
    cy.insertDestination(Array(10).join('j'), Array(20).join('u'));
    cy.insertDestination(Array(10).join('k'), Array(20).join('v'));
    cy.insertDestination(Array(10).join('l'), Array(20).join('w'));
    cy.insertDestination(Array(10).join('m'), Array(20).join('o'));

    cy.get('[data-cy=destination-item]').should('have.length', 10);

    cy.get('[data-cy=paginator]').find('button.mat-paginator-navigation-next').click();

    cy.get('[data-cy=destination-item]').should('have.length', 2);

    cy.get('[data-cy=paginator]').find('button.mat-paginator-navigation-previous').click();

    cy.get('[data-cy=destination-item]').should('have.length', 10);

  })
});