package com.rankerapp.transport.model;

import java.util.List;

public class RankingResponse {

    private final String title;

    private final String description;

    private final List<RankedOption> personalRanking;

    private final List<RankedOption> globalRanking;

    private final User completedBy;

    private RankingResponse(Builder builder) {
        this.title = builder.title;
        this.description = builder.description;
        this.personalRanking = builder.personalRanking;
        this.globalRanking = builder.globalRanking;
        this.completedBy = builder.completedBy;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<RankedOption> getPersonalRanking() {
        return personalRanking;
    }

    public List<RankedOption> getGlobalRanking() {
        return globalRanking;
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

        private List<RankedOption> personalRanking;

        private List<RankedOption> globalRanking;

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

        public Builder personalRanking(List<RankedOption> personalRanking) {
            this.personalRanking = personalRanking;
            return this;
        }

        public Builder globalRanking(List<RankedOption> globalRanking) {
            this.globalRanking = globalRanking;
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
