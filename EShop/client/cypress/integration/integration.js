describe("renders homepage", () => {

    const uniqueSeed = Date.now().toString();

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('session')
    })

    before("renders", () => {
        cy.wait(1000)
        cy.visit("/")
        cy.wait(2000)
        cy.get('.text-center').should("exist")
    });

    before('Login', () => {
        cy.wait(1000)
        cy.get(':nth-child(1) > .nav-link').click()
        cy.wait(1000)
        cy.get(':nth-child(2) > .form-control').type(uniqueSeed+'@cypress.com')
        cy.get(':nth-child(3) > .form-control').type('1111111111')
        cy.wait(1000)
        cy.get('.btn').click()
        cy.wait(2000)
        cy.get(':nth-child(3) > .nav-link').should("exist")
        cy.wait(1000)
    })

    it('Add Footwear', ()=>{
        cy.get(':nth-child(1) > .nav-link').click()
        cy.wait(2000)
        cy.get(':nth-child(1) > .form-control').type('Cypress')
        cy.wait(1000)
        cy.get(':nth-child(2) > .form-control').type('111')
        cy.wait(2000)
        cy.get('.btn').click()
        cy.wait(1000)
    })

    it('Purchase', ()=>{
        cy.get('.card-title').contains('Cypress').parent('.card-body').contains('View').click()
        cy.wait(2000)
        cy.get('.btn').click()
        cy.wait(2000)
        cy.get('span').should("exist")
        cy.get('.card-title').contains('Cypress').should("exist")
        cy.wait(2000)
    })

    it('Check Err', () => {
        cy.get('.navbar').contains('Sign Out').click()
        cy.wait(2000)
        cy.get('.btn').contains('View').click()
        cy.wait(2000)
        cy.get('.btn').contains('Purchase').click()
        cy.wait(1000)
        cy.get('.alert').contains('Unauthorized').should("exist")
        cy.wait(4000)
        cy.get('.navbar-brand').click()
    })
});