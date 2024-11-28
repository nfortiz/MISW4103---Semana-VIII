import { faker } from "@faker-js/faker";

import { PagesPage } from "../pages/pagesPage";

describe('Feature: Pruebas semana 8', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

    it.skip("1: Editar URL de una Page con datos generados aleatorios.", () => {
        //Given usuario logueado y pagina creada
        const title = "Page to be Edited";
        PagesPage.createPage(title, "Random content");
        PagesPage.goToPages();

        //When Doy click en editar
        PagesPage.getEditPageButtonByTitle(title); 
        cy.wait(500);
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //And Abre el menu lateral
        PagesPage.getLateralMenuInPage().click();
        cy.wait(500);
        
        //And edita la url de la Page
        let url = faker.lorem.sentence(3);
        PagesPage.getPageURLInput().clear(); // click en publicar
        cy.wait(500);
        PagesPage.getPageURLInput().type(url, {force: true}); // click en publicar
        PagesPage.getPageLabelForURL().click(); // click en publicar
        cy.wait(1000);

        url = url.toLowerCase().replaceAll(' ', '-').replace('.', '')

        // Then el link de visitar Page debe contener la nueva url
        PagesPage.getPageURLLink()
            .should('have.attr', 'target', '_blank')
            .should('have.attr', 'rel', 'noopener noreferrer')
            .should('have.attr', 'href')
                .and('contain', `/${url}/`);

        cy.wait(500);

        PagesPage.deletePageByTitle(title);
    });

    it.skip("2: Agregar code injection al header de una Page con datos generados aleatorios.", () => {
        //Given usuario logueado y pagina creada
        const title = "Page to be Edited";
        PagesPage.createPage(title, "Random content");
        PagesPage.goToPages();

        //When Doy click en editar
        PagesPage.getEditPageButtonByTitle(title); 
        cy.wait(500);
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //And Abre el menu lateral
        PagesPage.getLateralMenuInPage().click();
        cy.wait(500);
        
        //And agrega code al header de la page
        PagesPage.getCodeInjectionButton().click();
        const textToBeInjected = faker.lorem.sentence(3);
        const idOfCodeInjected = "text-injected-cypress";
        let codeToBeInjected = `<p id="${idOfCodeInjected}">${textToBeInjected}</p>`
        PagesPage.getCodeTextBox().first().type(codeToBeInjected);
        
        PagesPage.getCloseCodeInjectionModal().click();
        cy.wait(1000)
        // Then el link de visitar Page debe contener la nueva url
        PagesPage.getPageURLLink()
            .should('have.attr', 'target', '_blank')
            .should('have.attr', 'rel', 'noopener noreferrer')
            .should('have.attr', 'href').then((href) => {
                cy.visit(href);
                cy.wait(500);
                cy.get(`#${idOfCodeInjected}`).should('contain', textToBeInjected)
              });

        cy.wait(500);

        PagesPage.deletePageByTitle(title);
    });

    it("3: Agregar code injection al footer de una Page con datos generados aleatorios.", () => {
        //Given usuario logueado y pagina creada
        const title = "Page to be Edited";
        PagesPage.createPage(title, "Random content");
        PagesPage.goToPages();

        //When Doy click en editar
        PagesPage.getEditPageButtonByTitle(title); 
        cy.wait(500);
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //And Abre el menu lateral
        PagesPage.getLateralMenuInPage().click();
        cy.wait(500);
        
        //And agrega code al header de la page
        PagesPage.getCodeInjectionButton().click();
        const textToBeInjected = faker.lorem.sentence(3);
        const idOfCodeInjected = "text-injected-cypress";
        let codeToBeInjected = `<p id="${idOfCodeInjected}">${textToBeInjected}</p>`
        PagesPage.getCodeTextBox().eq(1).type(codeToBeInjected);
        
        PagesPage.getCloseCodeInjectionModal().click();
        cy.wait(1000)
        // Then el link de visitar Page debe contener la nueva url
        PagesPage.getPageURLLink()
            .should('have.attr', 'target', '_blank')
            .should('have.attr', 'rel', 'noopener noreferrer')
            .should('have.attr', 'href').then((href) => {
                cy.visit(href);
                cy.wait(500);
                cy.get(`#${idOfCodeInjected}`).should('contain', textToBeInjected)
              });

        cy.wait(500);

        PagesPage.deletePageByTitle(title);
    });


});