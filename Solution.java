
public class Solution {

    public long minInitialStrength(int[] monsters, int[][] boosts) {
        // Alternatively: Arrays.stream(monsters).asLongStream().sum()
        long sumMonstersStrengthFomStart = 0;
        for (int strength : monsters) {
            sumMonstersStrengthFomStart += strength;
        }

        long[] prefixSumBoosts = createPrefixSumBoosts(boosts, monsters.length);

        return findMinInitialStrengthToDefeatAllMonsters(monsters, prefixSumBoosts, sumMonstersStrengthFomStart);
    }

    private static long[] createPrefixSumBoosts(int[][] boosts, int totalMonsters) {
        long[] prefixSumBoosts = new long[totalMonsters];

        for (int i = 0; i < boosts.length; ++i) {
            int from = boosts[i][0];
            int to = boosts[i][1];
            int boost = boosts[i][2];
            prefixSumBoosts[from] += boost;
            if (to + 1 < totalMonsters) {
                prefixSumBoosts[to + 1] -= boost;
            }
        }

        for (int i = 1; i < totalMonsters; ++i) {
            prefixSumBoosts[i] += prefixSumBoosts[i - 1];
        }

        return prefixSumBoosts;
    }

    private static long findMinInitialStrengthToDefeatAllMonsters(int[] monsters, long[] prefixSumBoosts, long sumMonstersStrengthFomStart) {
        long minInitialStrengthToDefeatAllMonsters = 0;
        for (int i = monsters.length - 1; i >= 0; --i) {
            if (prefixSumBoosts[i] < monsters[i]) {
                minInitialStrengthToDefeatAllMonsters = sumMonstersStrengthFomStart - prefixSumBoosts[i];
                break;
            }
            sumMonstersStrengthFomStart -= monsters[i];
        }
        return minInitialStrengthToDefeatAllMonsters;
    }
}
