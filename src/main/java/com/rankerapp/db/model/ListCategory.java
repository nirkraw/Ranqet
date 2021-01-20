package com.rankerapp.db.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

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
        return com.rankerapp.transport.model.ListCategory.valueOf(value);
    }
}
