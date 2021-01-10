package com.rankerapp.core;

import com.rankerapp.db.model.OptionEntity;
import com.rankerapp.db.model.ScoreEntity;
import com.rankerapp.transport.model.Option;
import com.rankerapp.transport.model.RankedOption;

class OptionsFactory {

    static Option convertOption(OptionEntity option) {
        return Option.builder()
                .id(option.getId().toString())
                .title(option.getName())
                .photoUrl(option.getPhotoUrl())
                .build();
    }

    static RankedOption convertToRankedOption(ScoreEntity score) {
        return RankedOption.builder()
                .name(score.getOption().getName())
                .photoUrl(score.getOption().getPhotoUrl())
                .score(score.getScore())
                .build();
    }

    private OptionsFactory() {
        // private constructor to prevent instantiation
    }
}
