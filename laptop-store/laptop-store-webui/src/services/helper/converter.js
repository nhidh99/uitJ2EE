export const convertCPUType = (type) => {
    switch (type) {
        case "INTEL_CORE_I3":
        case "INTEL_CORE_I5":
        case "INTEL_CORE_I7":
            return type.replace("INTEL_CORE_I", "Intel Core i");
        case "INTEL_CELERON":
            return "Intel Celeron";
        case "INTEL_PENTIUM":
            return "Intel Pentium";
        case "AMD":
            return "AMD";
        default:
            return null;
    }
};

export const convertResolutionType = (type) => {
    switch (type) {
        case "WXGA_PLUS":
            return "WXGA+";
        case "HD_PLUS":
            return "HD+";
        case "FULL_HD":
            return "Full HD";
        case "QHD":
            return "2K";
        case "QHD_PLUS":
            return "3K";
        case "UHD":
            return "4K";
        case "CUSTOM":
            return "Độ phân giải";
        default:
            return type;
    }
};

export const convertBrandType = (type) => {
    return type === "MSI" ? "MSI" : type.charAt(0) + type.slice(1).toLowerCase();
};

export const convertOrderStatus = (status) => {
    switch (status) {
        case "PENDING":
            return "Chờ xử lí";
        case "RECEIVED":
            return "Tiếp nhận";
        case "PACKAGED":
            return "Đóng gói";
        case "DELIVERING":
            return "Vận chuyển";
        case "DELIVERED":
            return "Đã giao";
        case "CANCELED":
            return "Hủy đơn";
        default:
            return null;
    }
};

export const convertToOrderStatus = (state) => {
    switch(state) {
        case "Chờ xử lí":
            return "PENDING";
        case "Đang đóng gói":
            return "PACKAGED";
        case "Đang vận chuyển":
            return "DELIVERING";
        case "Đã nhận hàng":
            return "DELIVERED";
        case "Bị hủy":
            return "CANCELED";
        default: 
            return "";
    }
}
