import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-styled-components'

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new Adapter() })

// increase jest timeout to avoid fake fails
// cf. https://jestjs.io/docs/en/troubleshooting
jest.setTimeout(10000)
