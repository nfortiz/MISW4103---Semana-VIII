import { LogIn } from "../pages/logIn";
import { PostPage } from "../pages/postPage";
import { PrincipalPage } from "../pages/principalPage";

//JSONs de información
let data = require("../fixtures/properties.json");
let dataPool = require("../fixtures/dataPoolPosts.json");

//Manejo de excepciones
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E0001 - E0002", function () {
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

  it("E0001 - Crear un post programado", function () {
    //Given que voy a la sección de posts programados
    PostPage.schedulePost();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts programados
    PostPage.getTitleSection().should("include.text", "Scheduled");

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

    //And entramos al menu
    PostPage.menuPostSchedule();

    //And modificamos la hora
    let horasAtras = dataPool[0].horaPost;
    PostPage.writeHour(horasAtras);

    //And le da click en el boton de Publish
    PostPage.publishPostButton();
    cy.wait(1000);

    //And le da click en el boton Continue, final review
    PostPage.continueButton();

    //And le da click en el boton Publish post, right now
    PostPage.publishPostButtonFinal();

    //And cierre el modal de confirmación de publicación
    PostPage.closePublishModal();

    //When vamos al listado de posts
    PrincipalPage.clickPosts();

    //Then debería ver el post publicado en la lista de posts
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E0002 - Eliminar un post programado previamente creado", function () {
    //Given que voy a la sección de posts programados
    PostPage.schedulePost();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts programados
    PostPage.getTitleSection().should("include.text", "Scheduled");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPool[1].tituloPost;
    PostPage.writeTitle(titulo);
    cy.screenshot("ss");

    //And da click en contenido
    PostPage.clickInContent();
    cy.wait(1000);

    //And entramos al menu
    PostPage.menuPostSchedule();

    //And modificamos la hora
    let horasAtras = dataPool[1].horaPost;
    PostPage.writeHour(horasAtras);

    //And le da click en el boton de Publish
    PostPage.publishPostButton();
    cy.wait(1000);

    //And le da click en el boton Continue, final review
    PostPage.continueButton();

    //And le da click en el boton Publish post, right now
    PostPage.publishPostButtonFinal();

    //And cierre el modal de confirmación de publicación
    PostPage.closePublishModal();

    //And vamos al listado de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);

    //And le de click derecho en el post creado
    PostPage.lastPostCreated(titulo, "rightClick");
    cy.screenshot("ss");

    //When le da click en el boton de delete
    PostPage.deletePost();

    //Then el post es eliminado
    PostPage.deletePostModal();
    cy.wait(1000);
    cy.screenshot("ss");
  });
});

describe("Escenarios E0003 - E0005", function () {
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

  it("E0003 - Eliminar un post que previamente se Unpublish", function () {
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
    let titulo = dataPool[2].tituloPost;
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

    //And le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();
    cy.wait(1000);

    //And debo ver el post como Draft
    PostPage.postAsDraft();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click derecho en el post creado
    PostPage.lastPostCreated(titulo, "rightClick");
    cy.screenshot("ss");

    //When le da click en el boton de delete
    PostPage.deletePost();

    //Then el post es eliminado
    PostPage.deletePostModal();
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E0004 - Publicar un post que fue previamnete Unpublish", function () {
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
    let titulo = dataPool[3].tituloPost;
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

    //And le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();
    cy.wait(1000);

    //And debo ver el post como Draft
    PostPage.postAsDraft();
    cy.screenshot("ss");

    //And debería ver el post publicado en la lista de posts
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And le da click en el boton de Publish
    PostPage.publishPostButton();
    cy.wait(1000);

    //And le da click en el boton Continue, final review
    PostPage.continueButton();

    //And le da click en el boton Publish post, right now
    PostPage.publishPostButtonFinal();
    cy.screenshot("ss");

    //When cierre el modal de confirmación de publicación
    PostPage.closePublishModal();

    //Then debería ver el post publicado en la lista de posts
    PostPage.lastPostCreated(titulo, "notClick");
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E0005 - Unpublish de post previamente creado", function () {
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
    let titulo = dataPool[4].tituloPost;
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