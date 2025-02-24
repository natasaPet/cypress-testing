export default class LoginPage {
    visit() {
        cy.visit('/signin')
    }

    fillUsername(username) {
        cy.get('#username').type(username);
    }

    fillPassword(password) {
        cy.get('#password').type(password);
    }

    clickSigninButton() {
        cy.get('[data-test="signin-submit"]').click()
    }

    rememberMe(shouldRememberMe) {
        if (shouldRememberMe) {
            cy.get('[type="checkbox"]').not('[disabled]').check()
        }
    }

    login(username, password, shouldRememberMe) {
        this.visit()
        this.fillUsername(username)
        this.fillPassword(password)
        this.rememberMe(shouldRememberMe);
        this.clickSigninButton()
    }

    errorMessage(message) {
        cy.getBySel('signin-error')
            .should('be.visible')
            .contains(message)
    }

}