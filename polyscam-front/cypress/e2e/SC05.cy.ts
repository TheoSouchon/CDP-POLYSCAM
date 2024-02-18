describe("SC05-Modification d'une annonce", () => {
  beforeEach('Aller à la page des annonce du compte', () => {
    cy.visit('http://localhost:4200/auth/login');

    cy.get('input[name="username"]').type('ewan.allal@gmail.com');
    cy.get('input[name="password"]').type('ewan1234');

    cy.get('button').eq(2).click();
    cy.get('button').eq(1).click();

    cy.get('.announces-container')
      .children()
      .first()
      .find('button')
      .eq(1)
      .click();
  });

  it("TC0501 : Modification d'une annonce avec succes", () => {
    cy.get('input[formControlName="name"]').clear().type('annonce test');
    cy.get('input[formControlName="price"]').clear().type('10');
    cy.get('textarea[formControlName="description"]')
      .clear()
      .type('description test');

    cy.get('button').eq(5).click();

    cy.url().should('include', '/user');
    cy.get('.announces-container').contains('annonce test');
    cy.get('.announces-container').contains('10');
    cy.get('.announces-container').contains('description test');
  });

  it('TC0502 : champ name vide', () => {
    cy.get('input[formControlName="name"]').clear();
    cy.get('input[formControlName="price"]').clear().type('10');
    cy.get('textarea[formControlName="description"]')
      .clear()
      .type('description test');

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0503 : Le champ name contient 30 caractères', () => {
    cy.get('input[formControlName="name"]')
      .clear()
      .type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    cy.get('input[formControlName="price"]').clear().type('10');
    cy.get('textarea[formControlName="description"]')
      .clear()
      .type('description test');

    cy.get('button').eq(5).click();

    cy.url().should('include', '/user');
    cy.get('.announces-container').contains('annonce test');
    cy.get('.announces-container').contains('10');
    cy.get('.announces-container').contains('description test');
  });

  it('TC0504 : Le champ name contient plus de 30 caractères', () => {
    cy.get('input[formControlName="name"]')
      .clear()
      .type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    cy.get('input[formControlName="price"]').clear().type('10');
    cy.get('textarea[formControlName="description"]')
      .clear()
      .type('description test');

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0505 : Le champ description est vide', () => {
    cy.get('input[formControlName="name"]').clear().type('tesst');
    cy.get('input[formControlName="price"]').clear().type('10');
    cy.get('textarea[formControlName="description"]').clear();

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0506 : le champ ItemDescription contient 1024 caractères', () => {
    cy.get('input[formControlName="name"]').clear().type('annonce pas cher');
    cy.get('input[formControlName="price"]').clear().type('1');
    cy.get('textarea[formControlName="description"]')
      .clear()
      .type(
        `uoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoidddddddddd`
      );

    cy.get('button').eq(5).click();

    cy.url().should('include', '/user');
  });

  it('TC0507 : le champ ItemDescription contient plus de 1024 caractèred', () => {
    cy.get('input[formControlName="name"]').clear().type('annonce pas cher');
    cy.get('input[formControlName="price"]').clear().type('1');
    cy.get('textarea[formControlName="description"]')
      .clear()
      .type(
        `uoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoiuoidddddddddddsfsdgfdfgdfgdfgdfgdfgdfgdfgfdfgdfgdfg`
      );

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0508 : le champ price est vide', () => {
    cy.get('input[formControlName="name"]').clear().type('tesst');
    cy.get('input[formControlName="price"]').clear();
    cy.get('textarea[formControlName="description"]').clear();

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0509 : le champ price ne respecte pas le regex', () => {
    cy.get('input[formControlName="name"]').clear().type('tesst');
    cy.get('input[formControlName="price"]')
      .clear()
      .type('#{[|{[|{[|{[`[|`#{{#[{esdfjhwdfyukgwduilsfhilj');
    cy.get('textarea[formControlName="description"]').clear();

    cy.get('button').eq(5).should('be.disabled');
  });
});
