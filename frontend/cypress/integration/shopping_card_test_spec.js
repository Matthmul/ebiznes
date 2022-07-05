describe('Shopping Card Empty', function () {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/')
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
    })

    it('Should be empty', function () {
        cy.get(".tittle").eq(1).should('have.text', 'Koszyk jest pusty');
    });

    it('Should have summary', function () {
        cy.get(".tittle").first().should('have.text', 'Podsumowanie:');
    });

    it('Button should be disabled', function () {
        cy.get(".pay").should('have.length', 0)
    });
})

describe('Shopping Card', function () {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/');
        cy.get(".add-button").first().click();
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
    })

    it('Should not be empty', function () {
        cy.get(".tittle").eq(1).should('not.have.text', 'Koszyk jest pusty');
    });

    it('Button should not be disabled', function () {
        cy.get(".pay").should('have.length', 1)
    });

    it('Price should be correct', function () {
        cy.get(".summary").eq(1)
            .should('have.text', 'Razem: 10 PLN')
    });

    it('Click "Przejdź do płatności" herf open page with payment form', function () {
        cy.get(".pay")
            .should('have.text', 'Przejdź do płatności')

        cy.get(".pay").click()
    })
})