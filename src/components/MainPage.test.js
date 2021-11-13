import { shallow } from 'enzyme';
import React from 'react'
import MainPage from './MainPage'

let wrapper;
beforeEach(() => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: false,
    }
    wrapper = shallow(<MainPage {...mockProps}/>)
})

it('renders MainPage without crashing', () => {
    expect(wrapper).toMatchSnapshot();
})

it('filter robots correctly', () => {
    const mockProps2 = {
        onRequestRobots: jest.fn(),
        robots: [{
            id: 3,
            name: 'John',
            isPending: false,
        }],
        searchField: 'john',
        isPending: false,
    }
    let wrapper2 = shallow(<MainPage {...mockProps2} />);
    expect(wrapper2.instance().filterRobots()).toEqual([
        {
            id: 3,
            name: 'John',
            isPending: false,
        }
    ]);
})

it('filter robots correctly 2', () => {
    const mockProps3 = {
        onRequestRobots: jest.fn(),
        robots: [{
            id: 3,
            name: 'John',
            isPending: false,
        }],
        searchField: 'a',
        isPending: false,
    }
    const filteredRobots = [];
    let wrapper2 = shallow(<MainPage {...mockProps3} />);
    expect(wrapper2.instance().filterRobots()).toEqual(filteredRobots);
})