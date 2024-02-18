describe('SC09 - Créer un compte utilisateur', () => {
  beforeEach("Aller à la page d'inscription", () => {
    cy.visit('http://localhost:4200/signup');
  });

  it("TC0901 : Création d'un utilisateur valide", () => {
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="email"]').type('test@test.test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();

    cy.url().should('include', '/auth/login');
  });

  it('TC0902 : Le champ firstname est vide', () => {
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="email"]').type('test@test.test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();
    cy.get('.register-container')
      .contains('Prénom est requis')
      .should('be.visible');
  });

  it('TC0903 : Le champ firstname contient des caractères spéciaux', () => {
    cy.get('input[name="firstname"]').type('#[#{[#{|[|');
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="email"]').type('test@test.test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();
    cy.get('input[name="firstname"]').should('have.class', 'invalid');
  });

  it('TC0904 : Le champ firstname contient 30 caractères', () => {
    cy.get('input[name="firstname"]').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="email"]').type('test@test.test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();

    cy.url().should('include', '/auth/login');
  });

  it('TC0905 : Le champ firstname contient 1 caractère', () => {
    cy.get('input[name="firstname"]').type('a');
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="email"]').type('test@test.test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();

    cy.url().should('include', '/auth/login');
  });

  it('TC0906 : le champ firstname contient plus de 30 caractères', () => {
    cy.get('input[name="firstname"]').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="email"]').type('test@test.test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();
    cy.get('input[name="firstname"]').should('have.class', 'invalid');
  });

  it('TC0907 : Le champ lastname est vide', () => {
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="email"]').type('test@test.test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();
    cy.get('input[name="lastname"]').should('have.class', 'invalid');
  });

  it('TC0908 : Le champ lastname contient des caractères spéciaux', () => {
    cy.get('input[name="lastname"]').type('#[#{[#{|[|');
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="email"]').type('test@test.test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();
    cy.get('input[name="lastname"]').should('have.class', 'invalid');
  });

  it('TC0909 : Le champ lastname contient 30 caractères', () => {
    cy.get('input[name="lastname"]').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="email"]').type('test@test.test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();

    cy.url().should('include', '/auth/login');
  });

  it('TC0910 : Le champ lastname contient 1 caractère', () => {
    cy.get('input[name="lastname"]').type('a');
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="email"]').type('test@test.test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();

    cy.url().should('include', '/auth/login');
  });

  it('TC0911 : le champ lastname contient plus de 30 caractères', () => {
    cy.get('input[name="lastname"]').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="email"]').type('test@test.test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();
    cy.get('input[name="lastname"]').should('have.class', 'invalid');
  });

  it('TC0912 : Le champ email est vide', () => {
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();
    cy.get('input[name="email"]').should('have.class', 'invalid');
  });

  it('TC0913 : Le champ email ne respect pas le regex', () => {
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="email"]').type('test@test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('input[name="email"]')
      .invoke('text')
      .should(
        'not.match',
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    cy.get('button').eq(2).click();
    cy.get('input[name="email"]').should('have.class', 'invalid');
  });

  it('TC0914 : Le champ email contient 30 caractères', () => {
    cy.get('input[name="email"]').type('test@test.tsssssssssssssssssss');
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();

    cy.url().should('include', '/auth/login');
  });

  it('TC0915 : Le champ email contient 6 caractères', () => {
    cy.get('input[name="email"]').type('t@t.ts');
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();

    cy.url().should('include', '/auth/login');
  });

  it('TC0916 : Le champ email contient plus de 30 caractères', () => {
    cy.get('input[name="email"]').type('test@test.tsssssssssssqsdqsssssssss');
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();
    cy.get('input[name="email"]').should('have.class', 'invalid');
  });

  it('TC0917 : Le champ email contient moins de 6 caractères', () => {
    cy.get('input[name="email"]').type('t@t.s');
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="password"]').type('test1234');

    cy.get('button').eq(2).click();
    cy.get('input[name="email"]').should('have.class', 'invalid');
  });

  it('TC0918 : Le champ password est vide', () => {
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="email"]').type('test@test.test');

    cy.get('button').eq(2).click();
    cy.get('input[name="password"]').should('have.class', 'invalid');
  });

  it('TC0920 : Le champ password contient 6 caractères', () => {
    cy.get('input[name="email"]').type('tets@tets.sets');
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="password"]').type('testtt');

    cy.get('button').eq(2).click();

    cy.url().should('include', '/auth/login');
  });

  it('TC0922 : Le champ password contient moins de 6 caractères', () => {
    cy.get('input[name="email"]').type('tets@tets.sets');
    cy.get('input[name="firstname"]').type('test');
    cy.get('input[name="lastname"]').type('test');
    cy.get('input[name="password"]').type('tet');

    cy.get('button').eq(2).click();
    cy.get('input[name="password"]').should('have.class', 'invalid');
  });
});
