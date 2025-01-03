import { faker } from "@faker-js/faker";

import { PagesPage, CONTENT } from "../pages/pagesPage";

import { NavigationPage } from '../pages/navigationPage';

describe('Feature: Pruebas semana 8', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

    it.skip("E000028: Editar URL de una Page con datos generados aleatorios.", () => {
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

    it.skip("E00029: Agregar code injection al header de una Page con datos generados aleatorios.", () => {
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

    it.skip("E00030: Agregar code injection al footer de una Page con datos generados aleatorios.", () => {
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

    it.skip("E00031: Verificar que el shortcut CTRL + B (Negrita) esta siendo aplicado al agregar contenido a la Page.", () => {
        //Given usuario logueado 
        PagesPage.goToPages();

        //When Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let title = faker.lorem.sentence();
        let content = faker.lorem.paragraph();
        PagesPage.addContentToPage(title, content);
        cy.wait(500);

        let contentBold = faker.lorem.sentence();
        PagesPage.getTextAreaForPageContent().type('{ctrl}b');
        cy.wait(500);
        PagesPage.getTextAreaForPageContent().type(contentBold);
        cy.wait(500);

        PagesPage.getTextAreaForPageContent().within(() => {
            cy.get('strong')
                .should('contain', contentBold)
        });
        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        //And confirma creacion de la página 
        PagesPage.clickConfirmCreatePage();
        cy.wait(500);

        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal().within(() => {
            PagesPage.getPageTitleInConfirmationModal()
                .should('contain', title);
        });

        cy.wait(500);
        PagesPage.closeModal();

        PagesPage.deletePageByTitle(title);
    });

    it.skip("E00032: Verificar que el shortcut CTRL + I (Cursiva) esta siendo aplicado al agregar contenido a la Page.", () => {
        //Given usuario logueado 
        PagesPage.goToPages();

        //When Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let title = faker.lorem.sentence();
        let content = faker.lorem.paragraph();
        PagesPage.addContentToPage(title, content);
        cy.wait(500);

        let contentBold = faker.lorem.sentence();
        PagesPage.getTextAreaForPageContent().type('{ctrl}i');
        cy.wait(500);
        PagesPage.getTextAreaForPageContent().type(contentBold);
        cy.wait(500);

        PagesPage.getTextAreaForPageContent().within(() => {
            cy.get('em')
                .should('contain', contentBold)
        });
        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        //And confirma creacion de la página 
        PagesPage.clickConfirmCreatePage();
        cy.wait(500);

        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal().within(() => {
            PagesPage.getPageTitleInConfirmationModal()
                .should('contain', title);
        });

        cy.wait(500);
        PagesPage.closeModal();

        PagesPage.deletePageByTitle(title);
    });

    it.skip("E00033: Agregar Markdown al contenido de la Page.[BUG]", () => {
        //Given usuario logueado 
        PagesPage.goToPages();

        //When Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let title = faker.lorem.sentence();
        let content = faker.lorem.paragraph();
        PagesPage.addContentToPage(title, content);
        cy.wait(500);

        let idContent = `cypress-id`;
        let textContent = faker.lorem.sentence();
        let markdownContent = `## ${textContent} {{}#${idContent}{}}`;
        PagesPage.getTextAreaForPageContent().type('{enter}');
        cy.get(CONTENT.pageContentInput).eq(1).type('/markdown');
        cy.wait(500);
        cy.get('button[data-kg-card-menu-item="Markdown"]').click();
        cy.wait(500);
        cy.get('pre[role="presentation"]').type(markdownContent);
        cy.wait(500);

        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        //And confirma creacion de la página 
        PagesPage.clickConfirmCreatePage();
        cy.wait(500);

        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal().within(() => {
            PagesPage.getPageTitleInConfirmationModal()
                .should('contain', title);
        });

        PagesPage.getPublishPageModal().within(() => {
           cy.get('a[data-test-complete-bookmark]') 
           .should('have.attr', 'target', '_blank')
           .should('have.attr', 'href').then((href) => {
               cy.visit(href);
            });
            
        });
        cy.wait(500);
        
        cy.get(`h2`).should('contain', textContent)
        
        cy.wait(500);
        PagesPage.goToPages();

        PagesPage.deletePageByTitle(title);
    });

    it.skip("E00034: Agregar Botton con link a cypress al contenido de la Page.", () => {
        //Given usuario logueado 
        PagesPage.goToPages();

        //When Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let title = faker.lorem.sentence();
        let content = faker.lorem.paragraph();
        PagesPage.addContentToPage(title, content);
        cy.wait(500);

        let buttonContent = `Go to Cypress`;
        let buttonLink = `https://docs.cypress.io/api/commands/type`;
        PagesPage.getTextAreaForPageContent().type('{enter}');
        cy.get(CONTENT.pageContentInput).eq(1).type('/button');
        cy.wait(500);
        cy.get('button[data-kg-card-menu-item="Button"]').click();
        cy.wait(500);
        cy.get('div[data-testid="settings-panel"]').within(() => {
            cy.get('input[data-testid="button-input-text"]').type(buttonContent);
            cy.get('input[data-testid="button-input-url"]').type(buttonLink);
            cy.contains('Button text').click();
        });

        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        //And confirma creacion de la página 
        PagesPage.clickConfirmCreatePage();
        cy.wait(500);

        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal().within(() => {
            PagesPage.getPageTitleInConfirmationModal()
                .should('contain', title);
        });

        PagesPage.getPublishPageModal().within(() => {
           cy.get('a[data-test-complete-bookmark]') 
           .should('have.attr', 'target', '_blank')
           .should('have.attr', 'href').then((href) => {
               cy.visit(href);
            });
            
        });
        cy.wait(500);
        
        cy.contains(buttonContent)
            .should('have.attr', 'href').then((href) => {
                cy.wrap(href).should('contain', buttonLink)
            })
        
        cy.wait(500);
        PagesPage.goToPages();

        PagesPage.deletePageByTitle(title);
    });

    it.skip("E00035: Agregar Bookmark con link a cypress al contenido de la Page.", () => {
        //Given usuario logueado 
        PagesPage.goToPages();

        //When Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let title = faker.lorem.sentence();
        let content = faker.lorem.paragraph();
        PagesPage.addContentToPage(title, content);
        cy.wait(500);

        let bmLink = `https://www.cypress.io/blog/uploading-files-with-selectfile`;
        PagesPage.getTextAreaForPageContent().type('{enter}');
        cy.get(CONTENT.pageContentInput).eq(1).type(`/bookmark ${bmLink} {enter}`);
        cy.wait(500);

        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        //And confirma creacion de la página 
        PagesPage.clickConfirmCreatePage();
        cy.wait(500);

        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal().within(() => {
            PagesPage.getPageTitleInConfirmationModal()
                .should('contain', title);
        });

        PagesPage.getPublishPageModal().within(() => {
           cy.get('a[data-test-complete-bookmark]') 
           .should('have.attr', 'target', '_blank')
           .should('have.attr', 'href').then((href) => {
               cy.visit(href);
            });
            
        });
        cy.wait(500);
        
        cy.get('a.kg-bookmark-container')
            .should('have.attr', 'href').then((href) => {
                cy.wrap(href).should('contain', bmLink)
            })
        
        cy.wait(500);
        PagesPage.goToPages();

        PagesPage.deletePageByTitle(title);
    });

    it("E00036: Agregar Youtube video con link a cypress al contenido de la Page.", () => {
        //Given usuario logueado 
        PagesPage.goToPages();

        //When Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let title = faker.lorem.sentence();
        let content = faker.lorem.paragraph();
        PagesPage.addContentToPage(title, content);
        cy.wait(500);

        let bmLink = `https://www.youtube.com/watch?v=OUyzmi4F5Rc`;
        PagesPage.getTextAreaForPageContent().type('{enter}');
        cy.get(CONTENT.pageContentInput).eq(1).type(`/youtube ${bmLink}`);
        cy.wait(500);
        cy.get(CONTENT.pageContentInput).eq(1).type(`{enter}`);
        cy.wait(500);

        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        //And confirma creacion de la página 
        PagesPage.clickConfirmCreatePage();
        cy.wait(500);

        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal().within(() => {
            PagesPage.getPageTitleInConfirmationModal()
                .should('contain', title);
        });

        PagesPage.getPublishPageModal().within(() => {
           cy.get('a[data-test-complete-bookmark]') 
           .should('have.attr', 'target', '_blank')
           .should('have.attr', 'href').then((href) => {
               cy.visit(href);
            });
            
        });
        cy.wait(500);
        
        cy.get('iframe')
            .should('have.attr', 'src').then((href) => {
                cy.wrap(href).should('contain', 'https://www.youtube.com')
            })
        
        cy.wait(500);
        PagesPage.goToPages();

        PagesPage.deletePageByTitle(title);
    });

    it.skip("E00037: Agregar items a la Navegacion del site.", () => {
       //Given usuario logueado
        NavigationPage.goToSettings();

        NavigationPage.goToEditNavigation();

        NavigationPage.getNavigationSection().within(() => {
            cy.contains('Customize').click();
        });

        let navigationText = faker.lorem.sentence(1);

        NavigationPage.getEditNavigationModal().within(() => {
            cy.get('div[data-testid="new-navigation-item"]').within(() => {
                cy.get('input').first().type(navigationText);
                cy.get('input').eq(1).type('cypress');
                cy.get('button[data-testid="add-button"]').click();
            });

            cy.wait(500);
            cy.get('button.cursor-pointer.bg-black.text-white').click(); // click save
        });


        NavigationPage.goToSite();
        cy.wait(500);

        cy.get('nav.gh-navigation-menu')
            .should('contain', navigationText)
        
    });

    it.skip("E00038: Eliminar items a la Navegacion del site.", () => {
        //Given usuario logueado
         NavigationPage.goToSettings();
 
         NavigationPage.goToEditNavigation();
 
         NavigationPage.getNavigationSection().within(() => {
             cy.contains('Customize').click();
         });
 
         let navigationText = faker.lorem.sentence(1);
 
         NavigationPage.getEditNavigationModal().within(() => {
             cy.get('div[data-testid="navigation-item-editor"]').last().within(() => {
                 cy.get('button').first().click();
             });
 
             cy.wait(500);
             cy.get('button.cursor-pointer.bg-black.text-white').click(); // click save
         });
 
 
         NavigationPage.goToSite();
         cy.wait(500);
 
         cy.get('nav.gh-navigation-menu')
             .should('not.contain', navigationText)
         
    });  

        it("E00039: Agregar items a la Navegacion del site con un titulo largo [BUG].", () => {
       //Given usuario logueado
        NavigationPage.goToSettings();

        NavigationPage.goToEditNavigation();

        NavigationPage.getNavigationSection().within(() => {
            cy.contains('Customize').click();
        });

        let navigationText = faker.lorem.sentence(5).replaceAll(' ', '-');

        NavigationPage.getEditNavigationModal().within(() => {
            cy.get('div[data-testid="new-navigation-item"]').within(() => {
                cy.get('input').first().type(navigationText);
                cy.get('input').eq(1).type('cypress');
                cy.get('button[data-testid="add-button"]').click();
            });

            cy.wait(500);
            cy.get('button.cursor-pointer.bg-black.text-white').click(); // click save
        });


        NavigationPage.goToSite();
        cy.wait(1000);

        cy.get('nav.gh-navigation-menu')
            .should('contain', navigationText)
        
    });

});
