export const toggleFilter = () => ({ type: TOGGLE_FILTER });
export const closeFilter = () => ({ type: CLOSE_FILTER });

export const toggleModal = () => ({ type: TOGGLE_MODAL });
export const buildModal = (modal) => ({ type: BUILD_MODAL, payload: modal });
export const buildErrorModal = () => ({ type: BUILD_ERROR_MODAL });

export const clearImages = () => ({ type: CLEAR_IMAGES });
export const setImages = (images) => ({ type: SET_IMAGES, payload: images });

export const setDefaultAddressId = (addressId) => ({
    type: SET_DEFAULT_ADDRESS_ID,
    payload: addressId,
});

export const TOGGLE_FILTER = "toggle_filter";
export const CLOSE_FILTER = "close_filter";

export const TOGGLE_MODAL = "toggle_modal";
export const BUILD_MODAL = "build_modal";
export const BUILD_ERROR_MODAL = "build_error_modal";

export const CLEAR_IMAGES = "clear_images";
export const SET_IMAGES = "set_images";

export const SET_DEFAULT_ADDRESS_ID = "set_default";
