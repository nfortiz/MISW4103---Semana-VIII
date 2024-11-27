export class Settings {
  static clickNewsletters() {
    return cy.get('#newsletters').first().click({ force: true });
  }

  static addNewsLetter() {
    cy.get('[data-testid="newsletters"]')
    .find('span')
    .contains('Add newsletter')
    .click({ force: true });
  }

  static addNewsLetterName(name) {
    return cy.get('[placeholder="Weekly roundup"]').clear().type(name);
  }

  static clickCreate() {
    cy.get('[data-testid="add-newsletter-modal"]')
    .find('span')
    .contains('Create')
    .click({ force: true });
  }

  static clickSave() {
    cy.get('[data-testid="newsletter-modal"]')
    .find('span')
    .contains('Save')
    .click({ force: true });
  }

  static clickCancel() {
    cy.get('[data-testid="newsletter-modal"]')
    .find('span')
    .contains('Close')
    .click({ force: true });
  }

  static validateNewsletter(name) {
    cy.get('[data-testid="newsletters"]')
    .find('span')
    .contains(name)
    .should('exist');
  }

  static enterNewsLetter(name) {
    cy.get('[data-testid="newsletters"]')
    .find('span')
    .contains(name)
    .click({ force: true });
  }

  static clickArchive() {
    cy.get('.mb-5.mt-10')
    .find('span')
    .contains('Archive newsletter')
    .click({ force: true });
  }

  static clickArchiveModal() {
    cy.get('[data-testid="confirmation-modal"]')
    .find('span')
    .contains('Archive')
    .click({ force: true });
  }

  static validateArchiveMessage() {
    return cy.get('[data-testid="toast-success"]').first().should('be.visible');
  }

  static clickReactive() {
    cy.get('.mb-5.mt-10')
    .find('span')
    .contains('Reactivate newsletter')
    .click({ force: true });
  }

  static clickReactivateModal() {
    cy.get('[data-testid="confirmation-modal"]')
    .find('span')
    .contains('Reactivate')
    .click({ force: true });
  }

  static editLetterName(name) {
    return cy.get('[placeholder="Weekly Roundup"]').clear().type(name);
  }
}
