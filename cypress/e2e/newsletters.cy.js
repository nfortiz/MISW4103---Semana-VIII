import { faker } from "@faker-js/faker";
import { LogIn } from "../pages/logIn";
import { NewsLetters } from "../pages/newsLetters";
import { PrincipalPage } from "../pages/principalPage";

//JSONs de información
let data = require("../fixtures/properties.json");

//Manejo de excepciones
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E0007 - E00010", function () {
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

  it("E0007 - Crear newsletter", function () {
    //Given que voy a los NewsLetters
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en newsletters
    NewsLetters.clickNewsletters();

    //And doy click add newsletter
    NewsLetters.addNewsLetter();
    cy.screenshot("ss");

    //And añado nombre de newsletter
    let name = faker.lorem.word();
    NewsLetters.addNewsLetterName(name);
    cy.screenshot("ss");

    //And doy click en create
    NewsLetters.clickCreate();
    cy.screenshot("ss");

    //And le doy click en save
    NewsLetters.clickSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //When doy click en cancel
    NewsLetters.clickCancel();
    cy.wait(1000);

    //Then veo la newsletter creada
    NewsLetters.validateNewsletter(name);
    cy.screenshot("ss");
  });

  it("E0008 - Archivar newsletter previamente creada", function () {
    //Given que voy a los NewsLetters
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en newsletters
    NewsLetters.clickNewsletters();

    //And doy click add newsletter
    NewsLetters.addNewsLetter();
    cy.screenshot("ss");

    //And añado nombre de newsletter
    let name = faker.lorem.word();
    NewsLetters.addNewsLetterName(name);
    cy.screenshot("ss");

    //And doy click en create
    NewsLetters.clickCreate();
    cy.screenshot("ss");

    //And le doy click en save
    NewsLetters.clickSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en cancel
    NewsLetters.clickCancel();
    cy.wait(1000);

    //And entro a la newsletter
    NewsLetters.enterNewsLetter(name);
    cy.wait(1000);
    cy.screenshot("ss");
    
    //And doy click en archive
    NewsLetters.clickArchive();
    cy.wait(1000);
    cy.screenshot("ss");

    //When doy click en archive del modal
    NewsLetters.clickArchiveModal();
    cy.wait(1000);
    cy.screenshot("ss");

    //Then veo mensaje de confirmacion
    NewsLetters.validateArchiveMessage();
  });

  it("E0009 - Reactivar una newsletter previamente creada", function () {
    //Given que voy a los NewsLetters
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en newsletters
    NewsLetters.clickNewsletters();

    //And doy click add newsletter
    NewsLetters.addNewsLetter();
    cy.screenshot("ss");

    //And añado nombre de newsletter
    let name = faker.lorem.word();
    NewsLetters.addNewsLetterName(name);
    cy.screenshot("ss");

    //And doy click en create
    NewsLetters.clickCreate();
    cy.screenshot("ss");

    //And le doy click en save
    NewsLetters.clickSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en cancel
    NewsLetters.clickCancel();
    cy.wait(1000);

    //And entro a la newsletter
    NewsLetters.enterNewsLetter(name);
    cy.wait(1000);
    cy.screenshot("ss");
    
    //And doy click en archive
    NewsLetters.clickArchive();
    cy.screenshot("ss");

    //And doy click en archive del modal
    NewsLetters.clickArchiveModal();
    cy.screenshot("ss");
    cy.wait(1000);

    //And doy click en re-activar
    NewsLetters.clickReactive();
    cy.screenshot("ss");

    //When doy click en re-activar del modal
    NewsLetters.clickReactivateModal();
    cy.screenshot("ss");
    cy.wait(1000);

    //Then veo mensaje de confirmacion
    NewsLetters.validateArchiveMessage();
  });

  it("E00010 - Editar titulo de un newsletter previamente creada", function () {
    //Given que voy a los NewsLetters
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en newsletters
    NewsLetters.clickNewsletters();

    //And doy click add newsletter
    NewsLetters.addNewsLetter();
    cy.screenshot("ss");

    //And añado nombre de newsletter
    let name = faker.lorem.word();
    NewsLetters.addNewsLetterName(name);
    cy.screenshot("ss");

    //And doy click en create
    NewsLetters.clickCreate();
    cy.screenshot("ss");

    //And le doy click en save
    NewsLetters.clickSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy click en cancel
    NewsLetters.clickCancel();
    cy.wait(1000);

    //And entro a la newsletter
    NewsLetters.enterNewsLetter(name);
    cy.wait(1000);
    cy.screenshot("ss");

    //And edito el titulo
    let tituloEditado = faker.lorem.word();
    NewsLetters.editLetterName(tituloEditado);
    cy.screenshot("ss");

    //And le doy click en save
    NewsLetters.clickSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //When doy click en cancel
    NewsLetters.clickCancel();
    cy.wait(1000);

    //Then veo la newsletter editada
    NewsLetters.validateNewsletter(tituloEditado);
    cy.screenshot("ss");
  });
});
