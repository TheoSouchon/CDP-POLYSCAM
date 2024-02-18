describe("SC02 Page d'acceuil", () => {
  it("TC0201 : Page d'acceuil suite a une connexion", () => {
    cy.visit('http://localhost:4200/auth/login');

    cy.get('input[name="username"]').type('ewan.allal@gmail.com');
    cy.get('input[name="password"]').type('ewan1234');

    cy.get('button').eq(2).click();

    cy.url().should('include', '/home');
    cy.get('body').contains('Profil').should('be.visible');
    cy.get('body').contains('Annonces').should('be.visible');
    cy.get('body').contains('Mes commandes').should('be.visible');
    cy.get('body').contains('Se deconnecter').should('be.visible');
  });

  it("TC0202 : L'utilisateur clique sur le bouton Logout", () => {
    cy.visit('http://localhost:4200/auth/login');

    cy.get('input[name="username"]').type('ewan.allal@gmail.com');
    cy.get('input[name="password"]').type('ewan1234');

    cy.get('button').eq(2).click();

    cy.get('button').eq(4).click();
    cy.get('body').contains('Se connecter').should('be.visible');
  });

  it("TC0203 : L'utilisateur clique sur le bouton Login", () => {
    cy.visit('http://localhost:4200/home');

    cy.get('button').eq(1).click();

    cy.url().should('include', '/auth/login');
  });
});
