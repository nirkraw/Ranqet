package com.rankerapp.transport.model;

import java.util.List;

public class RankingResponse {

    private final String title;

    private final String description;

    private final List<RankedOption> ranking;

    private final User completedBy;

    private RankingResponse(Builder builder) {
        this.title = builder.title;
        this.description = builder.description;
        this.ranking = builder.ranking;
        this.completedBy = builder.completedBy;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<RankedOption> getRanking() {
        return ranking;
    }

    public User getCompletedBy() {
        return completedBy;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private String title;

        private String description;

        private List<RankedOption> ranking;

        private User completedBy;

        private Builder() {

        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder ranking(List<RankedOption> ranking) {
            this.ranking = ranking;
            return this;
        }

        public Builder completedBy(User completedBy) {
            this.completedBy = completedBy;
            return this;
        }

        public RankingResponse build() {
            return new RankingResponse(this);
        }

    }
}
