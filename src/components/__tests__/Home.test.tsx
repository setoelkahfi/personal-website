import React from 'react'
import { mountWithIntl } from './../../helpers/intl-enzyme-test-helper'
import Home from '../Home'

describe('<Home/>', () => {
    it('should render in English', () => {
        const wrapper = mountWithIntl(<Home firebase={null} />)
        const title = wrapper.find('h1').text()
        expect(title).toBe('Hello, my name is Seto Elkahfi')
    })
})