import * as actions from './actions'
import { 
	CHANGE_SEARCH_FIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
 } from './constants.js' ;

 import configureMockStore from 'redux-mock-store';
 import thunkMiddleware from 'redux-thunk'
const nock = require('nock');

const mockStore = configureMockStore([thunkMiddleware])

it('should create an action to search robots', () => {
    const text = 'wooo';
    const expectedAction = {
        type: CHANGE_SEARCH_FIELD,
        payload: text
    }
    expect(actions.setSearchField(text)).toEqual(expectedAction);
})

it('handles requesting robots API', done => {
    const store = mockStore();
    const mockPayload = [
        {
        "name": "Leanne Graham",
        "email": "Sincere@april.biz"
        }
    ]
    nock('https://jsonplaceholder.typicode.com')
        .get('/users')
        .reply(
            200,
            mockPayload,
            {'Access-Control-Allow-Origin': '*'}
        );
    store.dispatch(actions.requestRobots()).then(() => {
        const finalActions = store.getActions();
        expect(finalActions[1]).toEqual({
            type: REQUEST_ROBOTS_SUCCESS,
            payload: mockPayload
        })
        done();
    });
    const action = store.getActions();
    const expectedAction = {
        type: REQUEST_ROBOTS_PENDING
    }
    expect(action[0]).toEqual(expectedAction)
})

it('handles failed robots API', done => {
    const store = mockStore();
    nock('https://jsonplaceholder.typicode.com')
        .get('/users')
        .replyWithError({
            message: 'Something went wrong',
            code: 'ECONNREFUSED'
        });
    store.dispatch(actions.requestRobots()).then(() => {
        const finalActions = store.getActions();
        expect(finalActions[1]).toEqual({
            type: REQUEST_ROBOTS_FAILED,
            payload: 'Network request failed'
        })
        done();
    });
    const action = store.getActions();
    const expectedAction = {
        type: REQUEST_ROBOTS_PENDING
    }
    expect(action[0]).toEqual(expectedAction)
})