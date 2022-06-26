describe('Finalize order', function () {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/');
        cy.get("#root > div > div > div:nth-child(1) > div > button").click();
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
        cy.get("#root > div > div > aside > div > a").click();
        cy.get('.InputElement').eq(0).type('1234123412232233').should('have.value', '1234 1234 1223 2233');
        cy.get('.InputElement').eq(1).type('0222').should('have.value', '02/22');
        cy.get('.InputElement').eq(2).type('123').should('have.value', '123');
        cy.get('.InputElement').eq(3).type('12345').should('have.value', '12345');
        cy.get("#root > div > form > button").click()
    });

    it('Should have text', function () {
        cy.get('.container').should('contain.text', 'Złożno zamówienie:')
    });

    it('Should be summary', function () {
        cy.get("#root > div > div > div.single-item > div")
            .should('have.text', 'Chinska Zupka');
        cy.get("#root > div > div > div.text-bottom")
            .should('have.text', "1 x 10 PLN");
    })

    it('Click "Powrót na główną stronę" herf open page with home page', function () {
        cy.get("#root > div > a")
            .should('have.text', 'Powrót na główną stronę')
            .should('have.attr', 'href').and('include', '/')

        cy.get("#root > div > a").click()

    })
})