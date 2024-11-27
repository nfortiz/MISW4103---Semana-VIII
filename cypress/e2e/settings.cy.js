import { faker } from "@faker-js/faker";
import { LogIn } from "../pages/logIn";
import { Settings } from "../pages/settingsPage";
import { PrincipalPage } from "../pages/principalPage";

//JSONs de información
let data = require("../fixtures/properties.json");

//Manejo de excepciones
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E0006 - E0009", function () {
  let randomRow;

  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("ss");
      cy.wait(1000);
    });
  });

  it("E0006 - Crear newsletter", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en newsletters
    Settings.clickNewsletters();

    //And doy click add newsletter
    Settings.addNewsLetter();
    cy.screenshot("ss");

    //And añado nombre de newsletter
    let name = faker.lorem.word();
    Settings.addNewsLetterName(name);
    cy.screenshot("ss");

    //And doy click en create
    Settings.clickCreate();

    //And le doy click en save
    Settings.clickSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //When doy click en cancel
    Settings.clickCancel();
    cy.wait(1000);

    //Then veo la newsletter creada
    Settings.validateNewsletter(name);
    cy.screenshot("ss");
  });

  it("E0007 - Archivar newsletter previamente creada", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en newsletters
    Settings.clickNewsletters();

    //And doy click add newsletter
    Settings.addNewsLetter();
    cy.screenshot("ss");

    //And añado nombre de newsletter
    let name = faker.lorem.word();
    Settings.addNewsLetterName(name);
    cy.screenshot("ss");

    //And doy click en create
    Settings.clickCreate();

    //And le doy click en save
    Settings.clickSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en cancel
    Settings.clickCancel();
    cy.wait(1000);

    //And entro a la newsletter
    Settings.enterNewsLetter(name);
    cy.wait(1000);
    cy.screenshot("ss");
    
    //And doy click en archive
    Settings.clickArchive();
    cy.screenshot("ss");

    //When doy click en archive del modal
    Settings.clickArchiveModal();
    cy.wait(1000);

    //Then veo mensaje de confirmacion
    Settings.validateArchiveMessage();
  });

  it("E0008 - Reactivar una newsletter previamente creada", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en newsletters
    Settings.clickNewsletters();

    //And doy click add newsletter
    Settings.addNewsLetter();
    cy.screenshot("ss");

    //And añado nombre de newsletter
    let name = faker.lorem.word();
    Settings.addNewsLetterName(name);
    cy.screenshot("ss");

    //And doy click en create
    Settings.clickCreate();

    //And le doy click en save
    Settings.clickSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en cancel
    Settings.clickCancel();
    cy.wait(1000);

    //And entro a la newsletter
    Settings.enterNewsLetter(name);
    cy.wait(1000);
    cy.screenshot("ss");
    
    //And doy click en archive
    Settings.clickArchive();
    cy.screenshot("ss");

    //And doy click en archive del modal
    Settings.clickArchiveModal();
    cy.wait(1000);

    //And doy click en re-activar
    Settings.clickReactive();
    cy.screenshot("ss");

    //When doy click en re-activar del modal
    Settings.clickReactivateModal();
    cy.wait(1000);

    //Then veo mensaje de confirmacion
    Settings.validateArchiveMessage();
  });

  it("E0009 - Editar titulo de un newsletter previamente creada", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en newsletters
    Settings.clickNewsletters();

    //And doy click add newsletter
    Settings.addNewsLetter();
    cy.screenshot("ss");

    //And añado nombre de newsletter
    let name = faker.lorem.word();
    Settings.addNewsLetterName(name);
    cy.screenshot("ss");

    //And doy click en create
    Settings.clickCreate();

    //And le doy click en save
    Settings.clickSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en cancel
    Settings.clickCancel();
    cy.wait(1000);

    //And entro a la newsletter
    Settings.enterNewsLetter(name);
    cy.wait(1000);
    cy.screenshot("ss");

    //And edito el titulo
    let tituloEditado = faker.lorem.word();
    Settings.editLetterName(tituloEditado);
    cy.screenshot("ss");

    //And le doy click en save
    Settings.clickSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //When doy click en cancel
    Settings.clickCancel();
    cy.wait(1000);

    //Then veo la newsletter editada
    Settings.validateNewsletter(tituloEditado);
    cy.screenshot("ss");
  });
});
