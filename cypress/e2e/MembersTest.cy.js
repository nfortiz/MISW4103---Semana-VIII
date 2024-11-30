const BASE_URL = "http://localhost:2368/";
import mockarooUtil from "../utils/MockarooUtil";
import { LogIn } from "../pages/logIn";
import { MembersPage } from "../pages/membersPage";
import { PrincipalPage } from "../pages/principalPage";
import { faker } from "@faker-js/faker";
const fakerSeed = 1234;
let membersDataAPriori = [];
let mockarooData = [];
let mockarooData2 = [];
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E2E para Ghost", function () {
  beforeEach(() => {
    cy.fixture("dataPoolMembers.json").then((data) => {
      membersDataAPriori = data;
    });

    cy.fixture("properties.json").then((data) => {
      cy.visit(data.baseURL);
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.wait(3000);
    });

  });

  it("E00040 - Crear Member - email con caracteres especiales", function () {
    const memberData = membersDataAPriori[12];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(6000);

    MembersPage.clickNewMemberButton();
    cy.wait(4000);

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    MembersPage.fillMemberForm(memberData);

    MembersPage.clickSaveButton();
    cy.wait(3000);

    MembersPage.goToMembersList();

    let memberFound = false;
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

  });

  it("E00041 - Crear Member - Deshabilitando Newsletters", function () {
    const memberData = membersDataAPriori[13];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(6000);

    MembersPage.clickNewMemberButton();
    cy.wait(4000);

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    MembersPage.fillMemberForm(memberData);
    MembersPage.disableNewsletter();

    MembersPage.clickSaveButton();
    cy.wait(3000);

    MembersPage.goToMembersList();

    let memberFound = false;
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

  });

  it("E00042 - Edit Member - habilitando Newsletters", function () {
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);

    const initialMemberData = membersDataAPriori[14];

    cy.wait(2000);

    MembersPage.getScreenTitle().should("include.text", "Members");

    MembersPage.clickNewMemberButton();
    cy.wait(2000);

    MembersPage.fillMemberForm(initialMemberData);
    MembersPage.disableNewsletter();

    MembersPage.clickSaveButton();
    cy.wait(3000);

    MembersPage.goToMembersList();
    cy.wait(2000);

    MembersPage.clickMemberByEmail(initialMemberData.email);

    const updatedName = membersDataAPriori[4].name;
    MembersPage.clearAndFillMemberName(updatedName);
    MembersPage.enableNewsletter();

    MembersPage.clickSaveButton();
    cy.wait(3000);

    MembersPage.goToMembersList();

    MembersPage.getMemberNameElement(initialMemberData.email).should(
      "have.text",
      updatedName
    );

  });

  it("E00043 - Crear Member - name con 191 caracteres borde rojo", function () {
    const memberData = membersDataAPriori[15];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(6000);

    MembersPage.clickNewMemberButton();
    cy.wait(4000);

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    MembersPage.fillMemberForm(memberData);

    MembersPage.clickSaveButton();

    cy.wait(3000);

    MembersPage.getMemberName().should('have.css', 'border-color', 'rgb(230, 233, 235)');

  });

  it("E00044 - Crear Member - name con 191 caracteres mensaje respuesta", function () {
    const memberData = membersDataAPriori[15];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(6000);

    MembersPage.clickNewMemberButton();
    cy.wait(4000);

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    MembersPage.fillMemberForm(memberData);

    MembersPage.clickSaveButton();

    cy.wait(3000);

    MembersPage.getMemberNameResponse().should('contain.text', 'Name cannot be longer than 191 characters.');

  });

  it("E00045 - Crear Member  name con 102 caracteres elimina boton guardar", function () {
    const memberData = membersDataAPriori[16];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(6000);

    MembersPage.clickNewMemberButton();
    cy.wait(4000);

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    MembersPage.fillMemberForm(memberData);

    MembersPage.clickSaveButton();

    cy.wait(3000);
    MembersPage.goToMembersList();
    cy.wait(2000);

    MembersPage.clickMemberByEmail(memberData.email);
    cy.wait(3000);
    MembersPage.getSaveButton().should('not.be.visible');

  });

  it("E00046 - Crear Member - email con 75 caracteres muestra email invalido", function () {
    const memberData = membersDataAPriori[17];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(6000);

    MembersPage.clickNewMemberButton();
    cy.wait(4000);

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    MembersPage.fillMemberForm(memberData);

    MembersPage.clickSaveButton();
    cy.wait(3000);

    MembersPage.getInvalidEmailMessageElement().should('contain.text', '\n    Invalid Email.\n');
  });

  it("E00047 - Crear Member  name con 102 caracteres elimina boton opciones", function () {
    const memberData = membersDataAPriori[18];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(6000);

    MembersPage.clickNewMemberButton();
    cy.wait(4000);

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    MembersPage.fillMemberForm(memberData);

    MembersPage.clickSaveButton();

    cy.wait(3000);
    MembersPage.goToMembersList();
    cy.wait(2000);

    MembersPage.clickMemberByEmail(memberData.email);
    cy.wait(3000);
    MembersPage.getMemberAction().should('not.be.visible');

  });

  it('E00048 - Buscar member y fltro vacio', () => {

    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(3000);

    MembersPage.inputSearch('a'),

    cy.wait(3000);

    MembersPage.validateTitleFilter('Filter (1)');

    MembersPage.clickFilter();

    MembersPage.getMemberFilterValue().should('exist').and('be.empty');

  });

  it('E00049 - Buscar nombre mas de 291 caracteres', () => {

    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(4000);
    MembersPage.clickFilter2();
    const memberData = membersDataAPriori[15];
    MembersPage.inputSearch2(memberData.name);
    MembersPage.clickApplyFilterButton();

  });

});
