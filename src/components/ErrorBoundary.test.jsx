import { mount, shallow } from 'enzyme'
import PropTypes from 'prop-types'
import React from 'react'
import { ErrorBoundary } from './ErrorBoundary'

describe('ErrorBoundary component', () => {
    class Child extends React.Component {
        render() {
            if (this.props.fail) {
                throw new Error('failing')
            }
            return <div>Sun is shining</div>
        }
    }
    Child.propTypes = {
        fail: PropTypes.bool
    }

    test('renders without crashing', () => {
        expect(
            shallow(
                <ErrorBoundary>
                    <Child fail={false} />
                </ErrorBoundary>
            ).length
        ).toBe(1)
    })

    test('mounts in a full DOM', () => {
        const w = mount(
            <ErrorBoundary>
                <Child fail={false} />
            </ErrorBoundary>
        )
        expect(w.text()).toBe('Sun is shining')
    })

    test('displays fallback page on error', () => {
        const w = mount(
            <ErrorBoundary>
                <Child fail={true} />
            </ErrorBoundary>
        )
        w.update()
        expect(w.state('error')).toBeTruthy()
        expect(w.find('Button').length).toBe(1)
    })
})
