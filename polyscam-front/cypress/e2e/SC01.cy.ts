describe('SC01 Connexion sur la plateforme', () => {
  beforeEach('passes', () => {
    cy.visit('http://localhost:4200/auth/login');
  });

  it('TC0101 : Saisie correcte des identifiants de connexions', () => {
    cy.get('input[name="username"]').type('ewan.allal@gmail.com');
    cy.get('input[name="password"]').type('ewan1234');

    cy.get('button').eq(2).click();

    cy.url().should('include', '/home');
  });

  it('TC0102 : Le champ Username est vide', () => {
    cy.get('input[name="password"]').type('ewan1234');

    cy.get('button').eq(2).click();

    cy.get('.login-container')
      .contains('Adresse mail requise')
      .should('be.visible');
  });

  it('TC0104 : Le champ Password est vide', () => {
    cy.get('input[name="username"]').type('ewan.allal@gmail.com');

    cy.get('button').eq(2).click();

    cy.get('.login-container')
      .contains('Mot de passe requis')
      .should('be.visible');
  });

  it('TC0106 : Le champ Password possède moins de 6 caracteres', () => {
    cy.get('input[name="password"]').type('123');

    cy.get('button').eq(2).click();

    cy.get('.login-container')
      .contains('Le mot de passe doit faire au minimum 6 caractère')
      .should('be.visible');
  });

  it('TC0107 : le champ Password et Username ne sont pas dans la bdd', () => {
    cy.get('input[name="username"]').type('ewan.allal@gmdfgdfgdfail.com');
    cy.get('input[name="password"]').type('ewan1gdfgdfgdfgdfg234');

    cy.get('button').eq(2).click();

    cy.get('.login-container')
      .contains("Echec d'authentification:")
      .should('be.visible');
  });
});
