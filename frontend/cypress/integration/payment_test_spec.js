describe('Payment', function() {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/');
        cy.get(".add-button").first().click();
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
        cy.get(".pay").click()
    });

    it('Should have text', function() {
        cy.get(".summary").should('have.text', 'Do zapłaty: 10 PLN');
    });

    it('Should have pay button', function() {
        cy.get(".payment").should('have.text', 'Zapłać');
    });

    it('Form should contain 3 inputs', function() {
        cy.get('input').should('have.length', 3)
    });

    it('Form should contain 4 inputs after typing number', function() {
        cy.get('input').eq(0).type('4242424242424242').should('have.value', '4242 4242 4242 4242');
        cy.get('input').should('have.length', 4)
    });

    it('User can type values in form', function() {
        cy.get('input').eq(0).type('4242424242424242').should('have.value', '4242 4242 4242 4242');
        cy.get('input').eq(1).type('0222').should('have.value', '02/22');
        cy.get('input').eq(2).type('123').should('have.value', '123');
        cy.get('input').eq(2).type('12345').should('have.value', '12345');
    });

    it('Valid Form should show congratulation message', function() {
        cy.get('input').eq(0).type('4242424242424242').should('have.value', '4242 4242 4242 4242');
        cy.get('input').eq(1).type('0222').should('have.value', '02/22');
        cy.get('input').eq(2).type('123').should('have.value', '123');
        cy.get('input').eq(3).type('12345').should('have.value', '12345');

        cy.get(".payment").click()

        cy.get('.tittle').should('contain.text', 'Złożno zamówienie:')
    });
})