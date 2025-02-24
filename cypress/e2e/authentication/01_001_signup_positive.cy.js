/// <reference types="cypress" />

import SignupPage from "../../pages/signupPage";
const signupPage = new SignupPage();

describe('Signup page', () => {
    it('verifies that a user is able to successfully signup', () => {
        const randomUsername = 'NatashaTest' + Math.floor(Math.random() * 10000);

        cy.intercept('POST', '/users').as('signup');

        signupPage.visit();
        signupPage.fillFirstName('Natasha');
        signupPage.fillLastName('Test1');
        signupPage.fillUsername(randomUsername);
        signupPage.fillPassword('P@ssw0rd!');
        signupPage.fillConfirmPassword('P@ssw0rd!');
        signupPage.clickSignupButton();

        // Wait for signup request before asserting redirection to avoid flakiness
        cy.wait('@signup').then((interception) => {
            expect(interception.response.statusCode).to.equal(201);
            const { user } = interception.response.body;

            expect(user).to.have.property('id').and.to.be.a('string');
            expect(user).to.have.property('uuid').and.to.be.a('string');
            expect(user).to.have.property('firstName', 'Natasha');
            expect(user).to.have.property('lastName', 'Test1');
            expect(user).to.have.property('username', randomUsername);
            expect(user).to.have.property('balance', 0);
            expect(user).to.have.property('createdAt').and.to.be.a('string');
            expect(user).to.have.property('modifiedAt').and.to.be.a('string');
        });

        // Confirm redirection happens after signup completion
        cy.location('pathname').should('eq', '/signin');
    });
});
