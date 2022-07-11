describe('Navbar', function () {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/');
        cy.wait(5000);
    })

    it('Should be visible', function () {
        cy.get('.navigation').should('have.length', 1);
    });

    it('Should have appropriate title', function () {
        cy.get('.brand-name').should('have.text', 'The Shop')
    })

    it('Should have navigation menu', function () {
        cy.get('.navigation-menu').should('have.length', 1)
    })

    it('Should have home herf', function () {
        cy.get("#root > nav > div > ul > li:nth-child(1) > a")
            .should('have.attr', 'href').and('include', '/')
        cy.get("#root > nav > div > ul > li:nth-child(1) > a").click()

        cy.url().should('include', '/')
    })

    it('Should have home herf', function () {
        cy.get("#root > nav > div > ul > li:nth-child(2) > a")
            .should('have.attr', 'href').and('include', '/login')
        cy.get("#root > nav > div > ul > li:nth-child(2) > a").click()

        cy.url().should('include', '/login')
    })

    it('Should have home herf', function () {
        cy.get("#root > nav > div > ul > li:nth-child(3) > a")
            .should('have.attr', 'href').and('include', '/cart')
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click()

        cy.url().should('include', '/cart')
    })
})