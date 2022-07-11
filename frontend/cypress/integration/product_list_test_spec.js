describe('Product List', function () {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/')
    })

    it('Should have tittle', function() {
        cy.get(".tittle").should('have.text', 'Dostępne produty do zakupu');
    });

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

    it('Should contain 3 normal price elements', function () {
        cy.get('.new-price').should('have.length', 3);
    })

    it('Should contain 2 sale elements', function () {
        cy.get('.new-price').should('have.length', 2);
        cy.get('.old-price').should('have.length', 2);
    })

    describe('Click Add Button', function () {
        it('Should add element to Shopping Card', function () {
            cy.get(".add-button").first().click();

            cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
            cy.get('.cart').should('have.length', 1);
            cy.get(".col-left").first()
                .should('have.text', 'Chińska zupka');
            cy.get(".single-item-bottom")
                .should('have.text', "1 x 10 PLN");
            cy.get(".summary").eq(1)
                .should('have.text', "Razem: 10 PLN");
        })
    })
    
    describe('Double click Add Button', function () {
        it('Should add two element to Shopping Card', function () {
            cy.get(".add-button").first().click();
            cy.get(".add-button").first().click();

            cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
            cy.get('.cart').should('have.length', 1);
            cy.get(".col-left").first()
                .should('have.text', 'Chińska zupka');
            cy.get(".single-item-bottom")
                .should('have.text', "2 x 10 PLN");
            cy.get(".summary").eq(1)
                .should('have.text', "Razem: 20 PLN");
        })
    })

    describe('Category choosing', function () {
        it('Should be 4 categories', function () {
            cy.get(".single-category").should('have.length', 4);
            cy.get(".single-category").eq(1).should('have.text', "Wszystko");
            cy.get(".single-category").eq(2).should('have.text', "Zupy");
            cy.get(".single-category").eq(3).should('have.text', "Dania");
            cy.get(".single-category").eq(4).should('have.text', "Napoje");
        })        
        
        it('Should on click show products in category "Wszystko"', function () {
            cy.get(".single-category").eq(1).click();
            cy.get('.description').eq(1).should('have.text','Chińska zupka');
        })   

        it('Should on click show products in category "Zupy"', function () {
            cy.get(".single-category").eq(2).click();
            cy.get('.description').eq(1).should('have.text','Chińska zupka');
        })   

        it('Should on click show products in category "Dania"', function () {
            cy.get(".single-category").eq(3).click();
            cy.get('.description').eq(1).should('have.text','Kimchi');
        })   

        it('Should on click show products in category "Napoje"', function () {
            cy.get(".single-category").eq(4).click();
            cy.get('.description').eq(1).should('have.text','Herbata jujuba');
        })

        it('Should on click show products in category "Wszystko" after clicking different categories', function () {
            cy.get(".single-category").eq(2).click();
            cy.get(".single-category").eq(4).click();
            cy.get(".single-category").eq(1).click();
            cy.get('.description').eq(1).should('have.text','Herbata jujuba');
        })
    })

})