export default class HomePage {

    visit() {
        cy.visit('/signup')
    }

    fillFirstName(firstName) {
        cy.get('#firstName').type(firstName);
    }

    fillLastName(lastName) {
        cy.get('#lastName').type(lastName);
    }

    fillUsername(username) {
        cy.get('#username').type(username);
    }

    fillPassword(password) {
        cy.get('#password').type(password);
    }

    fillConfirmPassword(password) {
        cy.get('#confirmPassword').type(password);
    }

    clickSignupButton() {
        cy.get('[data-test="signup-submit"]').click();
    }

    signup(firstName, lastName, username, password) {
        this.visit()
        this.fillFirstName(firstName)
        this.fillLastName(lastName)
        this.fillUsername(username)
        this.fillPassword(password)
        this.fillConfirmPassword(password)
        this.clickSignupButton()
    }

}