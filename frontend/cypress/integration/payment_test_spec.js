describe('Payment', function() {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/');
        cy.wait(5000);
        cy.get(".add-button").first().click();
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
        cy.get(".pay").click();
        cy.get(".button").click();
        cy.get('input[name="street"]').type('Adama Mickiewicza');
        cy.get('input[name="houseNumber"]').type('1234');
        cy.get('input[name="postalCode"]').type('33333');
        cy.get('input[name="city"]').type('Adamowo');
        cy.get('.submitButton').click();
    });

    it('Should have tittle', function() {
        cy.get(".tittle").should('have.text', 'Proszę wypełnić poniższe dane');
    });

    it('Should have text', function() {
        cy.get(".summary").should('have.text', 'Do zapłaty: 10 PLN');
    });

    it('Should have pay button', function() {
        cy.get(".payment").eq(1).should('have.text', 'Zapłać');
    });

    it('Form should contain 1 inputs', function() {
        cy.get('input').should('have.length', 1)
    });
})