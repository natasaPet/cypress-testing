/// <reference types="cypress" />

import SignupPage from "../../pages/signupPage";
import LoginPage from "../../pages/loginPage";
const signupPage = new SignupPage();
const loginPage = new LoginPage()

describe('Login page - positive tests', () => {
    it('verifies that a user is able to successfully login', () => {
        const randomUsername = 'NatashaTest' + Math.floor(Math.random() * 10000);

        signupPage.signup('Natasha', 'Test2', randomUsername, 'P@ssw0rd', 'P@ssw0rd' )

        loginPage.fillUsername(randomUsername);
        loginPage.fillPassword('P@ssw0rd')
        loginPage.clickSigninButton();  
        
        cy.getBySel('user-onboarding-dialog-title')
        .should('be.visible')
        .and('contain.text', 'Get Started with Real World App')
    });
});
