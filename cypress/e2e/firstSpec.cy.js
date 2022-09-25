describe('Checking QA job offers in Sii career site', () => {
    it.skip('Looking for QA job offers in Sii Bydgoszcz', () => {
        cy.visit('https://sii.pl/')

        cy.get('#sii-m-nav-menu__item--20392')
            .click()

        // Możemy wyszukać tekst "Oferty Pracy" wewnątrz klasy ".sii-m-icons-menu__item__label",
        // ale będzie to zbyt ogólne zapytanie- otrzymamy w ten sposób ponad 100 wyników!
        // cy.get('.sii-m-icons-menu__item__label').contains('Oferty pracy').click({ force: true})

        // Lepszym rozwiązaniem będzie poszukać unikalnego elementu (używając jego ID)
        // który będzie "rodzicem" elementu przez nasz szukanego.
        cy.get('#js-main-menu-20392').children().contains('Oferty pracy').click()

        cy.get('[placeholder="Zacznij wpisywać..."].sii-m-btn-drop-down__mainInput').type('qa')

        // cy.get('.sii-m-btn-drop-down__button__main').first().click()
        cy.get('.sii-m-btn-drop-down__button__main').contains('LOKALIZACJA').click()
        cy.get('[data-tagid="bydgoszcz"]')
            .find('[type="checkbox"]')
            .check()
        cy.get('[aria-label="Szukaj"]').click()

        // Możemy poczekać okresloną ilość czasu (nie jest to zalecane)
        // cy.wait(2000)

        // Możemy też poczekać na konkretne zdarzenie/zmianę. Zaobserwowaliśmy, że zmiana, której oczekujemy
        // to otrzymanie odpowiedzi zapytania GET.
        // Możemy zatem zdefiniować interceptor, który będzie określał zapytanie, którego oczekujemy.
        cy.intercept({
            method: 'GET',
            url: '/wp-admin/**',
        }).as('dataGetFirst');

        // Sprawdzamy czy request się już zakończył
        cy.wait('@dataGetFirst')

        // Czekamy aż request się zakończy, a następnie sprawdzamy czy jego kod odpowiedzi wynosił "200"
        // cy.wait('@dataGetFirst').its('response.statusCode').should('equal', 200)

        // cy.get('.js-ajax-load-number')
        //     .invoke('text')
        //     .then((numberOfOffers) => {
        //         cy.log(numberOfOffers.split(': ')[1])
        //         var splitText = numberOfOffers.split(': ')[1]
        //         expect(splitText).to.be.greaterThan(0)
        //     })

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

    it.skip('Looking for QA job offers in Sii Bydgoszcz', () => {
        cy.visit('https://sii.pl/')

        cy.get('#sii-m-nav-menu__item--20392')
            .click()

        cy.get('#js-main-menu-20392').children().contains('Oferty pracy').click()

        cy.get('[placeholder="Zacznij wpisywać..."].sii-m-btn-drop-down__mainInput').type('qa')

        cy.get('.sii-m-btn-drop-down__button__main').contains('LOKALIZACJA').click()
        cy.get('[data-tagid="bydgoszcz"]')
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

    it.skip('Looking for QA job offers in Sii Toruń', () => {
        cy.visit('https://sii.pl/')

        cy.get('#sii-m-nav-menu__item--20392')
            .click()

        cy.get('#js-main-menu-20392').children().contains('Oferty pracy').click()

        cy.get('[placeholder="Zacznij wpisywać..."].sii-m-btn-drop-down__mainInput').type('qa')

        cy.get('.sii-m-btn-drop-down__button__main').contains('LOKALIZACJA').click()
        cy.get('[data-tagid="torun"]')
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
})