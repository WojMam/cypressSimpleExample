describe('Checking QA job offers in Sii career site', () => {
    it('Looking for QA job offers in Sii Bydgoszcz', () => {
        cy.visit('https://sii.pl/')

        cy.get('#sii-m-nav-menu__item--20392')
            .click()

        cy.get('#js-main-menu-20392').children().contains('Oferty pracy').click()

        cy.get('.sii-o-search-bar__form__input').type('qa')

        cy.get('.sii-m-btn-drop-down.-countries').click()
        cy.get('[data-tagid="bydgoszcz"]')
            .find('[type="checkbox"]')
            .check()
        cy.get('.sii-o-search-bar__form__button').click()

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

    it('Looking for QA job offers in Sii Toruń', () => {
        cy.visit('https://sii.pl/')

        cy.get('#sii-m-nav-menu__item--20392')
            .click()

        cy.get('#js-main-menu-20392').children().contains('Oferty pracy').click()

        cy.get('.sii-o-search-bar__form__input').type('qa')

        cy.get('.sii-m-btn-drop-down.-countries').click()
        cy.get('[data-tagid="torun"]')
            .find('[type="checkbox"]')
            .check()
        cy.get('.sii-o-search-bar__form__button').click()

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
})