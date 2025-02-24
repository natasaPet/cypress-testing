export default class OnboardingPage {

    verifyOnboardingDialog(stepTitle) {
        cy.getBySel('user-onboarding-dialog-title')
            .should('be.visible')
            .and('contain.text', stepTitle)
    }

    clickNext() {
        cy.getBySel('user-onboarding-next')
        .should('be.visible')
        .click()
    }

    createBankAccount(bankName,routingNumber, accountNumber) {
        this.verifyOnboardingDialog('Create Bank Account')
        cy.getBySelLike('bankName-input').type(bankName)
        cy.getBySelLike('routingNumber-input').type(routingNumber)
        cy.getBySelLike('accountNumber-input').type(accountNumber)
        cy.getBySel('bankaccount-submit').click()
    }

    finishOnboarding() {
        this.verifyOnboardingDialog('Finished');
        cy.getBySel('user-onboarding-next')
        .should('be.visible')
        .and('contain.text', 'Done')
        .click()
    }

    fullOnboardingFlow(bankName,routingNumber, accountNumber) {
        this.verifyOnboardingDialog('Get Started with Real World App');
        this.clickNext();
        this.createBankAccount(bankName,routingNumber, accountNumber)
        this.finishOnboarding();
    }
}