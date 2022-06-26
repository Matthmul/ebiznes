describe('Payment', function() {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/');
        cy.get("#root > div > div > div:nth-child(1) > div > button").click();
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
        cy.get("#root > div > div > aside > div > a").click();
    });

    it('Should have text', function() {
        cy.get("#root > form > h2").should('have.text', 'Do zapłaty');
    });

    // it('Should have send button', function() {
    //     cy.get("#root > form > div.buttons > button:nth-child(1)").should('have.text', 'Wyślij');
    // });

    it('Form should contain 4 inputs', function() {
        cy.get('input').should('have.length', 4)
    });

    it('User can type values in form', function() {
        cy.get('.InputElement').eq(0).type('1234123412232233').should('have.value', '1234 1234 1223 2233');
        cy.get('.InputElement').eq(1).type('0222').should('have.value', '02/22');
        cy.get('.InputElement').eq(2).type('123').should('have.value', '123');
        cy.get('.InputElement').eq(2).type('12345').should('have.value', '12345');
    });

    it('Valid Form should show congratulation message', function() {
        cy.get('.InputElement').eq(0).type('1234123412232233').should('have.value', '1234 1234 1223 2233');
        cy.get('.InputElement').eq(1).type('0222').should('have.value', '02/22');
        cy.get('.InputElement').eq(2).type('123').should('have.value', '123');
        cy.get('.InputElement').eq(3).type('12345').should('have.value', '12345');

        cy.get("#root > div > form > button").click()

        cy.get('.container').should('contain.text', 'Złożno zamówienie:')
    });
})