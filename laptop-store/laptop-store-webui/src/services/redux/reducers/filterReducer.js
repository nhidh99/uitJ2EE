import { TOGGLE_FILTER, CLOSE_FILTER } from "../actions";

const filterReducer = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_FILTER:
            state = !state;
            return state;

        case CLOSE_FILTER:
            state = false;
            return state;

        default:
            return state;
    }
};

export default filterReducer;
