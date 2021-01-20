package com.rankerapp.db.model;

public enum ListCategory {
    SPORTS("SPORTS"),
    MUSIC("MUSIC"),
    MOVIES_TV("MOVIES_TV"),
    FUN("FUN"),
    MISC("MISC"),
    POLITICS("POLITICS"),
    SOCIAL("SOCIAL"),
    BUSINESS("BUSINESS");

    private final String value;

    ListCategory(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }

    public com.rankerapp.transport.model.ListCategory toTransportModel() {
        return com.rankerapp.transport.model.ListCategory.valueOf(value);
    }
}
