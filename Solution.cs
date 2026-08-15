
public class Solution
{
    public long MinInitialStrength(int[] monsters, int[][] boosts)
    {
        // Alternatively: monsters.Sum(x => (long)x)
        long sumMonstersStrengthFomStart = 0;
        foreach (int strength in monsters)
        {
            sumMonstersStrengthFomStart += strength;
        }

        long[] prefixSumBoosts = CreatePrefixSumBoosts(boosts, monsters.Length);

        return FindMinInitialStrengthToDefeatAllMonsters(monsters, prefixSumBoosts, sumMonstersStrengthFomStart);
    }

    private static long[] CreatePrefixSumBoosts(int[][] boosts, int totalMonsters)
    {
        long[] prefixSumBoosts = new long[totalMonsters];

        for (int i = 0; i < boosts.Length; ++i)
        {
            int from = boosts[i][0];
            int to = boosts[i][1];
            int boost = boosts[i][2];
            prefixSumBoosts[from] += boost;
            if (to + 1 < totalMonsters)
            {
                prefixSumBoosts[to + 1] -= boost;
            }
        }

        for (int i = 1; i < totalMonsters; ++i)
        {
            prefixSumBoosts[i] += prefixSumBoosts[i - 1];
        }

        return prefixSumBoosts;
    }

    private static long FindMinInitialStrengthToDefeatAllMonsters(int[] monsters, long[] prefixSumBoosts, long sumMonstersStrengthFomStart)
    {
        long minInitialStrengthToDefeatAllMonsters = 0;
        for (int i = monsters.Length - 1; i >= 0; --i)
        {
            if (prefixSumBoosts[i] < monsters[i])
            {
                minInitialStrengthToDefeatAllMonsters = sumMonstersStrengthFomStart - prefixSumBoosts[i];
                break;
            }
            sumMonstersStrengthFomStart -= monsters[i];
        }
        return minInitialStrengthToDefeatAllMonsters;
    }
}
