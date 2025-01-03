export class PostPage {
    static getTitleSection() {
        return cy.get('a.active.ember-view').should('be.visible');
    }

    static clickNewPost() {
        return cy.get('[data-test-new-post-button=""]').click({ force: true });
    }

    static writeTitle(title) {
        return cy.get('[data-test-editor-title-input=""]').clear().type(title);
    }

    static clickInContent() {
        return cy.get('p[data-koenig-dnd-droppable="true"]').first().click({ force: true });
    }

    static writeContent(content) {
        return cy.get('p[data-koenig-dnd-droppable="true"]').first().type(content);
    }

    static clearContent() {
        return cy.get('p[data-koenig-dnd-droppable="true"]').first().clear();
    }

    static creationPostPage() {
        return cy.get('[data-test-editor-title-input=""]').should('be.visible');
    }

    static publishPostButton() {
        return cy.get('[data-test-button="publish-flow"]').first().click({ force: true });
    }

    static continueButton() {
        return cy.get('[data-test-button="continue"]').first().click({ force: true });
    }

    static publishPostButtonFinal() {
        return cy.get('[data-test-button="confirm-publish"]').first().click({ force: true });
    }

    static closePublishModal() {
        return cy.get('[data-test-button="close-publish-flow"]').first().click({ force: true});
    }

    static lastPostCreated(title, flag) {
        // Verifica si existe algún elemento en la lista de posts
        cy.get('body').then(($body) => {
            if ($body.find('div.gh-posts-list-item-group').length) {
                // Si existe, selecciona el primer elemento en la lista
                cy.get('li.gh-list-row.gh-posts-list-item.gh-post-list-plain-status').first().within(() => {
                    // Encuentra el post por data-test-post-id y guarda su ID
                    if(flag === 'notClick') {
                        cy.get('a').first().then(() => {
                            cy.get('h3.gh-content-entry-title').first().should('include.text', title);
                        });
                    }

                    else if(flag === 'click') {
                        cy.get('a').first().then(() => {
                            cy.get('h3.gh-content-entry-title').first().click({ force: true });
                        });
                    }

                    else {
                        cy.get('h3.gh-content-entry-title').first().rightclick({ force: true });
                    }
                });
            }
        });
    }

    static updatePostButton() {
        return cy.get('[data-test-button="publish-save"]').first().click({ force: true });
    }

    static clickBackToPosts() {
        return cy.get('[data-test-link="posts"]').first().click({ force: true });
    }

    static viewContent(content) {
        return cy.get('p[data-koenig-dnd-droppable="true"]').first().should('be.visible').should('include.text', content);
    }

    static deletePost() {
        return cy.get('[data-test-button="delete"]').first().click({ force: true });
    }

    static deletePostModal() {
        return cy.get('[data-test-button="confirm"]').first().click({ force: true });
    }

    static clearContent() {
        cy.get('p[data-koenig-dnd-droppable="true"]').first().clear();
        cy.get('[data-test-editor-title-input=""]').first().clear();
    }

    static unpublishPost() {
        return cy.get('[data-test-button="update-flow"]').first().click({ force: true });
    }

    static unpublishPostFinal() {
        return cy.get('[data-test-button="revert-to-draft"]').first().click({ force: true });
    }

    static postAsDraft() {
        return cy.get('span.draft').first().should('include.text', 'Draft');
    }

    static schedulePost() {
        return cy.get('[data-test-nav-custom="posts-Scheduled"]').first().click({ force: true });
    }

    static menuPostSchedule() {
        return cy.get('[data-test-psm-trigger=""]').first().click({ force: true });
    }

    static writeHour(hourAtras) {
        //Hora de sistema
        let actual = new Date();
        actual.setHours(actual.getHours() - hourAtras);

        //Mostrar la nueva hora
        let hora = String(actual.getHours()).padStart(2, "0");
        let minutos = String(actual.getMinutes()).padStart(2, "0");
        let horaFinal = hora + ":" + minutos;
        
        return cy.get('.gh-date-time-picker-time ').first().clear().type(horaFinal);
    }

    static featurePost() {
        return cy.get('[data-test-button="feature"]').first().click({ force: true });
    }

    static validateFeaturePost() {
        return cy.get('.gh-featured-post').first().should('be.visible');
    }

    static clickChangeAccess() {
        return cy.get('[data-test-button="change-access"]').first().click({ force: true });
    }

    static changeAccess() {
        return cy.get('[data-test-select="post-visibility"]').select('Members only');
    }

    static saveChangeAccess() {
        return cy.get('[data-test-button="confirm"]').first().click({ force: true });
    }

    static validateChangeAccess() {
        return cy.get('[data-test-text="notification-content"]').first().should('be.visible');
    }
}