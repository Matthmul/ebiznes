describe('Payment', function() {
    beforeEach(() => {
        cy.visit('https://the-shop.azurewebsites.net/');
        cy.get(".add-button").first().click();
        cy.get("#root > nav > div > ul > li:nth-child(3) > a").click();
        cy.get(".pay").click()
        cy.get(".button").click()
        cy.get('input[name="street"]').type('Adama Mickiewicza')
        cy.get('input[name="number"]').type('1234')
        cy.get('input[name="postalCode"]').type('33333')
        cy.get('.submitButton "]').click()
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

    // it('User can type values in form', function() {
    //     cy.get('#card-element').within(() => {
    //         cy.fillElementsInput('cardNumber', '4242424242424242');
    //         cy.fillElementsInput('cardExpiry', '1034'); // MMYY
    //         cy.fillElementsInput('cardCvc', '123');
    //         cy.fillElementsInput('postalCode', '90210');
    //       });

    //     cy.get('input').eq(0).should('have.value', '4242 4242 4242 4242');
    //     cy.get('input').eq(1).should('have.value', '10/34');
    //     cy.get('input').eq(2).should('have.value', '123');
    //     cy.get('input').eq(3).should('have.value', '90210');
    // });

    // it('Valid Form should show congratulation message', function() {
    //     cy.get('#card-element').within(() => {
    //         cy.fillElementsInput('cardNumber', '4242424242424242');
    //         cy.fillElementsInput('cardExpiry', '1034'); // MMYY
    //         cy.fillElementsInput('cardCvc', '123');
    //         cy.fillElementsInput('postalCode', '90210');
    //       });

    //     cy.get(".payment").eq(1).click()

    //     cy.get('.tittle').should('contain.text', 'Złożno zamówienie:')
    // });
})