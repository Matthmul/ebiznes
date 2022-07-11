describe('Payment', function() {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/');
        cy.wait(5000);
        cy.get(".add-button").first().click();
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
        cy.get(".pay").click()
        cy.get(".button").click()
    });

    it('Should have tittle', function() {
        cy.get(".tittle").should('have.text', 'Adres dostawy');
    });

    it('Should have form labels', function() {
        cy.get("label").eq(1).should('have.text', 'Ulica:');
        cy.get("label").eq(2).should('have.text', 'Numer domu/mieszkania:');
        cy.get("label").eq(3).should('have.text', 'Kod pocztowy:');
        cy.get("label").eq(4).should('have.text', 'Miasto:');
    });

    it('Should contain 4 inputs', function () {
        cy.get('input').should('have.length', 4);
    });

    it('Should contain 2 text inputs', function () {
        cy.get('input[type="text"]').should('have.length', 2);
    });

    it('Should contain 2 number inputs', function () {
        cy.get('input[type="number"]').should('have.length', 2);
    });

    it('Should be 1 button with text', function () {
        cy.get('.submitButton').should('have.length', 1);
        cy.get('.submitButton').should('have.text', 'Przejdź do płatności');
    });

    it('Form should check inputs', function() {
        cy.get('.submitButton').click();
        cy.get('.error').should('have.length', 4);
        cy.get('.error').eq(1).should('have.text', 'Wymagane');
        cy.get('.error').eq(2).should('have.text', 'Wymagane');
        cy.get('.error').eq(3).should('have.text', 'Wymagane');
        cy.get('.error').eq(4).should('have.text', 'Wymagane');    
    });

    it('During filling inputs errors should disappear', function() {
        cy.get('.submitButton').click();
        cy.get('.error').should('have.length', 4);
        cy.get('input[name="street"]').type('Adama Mickiewicza');
        cy.get('.error').should('have.length', 3);
        cy.get('input[name="houseNumber"]').type('1234');
        cy.get('.error').should('have.length', 2);
        cy.get('input[name="postalCode"]').type('33333');
        cy.get('.error').should('have.length', 1);
        cy.get('input[name="city"]').type('Adamowo');
        cy.get('.error').should('have.length', 0);
    });

    it('Form should go next page after filling inputs', function() {
        cy.get('input[name="street"]').type('Adama Mickiewicza');
        cy.get('input[name="houseNumber"]').type('1234');
        cy.get('input[name="postalCode"]').type('33333');
        cy.get('input[name="city"]').type('Adamowo');
        cy.get('.submitButton').click();
        cy.get('.tittle').should('have.text', 'Proszę wypełnić poniższe dane');
    });


})