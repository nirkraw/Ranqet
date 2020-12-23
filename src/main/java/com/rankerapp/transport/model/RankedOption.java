package com.rankerapp.transport.model;

public class RankedOption {

    private final String name;

    private final double score;

    private final String photoUrl;

    private RankedOption(Builder builder) {
        this.name = builder.name;
        this.score = builder.score;
        this.photoUrl = builder.photoUrl;
    }

    public String getName() {
        return name;
    }

    public double getScore() {
        return score;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private String name;

        private double score;

        private String photoUrl;

        private Builder() {

        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder score(double score) {
            this.score = score;
            return this;
        }

        public Builder photoUrl(String photoUrl) {
            this.photoUrl = photoUrl;
            return this;
        }

        public RankedOption build() {
            return new RankedOption(this);
        }

    }
    
}
