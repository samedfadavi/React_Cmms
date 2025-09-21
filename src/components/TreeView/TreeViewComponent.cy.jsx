import React from 'react'
import TreeViewComponent from './TreeViewComponent'

describe('<TreeViewComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TreeViewComponent />)
  })
})