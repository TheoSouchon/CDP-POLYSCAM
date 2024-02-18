describe('SC04 - Créer une nouvelle annonce', () => {
  beforeEach("Aller à la page création d'annonce", () => {
    cy.visit('http://localhost:4200/auth/login');

    cy.get('input[name="username"]').type('ewan.allal@gmail.com');
    cy.get('input[name="password"]').type('ewan1234');

    cy.get('button').eq(2).click();
    cy.get('button').eq(1).click();
    cy.get('button').eq(5).click();
    cy.url().should('include', '/create-announce');
  });

  it("TC0401 : Création d'une annonce fonctionne", () => {
    cy.get('input[formControlName="name"]').type('annonce test');
    cy.get('input[formControlName="price"]').type('10');
    cy.get('textarea[formControlName="description"]').type('description test');

    cy.get('button').eq(5).click();

    cy.url().should('include', '/user');
    cy.get('.announces-container').contains('annonce test');
    cy.get('.announces-container').contains('10');
    cy.get('.announces-container').contains('description test');
  });

  it('TC0402 : Le champ ItemName est vide', () => {
    cy.get('input[formControlName="price"]').type('10');
    cy.get('textarea[formControlName="description"]').type('description');

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0403 : Le champ ItemName contient des caractères spéciaux', () => {
    cy.get('input[formControlName="name"]').type('~{[#{[#~{[');
    cy.get('input[formControlName="price"]').type('10');
    cy.get('textarea[formControlName="description"]').type('description');

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0404 : Le champ ItemName contient 30 caractères', () => {
    cy.get('input[formControlName="name"]').type(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    );
    cy.get('input[formControlName="price"]').type('10');
    cy.get('textarea[formControlName="description"]').type('description');

    cy.get('button').eq(5).click();

    cy.url().should('include', '/user');
    cy.get('.announces-container').contains('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  });

  it('TC0405 : Le champ ItemName contient 1 caractère', () => {
    cy.get('input[formControlName="name"]').type('a');
    cy.get('input[formControlName="price"]').type('10');
    cy.get('textarea[formControlName="description"]').type('description');

    cy.get('button').eq(5).click();

    cy.url().should('include', '/user');
    cy.get('.announces-container').contains('a');
  });

  it('TC0406 : le champ ItemName contient plus de 30 caractère', () => {
    cy.get('input[formControlName="name"]').type(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    );
    cy.get('input[formControlName="price"]').type('10');
    cy.get('textarea[formControlName="description"]').type('description');

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0407 : Le champ Price est vide', () => {
    cy.get('input[formControlName="name"]').type('annonce test');
    cy.get('textarea[formControlName="description"]').type('description');

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0408 : Le champ Price contient des caractères autre que des chiffres', () => {
    cy.get('input[formControlName="name"]').type('annonce test');
    cy.get('input[formControlName="price"]').type('pas un chiffre !!');
    cy.get('textarea[formControlName="description"]').type('description');

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0409 : Le champ Price est inférieur a 1', () => {
    cy.get('input[formControlName="name"]').type('annonce pas cher');
    cy.get('input[formControlName="price"]').type('0');
    cy.get('textarea[formControlName="description"]').type('description');

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0410 : Le champ Price contient un chiffre a virgule', () => {
    cy.get('input[formControlName="name"]').type('annonce pas cher');
    cy.get('input[formControlName="price"]').type('1.56564');
    cy.get('textarea[formControlName="description"]').type('description');

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0411 : Le champ ItemDescription est vide', () => {
    cy.get('input[formControlName="name"]').type('annonce pas cher');
    cy.get('input[formControlName="price"]').type('1');

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0412 : Le champ ItemDescription contient des caractères spéciaux hors , et .', () => {
    cy.get('input[formControlName="name"]').type('annonce pas cher');
    cy.get('input[formControlName="price"]').type('1');
    cy.get('textarea[formControlName="description"]').type('#|#{`{[|`[{*-/');

    cy.get('button').eq(5).should('be.disabled');
  });

  it('TC0413 : Le champ ItemDescription contient 30 caractères', () => {
    cy.get('input[formControlName="name"]').type('annonce pas cher');
    cy.get('input[formControlName="price"]').type('1');
    cy.get('textarea[formControlName="description"]').type(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    );

    cy.get('button').eq(5).click();

    cy.url().should('include', '/user');
    cy.get('.announces-container').contains('annonce pas cher');
    cy.get('.announces-container').contains('10');
    cy.get('.announces-container').contains('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  });

  it('TC0414 : Le champ ItemDescription contient 1 caractère', () => {
    cy.get('input[formControlName="name"]').type('annonce pas cher');
    cy.get('input[formControlName="price"]').type('1');
    cy.get('textarea[formControlName="description"]').type('a');

    cy.get('button').eq(5).click();

    cy.url().should('include', '/user');
    cy.get('.announces-container').contains('annonce pas cher');
    cy.get('.announces-container').contains('1');
    cy.get('.announces-container').contains('a');
  });

  it('TC0415 : le champ ItemDescription contient plus de 1024 caractère', () => {
    cy.get('input[formControlName="name"]').type('annonce pas cher');
    cy.get('input[formControlName="price"]').type('1');
    cy.get('textarea[formControlName="description"]').type(
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consectetur nisl ac libero euismod luctus. Sed nec est tortor. Pellentesque eu velit non nisl congue consectetur eget id ante. Donec non leo condimentum justo pretium vestibulum sit amet nec justo. Vestibulum congue eleifend est ac consectetur. Nam sit amet lectus consequat, aliquet risus id, venenatis enim. Cras tellus lorem, semper ut metus at, gravida facilisis lacus. Aliquam erat volutpat. Maecenas lobortis, quam in pharetra sodales, felis nunc faucibus felis, ut mollis metus ante quis ipsum. Aliquam erat volutpat. Donec vel convallis tortor.

      Maecenas ullamcorper eros massa, nec maximus nibh volutpat eget. Donec imperdiet, lectus sit amet sollicitudin malesuada, arcu risus tristique velit, at elementum elit augue nec orci. Vivamus suscipit, risus in tristique lobortis, est urna dapibus enim, elementum aliquam massa neque vestibulum lectus. Quisque varius orci aliquam ornare euismod. Aliquam eu dui leo. Vestibulum quis pulvinar est. Donec nam.`
    );

    cy.get('button').eq(5).should('be.disabled');
  });
});
