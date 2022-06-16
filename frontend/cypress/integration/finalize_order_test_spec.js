describe('Finalize order', function () {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/');
        cy.get("#root > div > div > div:nth-child(1) > div > button").click();
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
        cy.get("#root > div > div > aside > div > a").click();
        cy.get('input').eq(0).type('1234123412232233');
        cy.get('input').eq(1).type('Test Name');
        cy.get('input').eq(2).type('0222');
        cy.get('input').eq(3).type('123');
        cy.get("#root > form > div.buttons > button:nth-child(1)").click()
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