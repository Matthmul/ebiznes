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

    it('Should have send button', function() {
        cy.get("#root > form > div.buttons > button:nth-child(1)").should('have.text', 'Wyślij');
    });

    it('Should have reset button', function() {
        cy.get("#root > form > div.buttons > button:nth-child(2)").should('have.text', 'Reset');
    });

    it('Send button should be disabled', function() {
        cy.get("#root > form > div.buttons > button:nth-child(1)").should('be.disabled')

    });

    it('Reset button should be disabled', function() {
        cy.get("#root > form > div.buttons > button:nth-child(2)").should('be.disabled')
    });

    it('Form should contain 4 inputs', function() {
        cy.get('input').should('have.length', 4)
    });

    it('User can type values in form', function() {
        cy.get('input').eq(0).type('1234123412232233').should('have.value', '1234 1234 1223 2233');
        cy.get('input').eq(1).type('Test Name').should('have.value', 'Test Name');
        cy.get('input').eq(2).type('0222').should('have.value', '02/22');
        cy.get('input').eq(3).type('123').should('have.value', '123');
    });

    it('Form should be valid after providing data', function() {
        cy.get('input').eq(0).type('1234123412232233').should('have.value', '1234 1234 1223 2233');
        cy.get('input').eq(1).type('Test Name').should('have.value', 'Test Name');
        cy.get('input').eq(2).type('0222').should('have.value', '02/22');
        cy.get('input').eq(3).type('123').should('have.value', '123');

        cy.get("#root > form > div.buttons > button:nth-child(1)").should('not.be.disabled')
    });

    it('Valid Form should show congratulation message', function() {
        cy.get('input').eq(0).type('1234123412232233').should('have.value', '1234 1234 1223 2233');
        cy.get('input').eq(1).type('Test Name').should('have.value', 'Test Name');
        cy.get('input').eq(2).type('0222').should('have.value', '02/22');
        cy.get('input').eq(3).type('123').should('have.value', '123');

        cy.get("#root > form > div.buttons > button:nth-child(1)").should('not.be.disabled')
        cy.get("#root > form > div.buttons > button:nth-child(1)").click()

        cy.get('.container').should('contain.text', 'Złożno zamówienie:')
    });
})