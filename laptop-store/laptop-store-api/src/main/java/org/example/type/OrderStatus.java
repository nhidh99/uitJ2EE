package org.example.type;

public enum OrderStatus {
    PENDING,
    RECEIVED,
    PACKAGED,
    DELIVERING,
    DELIVERED,
    CANCELED;

    public boolean isBeforePackaged() {
        return this.equals(PENDING) || this.equals(RECEIVED);
    }

    public boolean isPackaged() {
        switch (this) {
            case PACKAGED:
            case DELIVERED:
            case DELIVERING:
                return true;
            default:
                return false;
        }
    }

    public boolean isCanceled() {
        return this.equals(CANCELED);
    }
}