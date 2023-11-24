describe('Energy Optimizer app', () => {
  
  it('welcome page can be opened', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Welcome to Energy Optimizer demonstrator')
  })

  it('demo page can be opened', () => {
    cy.visit('')
    cy.contains('Start').click()
    cy.contains('Information')
    cy.contains('Components')
  })

  it('unknown address redirects to not found page', () => {
    cy.visit('/nonexistent')
    cy.contains('Page not found')
  })
  
  describe('when demo page is opened', () => {
    beforeEach(() => {
      cy.visit('')
      cy.contains('Start').click()
    })
    
    it('information can be opened', () => {
      cy.contains('Information').click()
      cy.contains('Instructions for use')
    })
    
    it('components can be opened', () => {
      cy.contains('Components').click()
      cy.contains('Electric board')
    })
    
    it('user can return to welcome page', () => {
      cy.contains('Back').click()
      cy.contains('Welcome to Energy Optimizer demonstrator')
    })
    
    it('user can pause and continue demo', () => {
      cy.contains('Pause').click()
      cy.get('#pause').should('have.text', 'Continue')
      cy.get('#demotimebox').invoke('text').then((time) => {
        cy.wait(1000)
        cy.get('#demotimebox').should('have.text', time)
        cy.contains('Continue').click()
        cy.wait(1000)
        cy.get('#demotimebox').should('not.have.text', time)
      })
    })
    
    it('user can restart demo', () => {
      cy.wait(1000)
      cy.contains('Pause').click()
      cy.get('#demotimebox').invoke('text').then((time) => {
        cy.contains('Restart').click()
        cy.get('#demotimebox').should('not.have.text', time)
      })
    })
    
    it('user can change demo speed and changes are saved', () => {
      cy.get('[data-testid=speed]').click()
      cy.contains('30 min / sec').click()
      cy.get('[data-testid=speed]').should('contain', '30 min / sec')
      cy.get('#electric-car-1').click()
      cy.contains('Electric car 1')
      cy.contains('Back').click()
      cy.get('[data-testid=speed]').should('contain', '30 min / sec')
    })
    
    it('user can change time range and changes are saved', () => {
      cy.get('[data-testid=time_range]').click()
      cy.contains('Last 24 h').click()
      cy.get('[data-testid=time_range]').should('contain', 'Last 24 h')
      cy.get('#electric-car-2').click()
      cy.contains('Electric car 2')
      cy.contains('Back').click()
      cy.get('[data-testid=time_range]').should('contain', 'Last 24 h')
    })
    
    it('user can view component info', () => {
      cy.get('#heat-pump').trigger('mouseover')
      cy.contains('Heat pump (Energy consumer)')
      cy.contains('Click the component for more info')
    })
    
    it('user can open and view consumer component page', () => {
      cy.get('#heat-pump').click()
      cy.contains('Heat pump')
      cy.contains('Heat pump is used to adjust the temperature inside the house.')
      cy.contains('Total consumption')
      cy.contains('Total price for consumed energy')
      cy.contains('Total price with optimized consumption')
      cy.contains('Savings made with optimization')
      cy.get('#heat-pump').should('be.visible')
      cy.get('svg').should('exist')
    })
    
    it('user can open and view producer component page', () => {
      cy.get('#solar-panel-1').click()
      cy.contains('Solar panel 1')
      cy.contains('Solar panels turn sunlight into energy.')
      cy.contains('Total production')
      cy.get('#solar-panel-1').should('be.visible')
      cy.get('svg').should('exist')
    })

    it('user can view electricity cost graph', () => {
      cy.get('.MuiLineElement-root').should('exist')
      cy.get('.MuiAreaElement-root').should('exist')
    })

    it('user can modify components from the menu', () => {
      cy.contains('Components').click()

      const checkboxes = [
        'heatPumpCheckbox',
        'electricBoardCheckbox',
        'freezerCheckbox',
        'heaterCheckbox',
        'hotWaterHeaterCheckbox',
        'stoveCheckbox',
        'washingMachineCheckbox',
        'electricCar1Checkbox',
        'electricCar2Checkbox',
        'solarPanel1Checkbox',
        'solarPanel2Checkbox',
        'solarPanel3Checkbox',
        'solarPanel4Checkbox',
        'jacuzziCheckbox'
      ]

      checkboxes.forEach(id => {
        cy.get(`#${id}`).should('be.visible')
      })
      cy.get('#selectAll').should('be.visible')
      cy.get('#clearAll').should('be.visible')

      cy.get('#heat-pump').should('be.visible')
      cy.get('#heat-pump-energy').should('be.visible')
      cy.get('#heatPumpCheckbox').click()
      cy.get('#heatPumpCheckbox').should('not.be.checked')
      cy.get('#heat-pump').should('not.exist')
      cy.get('#heat-pump-energy').should('not.exist')
      
      cy.get('#clearAll').click()
      checkboxes.forEach(id => {
        cy.get(`#${id}`).should('not.be.checked')
      })

      cy.get('#selectAll').click()
      checkboxes.forEach(id => {
        cy.get(`#${id}`).should('be.checked')
      })
    })
  })
})