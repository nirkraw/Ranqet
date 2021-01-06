package com.rankerapp.transport.model;

import java.util.Objects;

public class OptionPairResponse {

    private final boolean isCompleted;

    private final Option first;

    private final Option second;

    private OptionPairResponse(Builder builder) {
        this.isCompleted = !Objects.nonNull(builder.first) && !Objects.nonNull(builder.second);
        this.first = builder.first;
        this.second = builder.second;
    }

    public boolean getIsCompleted() {
        return isCompleted;
    }

    public Option getFirst() {
        return first;
    }

    public Option getSecond() {
        return second;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static final class Builder {

        private Option first;

        private Option second;

        public Builder first(Option first) {
            this.first = first;
            return this;
        }

        public Builder second(Option second) {
            this.second = second;
            return this;
        }

        public OptionPairResponse build() {
            return new OptionPairResponse(this);
        }

    }
}
