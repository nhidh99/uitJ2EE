const { CLEAR_IMAGES, SET_IMAGES } = require("../actions");

const initState = {
    deleteIds: [],
    uploads: [],
};

const imageReducer = (state = [], action) => {
    switch (action.type) {
        case CLEAR_IMAGES:
            state = initState;
            break;
        case SET_IMAGES:
            state = action.payload;
            break;
        default:
            break;
    }
    return state;
};

export default imageReducer;
