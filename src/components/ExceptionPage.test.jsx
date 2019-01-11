import { mount, shallow } from 'enzyme'
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
        const wrapper = mount(<ExceptionPage type={401} />)
        expect(wrapper.find('h1').text()).toBe('401')
        expect(
            wrapper
                .children()
                .find('button')
                .prop('href')
        ).toBe('/')
    })

    test('Deactivated component mounts in a full DOM', () => {
        const wrapper = mount(<ExceptionPage type={403} />)
        expect(wrapper.find('h1').text()).toBe('403')
        expect(
            wrapper
                .children()
                .find('button')
                .prop('href')
        ).toBe('https://bigblue.co/contact')
    })

    test('NotFound component mounts in a full DOM', () => {
        const wrapper = mount(<ExceptionPage type={404} />)
        expect(wrapper.find('h1').text()).toBe('404')
        expect(
            wrapper
                .children()
                .find('button')
                .prop('href')
        ).toBe('/')
    })

    test('Internal component mounts in a full DOM', () => {
        const wrapper = mount(<ExceptionPage type={500} />)
        expect(wrapper.find('h1').text()).toBe('500')
        expect(
            wrapper
                .children()
                .find('button')
                .prop('href')
        ).toBe('/')
    })
})
