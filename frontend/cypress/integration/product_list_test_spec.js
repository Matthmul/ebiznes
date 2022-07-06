describe('Product List', function () {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/')
    })

    it('Should be visible', function () {
        cy.get('.products').should('have.length', 1);
    });

    it('Product should contain name, price add button', function () {
        cy.get('.description').first().should('have.length', 1);
        cy.get('.price').first().should('have.length', 1);
        cy.get('.button').first().should('have.length', 1);
    })

    it('Should contain 5 elements', function () {
        cy.get('.product').should('have.length', 5);
    })

    describe('Click Add Button', function () {
        it('Should add element to Shopping Card', function () {
            cy.get(".add-button").first().click();

            cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
            cy.get('.cart').should('have.length', 1);
            cy.get(".col-left").first()
                .should('have.text', 'Chińska Zupka');
            cy.get(".single-item-bottom")
                .should('have.text', "1 x 10 PLN");
            cy.get(".summary").eq(1)
                .should('have.text', "Razem: 10 PLN");
        })

        describe('Double click Add Button', function () {
            it('Should add two element to Shopping Card', function () {
                cy.get(".add-button").first().click();
                cy.get(".add-button").first().click();

                cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
                cy.get('.cart').should('have.length', 1);
                cy.get(".col-left").first()
                    .should('have.text', 'Chińska Zupka');
                cy.get(".single-item-bottom")
                    .should('have.text', "2 x 10 PLN");
                cy.get(".summary").eq(1)
                    .should('have.text', "Razem: 20 PLN");
            })
        })
    })
})