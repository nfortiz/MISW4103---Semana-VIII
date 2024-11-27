import { faker } from "@faker-js/faker";
import { LogIn } from "../pages/logIn";
import { PostPage } from "../pages/postPage";
import { PrincipalPage } from "../pages/principalPage";
import { FakerGenerador } from "../fixtures/generateRandom";

//JSONs de información
let data = require("../fixtures/properties.json");
let dataPool = require("../fixtures/dataPoolPosts.json");
let dataPoolInvalid = require("../fixtures/dataPoolPostsInvalid.json");

//Manejo de excepciones
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E0001 - E0003", function () {
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

  it("E0001 - Unpublish de post previamente creado", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPool[0].tituloPost;
    PostPage.writeTitle(titulo);
    cy.screenshot("ss");

    //And da click en contenido
    PostPage.clickInContent();
    cy.wait(1000);

    //And le da click en el boton de Publish
    PostPage.publishPostButton();
    cy.wait(1000);

    //And le da click en el boton Continue, final review
    PostPage.continueButton();

    //And le da click en el boton Publish post, right now
    PostPage.publishPostButtonFinal();

    //And cierre el modal de confirmación de publicación
    PostPage.closePublishModal();

    //And debería ver el post publicado en la lista de posts
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And doy clic en Unpublish
    PostPage.unpublishPost();
    cy.wait(1000);
    
    //And doy clic en Unpublish
    PostPage.unpublishPostFinal();
    cy.wait(1000);
    cy.screenshot("ss");

    //When le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();
    cy.wait(1000);

    //Then debo ver el post como Draft
    PostPage.postAsDraft();
    cy.screenshot("ss");
  });
});
