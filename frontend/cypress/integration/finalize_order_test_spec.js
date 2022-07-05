describe('Finalize order', function () {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/');
        cy.get(".add-button").first().click();
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
        cy.get(".pay").click()
        cy.get('#card-element').within(() => {
            cy.fillElementsInput('cardNumber', '4242424242424242');
            cy.fillElementsInput('cardExpiry', '1034'); // MMYY
            cy.fillElementsInput('cardCvc', '123');
            cy.fillElementsInput('postalCode', '90210');
          });
        cy.get(".payment").eq(1).click()
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