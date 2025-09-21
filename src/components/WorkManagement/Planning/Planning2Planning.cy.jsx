import React from 'react'
import Planning from './Planning2'

describe('<Planning />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Planning />)
  })
})