import { TOGGLE_MODAL, BUILD_MODAL, BUILD_ERROR_MODAL } from "../actions";

const initState = {
    title: "",
    message: "",
    confirm: null,
    open: false,
};

const errorState = {
    title: "Có lỗi xảy ra",
    message: "Không thể xử lí yêu cầu",
    confirm: null,
    open: true,
};

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            state["open"] = !state["open"];
            break;

        case BUILD_MODAL:
            state = action.payload;
            state["open"] = true;
            break;

        case BUILD_ERROR_MODAL:
            state = errorState;
            state["open"] = true;
            break;

        default:
            break;
    }
    return state;
};

export default modalReducer;
