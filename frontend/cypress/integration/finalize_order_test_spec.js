describe('Finalize order', function () {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/');
        cy.get(".add-button").first().click();
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
        cy.get(".pay").click()
        cy.get('input').eq(0).type('4242424242424242').should('have.value', '4242 4242 4242 4242');
        cy.get('input').eq(1).type('0222').should('have.value', '02/22');
        cy.get('input').eq(2).type('123').should('have.value', '123');
        cy.get('input').eq(3).type('12345').should('have.value', '12345');
        cy.get(".payment").click()
    });

    it('Should have text', function () {
        cy.get('.tittle').should('contain.text', 'Złożno zamówienie:')
    });

    it('Should be summary', function () {
        cy.get(".col")
            .should('have.text', 'Chinska Zupka x 1');
    })

    it('Click "Powrót na główną stronę" herf open page with home page', function () {
        cy.get(".back")
            .should('have.text', 'Powrót na główną stronę')
            .should('have.attr', 'href').and('include', '/')

            cy.get(".back")
    })
})