describe('Checking QA job offers in Sii career site', () => {
    const params = require('../fixtures/params.json');

    params.forEach((test) => {
        it('Looking for QA job offers in Sii '+test.name, () => {
            cy.visit('https://sii.pl/')

            cy.get('#sii-m-nav-menu__item--20392')
                .click()

            cy.get('#js-main-menu-20392').children().contains('Oferty pracy').click()

            cy.get('[placeholder="Zacznij wpisywać..."].sii-m-btn-drop-down__mainInput').type('qa')

            // cy.get('.sii-m-btn-drop-down__button__main').first().click()
            cy.get('.sii-m-btn-drop-down__button__main').contains('LOKALIZACJA').click()
            cy.get('[data-tagid="'+test.city+'"]')
                .find('[type="checkbox"]')
                .check()
            cy.get('[aria-label="Szukaj"]').click()

            cy.intercept({
                method: 'GET',
                url: '/wp-admin/**',
            }).as('dataGetFirst');

            cy.wait('@dataGetFirst')

            cy.get('.js-ajax-load-number')
                .invoke('text')
                .then((textToSplit) => {
                    var numberOfOffers = textToSplit.split(': ')[1]
                    return numberOfOffers
                })
                .then(parseInt)
                .should('be.a', 'number')
                .and('be.greaterThan', 0)
        })
    });
})