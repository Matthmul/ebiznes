describe('Product List', function () {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/')
    })

    it('Should be visible', function () {
        cy.get('.container').should('have.length', 1);
    });

    it('Product should contain name, price add button', function () {
        cy.get("#root > div > div > div:nth-child(1) > h2").should('have.length', 1);
        cy.get("#root > div > div > div:nth-child(1) > p").should('have.length', 1);
        cy.get('.product-buttons').first().should('have.length', 1);
    })

    it('Should contain 2 elements', function () {
        cy.get('.products').should('have.length', 2);
    })

    describe('Click Add Button', function () {
        it('Should add element to Shopping Card', function () {
            cy.get("#root > div > div > div:nth-child(1) > div > button").click();

            cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
            cy.get('.basket').should('have.length', 1);
            cy.get("#root > div > div > aside > div > div > div.single-item > div.col-left")
                .should('have.text', 'Chinska Zupka');
            cy.get("#root > div > div > aside > div > div > div.text-bottom")
                .should('have.text', "1 x 10 PLN");
            cy.get("#root > div > div > aside > div > p")
                .should('have.text', "Razem: 10 PLN");
        })

        describe('Double click Add Button', function () {
            it('Should add two element to Shopping Card', function () {
                cy.get("#root > div > div > div:nth-child(1) > div > button").click();
                cy.get("#root > div > div > div:nth-child(1) > div > button").click();

                cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
                cy.get('.basket').should('have.length', 1);
                cy.get("#root > div > div > aside > div > div > div.single-item > div.col-left")
                    .should('have.text', 'Chinska Zupka');
                cy.get("#root > div > div > aside > div > div > div.text-bottom")
                    .should('have.text', "2 x 10 PLN");
                cy.get("#root > div > div > aside > div > p")
                    .should('have.text', "Razem: 20 PLN");
            })
        })
    })
})