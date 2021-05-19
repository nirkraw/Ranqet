package com.rankerapp.core;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The way we generate matchups for Ranqet is by hardcoding all of the possible matchup pairs for each size of list
 * This is definitely not scalable, but worked for our narrow use case.
 * We'd need to consider a more scalable solution if we want to increase this 8 option limit on our lists.
 */
class MatchupGenerator {

    static final Map<Integer, List<String>> MATCHUP_ORIENTATIONS = createMatchups();

    private MatchupGenerator() {
    }

    private static Map<Integer, List<String>> createMatchups() {
        Map<Integer, List<String>> matchups = new HashMap<>();
        matchups.put(2, Arrays.asList("1,2"));
        matchups.put(3, Arrays.asList("1,2", "1,3", "2,3"));
        matchups.put(4, Arrays.asList("1,2", "1,3", "1,4", "2,3", "2,4", "3,4"));
        matchups.put(5, Arrays.asList("1,2", "1,3", "1,4", "1,5", "2,3", "2,4", "2,5", "3,4", "3,5", "4,5"));
        matchups.put(6, Arrays.asList("1,2", "1,3", "1,4", "1,5", "1,6", "2,3", "2,4", "2,5", "2,6", "3,4", "3,5", "3,6", "4,5", "4,6", "5,6"));
        matchups.put(7, Arrays.asList("1,2", "1,3", "1,4", "1,5", "1,6", "1,7", "2,3", "2,4", "2,5", "2,6", "2,7", "3,4", "3,5", "3,6", "3,7", "4,5", "4,6", "4,7", "5,6", "5,7", "6,7"));
        matchups.put(8, Arrays.asList("1,2", "1,3", "1,4", "1,5", "1,6", "1,7", "1,8", "2,3", "2,4", "2,5", "2,6", "2,7", "2,8", "3,4", "3,5", "3,6", "3,7", "3,8", "4,5", "4,6", "4,7", "4,8", "5,6", "5,7", "5,8", "6,7", "6,8", "7,8"));
        return matchups;
    }
}
