import { mount, shallow } from 'enzyme'
import { createMemoryHistory } from 'history'
import * as React from 'react'
import { ExceptionPage } from './ExceptionPage'

describe('Testing ExceptionPage component', () => {
    test('Unauthorized component renders without crashing', () => {
        expect(shallow(<ExceptionPage type={401} />).length).toBe(1)
    })

    test('Deactivated component renders without crashing', () => {
        expect(shallow(<ExceptionPage type={403} />).length).toBe(1)
    })

    test('NotFound component renders without crashing', () => {
        expect(shallow(<ExceptionPage type={404} />).length).toBe(1)
    })

    test('Internal component renders without crashing', () => {
        expect(shallow(<ExceptionPage type={500} />).length).toBe(1)
    })

    test('Unauthorized component mounts in a full DOM', () => {
        const history = createMemoryHistory()
        const wrapper = mount(<ExceptionPage type={401} history={history} />)
        expect(wrapper.find('h4').text()).toBe('401')
        expect(
            wrapper
                .children()
                .find('button')
                .find('.bp3-button-text')
                .text()
        ).toBe('Home')
        wrapper.find('button').simulate('click')
        expect(history.location.pathname).toBe('/')
    })

    test('Deactivated component mounts in a full DOM', () => {
        const history = createMemoryHistory()
        const wrapper = mount(<ExceptionPage type={403} history={history} />)
        expect(wrapper.find('h4').text()).toBe('403')
        expect(
            wrapper
                .children()
                .find('button')
                .find('.bp3-button-text')
                .text()
        ).toBe('Contact Support')
        wrapper.find('button').simulate('click')
        expect(history.location.pathname).toBe('/contact')
    })

    test('NotFound component mounts in a full DOM', () => {
        const history = createMemoryHistory({
            initialEntries: ['/previous', '/']
        })
        const wrapper = mount(<ExceptionPage type={404} history={history} />)
        expect(wrapper.find('h4').text()).toBe('404')
        expect(
            wrapper
                .children()
                .find('button')
                .find('.bp3-button-text')
                .text()
        ).toBe('Go back')
        wrapper.find('button').simulate('click')
        expect(history.location.pathname).toBe('/previous')
    })

    test('Internal component mounts in a full DOM', () => {
        const history = createMemoryHistory()
        const wrapper = mount(<ExceptionPage type={500} history={history} />)
        expect(wrapper.find('h4').text()).toBe('500')
        expect(
            wrapper
                .children()
                .find('button')
                .find('.bp3-button-text')
                .text()
        ).toBe('Home')
        wrapper.find('button').simulate('click')
        expect(history.location.pathname).toBe('/')
    })
})
