describe("SC03 : Consultation d'un utilisateur", () => {
  beforeEach('Aller vers la page de connexion', () => {
    cy.visit('http://localhost:4200/auth/login');
  });

  it("TC0301 : L'utilisateur clique sur le bouton création d'annonce", () => {
    cy.get('input[name="username"]').type('ewan.allal@gmail.com');
    cy.get('input[name="password"]').type('ewan1234');

    cy.get('button').eq(2).click();
    cy.get('button').eq(1).click();

    cy.get('button').eq(5).click();
    cy.url().should('include', '/create-announce');
  });

  it("TC0302 : L'utilisateur est sur la page mes annonces sans avoir d'annonces", () => {
    cy.get('input[name="username"]').type('corentin.germain@gmail.com');
    cy.get('input[name="password"]').type('corentin1234');

    cy.get('button').eq(2).click();
    cy.get('button').eq(1).click();

    cy.get('body').contains('Aucune annonce postée.').should('be.visible');
  });

  it("TC0303 : L'utilisateur est sur la page mes annonces", () => {
    cy.get('input[name="username"]').type('corentin.germain@gmail.com');
    cy.get('input[name="password"]').type('corentin1234');

    cy.get('button').eq(2).click();
    cy.get('button').eq(2).click();

    cy.get('body').contains('Créé par : Ewan Allal').should('be.visible');
  });

  it("TC0304 : L'utilisateur possède une ou plusieurs annonces ainsi qu'une proposition", () => {
    cy.get('input[name="username"]').type('corentin.germain@gmail.com');
    cy.get('input[name="password"]').type('corentin1234');

    cy.get('button').eq(2).click();
    cy.get('button').eq(1).click();

    cy.get('.announces-container').its('length').should('be.gt', 0);
  });

  it('TC0305 : L\'utilisateur clique sur le bouton "Voir Achats"', () => {
    cy.get('input[name="username"]').type('corentin.germain@gmail.com');
    cy.get('input[name="password"]').type('corentin1234');

    cy.get('button').eq(2).click();
    cy.get('button').eq(1).click();

    // TODO

    cy.url().should('include', '/');
  });
});
