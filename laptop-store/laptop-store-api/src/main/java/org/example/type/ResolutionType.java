package org.example.type;

public enum ResolutionType {
    CUSTOM,         // Custom Resolution
    HD,             // HD
    WXGA,           // WXGA
    WXGA_PLUS,      // WXGA+
    HD_PLUS,        // HD+
    FULL_HD,        // FULL HD
    QHD,            // 2K
    QHD_PLUS,       // 3K
    UHD;            // 4K

    @Override
    public String toString() {
        switch (this) {
            case WXGA_PLUS:
                return "WXGA+";
            case HD_PLUS:
                return "HD+";
            case FULL_HD:
                return "Full HD";
            case QHD:
                return "2K";
            case QHD_PLUS:
                return "3K";
            case UHD:
                return "4K";
            default:
                return this.name();
        }
    }
}