describe('Welcome', () => {
  it('welcome page can be opened', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Welcome to Energy Optimizer demonstrator')
  })
})