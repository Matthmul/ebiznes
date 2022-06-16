describe('Shopping Card Empty', function () {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/')
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
    })

    it('Should be empty', function () {
        cy.get("#root > div > div > aside > div > div").should('have.text', 'Koszyk jest pusty');
    });

    it('Should have summary', function () {
        cy.get("#root > div > div > h2").should('have.text', 'Podsumowanie:');
    });

    it('Button should be disabled', function () {
        cy.get("#root > div > div > aside > div > a").should('have.length', 0)
    });
})

describe('Shopping Card', function () {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/');
        cy.get("#root > div > div > div:nth-child(1) > div > button").click();
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
    })

    it('Should not be empty', function () {
        cy.get("#root > div > div > aside > div > div").should('not.have.text', 'Koszyk jest pusty');
    });

    it('Button should not be disabled', function () {
        cy.get("#root > div > div > aside > div > a").should('have.length', 1)
    });

    it('Price should be correct', function () {
        cy.get("#root > div > div > aside > div > p")
            .should('have.text', 'Razem: 10 PLN')
    });

    it('Click "Przejdź do zamówienia" herf open page with payment form', function () {
        cy.get("#root > div > div > aside > div > a")
            .should('have.text', 'Przejdź do zamówienia')
            .should('have.attr', 'href').and('include', '/payment')

        cy.get("#root > div > div > aside > div > a").click()
    })
})