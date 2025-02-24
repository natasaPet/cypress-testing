/// <reference types="cypress" />

import SignupPage from "../../pages/signupPage";
import LoginPage from "../../pages/loginPage";
const signupPage = new SignupPage();
const loginPage = new LoginPage()

describe('Login page - negative tests', () => {

    const user = {
        firstName: 'Natasha',
        lastName: 'Test2',
        username: 'NatashaTest' + Math.floor(Math.random() * 10000),    // Dynamic username to avoid conflicts
        password: 'S3cret'
    }

    before(() => {
        // User is created once for all tests
        signupPage.signup(user.firstName, user.lastName, user.username, user.password, user.password);
    });

    it('verifies that a user cannot login with empty username and password', () => {
        cy.get('[data-test="signin-submit"]').click()
        cy.get('#username-helper-text').should('have.text', 'Username is required')
        cy.get('[data-test="signin-submit"]').should('be.disabled')
    });

    it('verifies that a user cannot login with incorrect username', () => {
        cy.intercept('POST', '/login').as('login');

        loginPage.login('WrongUserName', user.password)
        loginPage.errorMessage('Username or password is invalid')

        cy.wait('@login').then((interseption) => {
            expect(interseption.response.statusCode).to.equal(401);
        });
    });

    it('verifies that a user cannot login with incorrect password', () => {
        cy.intercept('POST', '/login').as('login');

        loginPage.login(user.username, 'WrongPassword')
        loginPage.errorMessage('Username or password is invalid')

        cy.wait('@login').then((interseption) => {
            expect(interseption.response.statusCode).to.equal(401);
        });
    });

});
