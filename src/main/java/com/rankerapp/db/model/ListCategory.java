package com.rankerapp.db.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ListCategory {
    SPORTS("SPORTS"),
    @Deprecated
    MUSIC("MUSIC"),
    MOVIES_TV("MOVIES_TV"),
    @Deprecated
    FUN("FUN"),
    MISC("MISC"),
    @Deprecated
    POLITICS("POLITICS"),
    SOCIAL("SOCIAL"),
    @Deprecated
    BUSINESS("BUSINESS");

    private final String value;

    @JsonCreator
    ListCategory(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }

    public com.rankerapp.transport.model.ListCategory toTransportModel() {
        try {
            return com.rankerapp.transport.model.ListCategory.valueOf(value);
        } catch (IllegalArgumentException e) {
            return com.rankerapp.transport.model.ListCategory.MISC;
        }
    }
}
