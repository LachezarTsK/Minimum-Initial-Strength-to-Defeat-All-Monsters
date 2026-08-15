
class Solution {

    fun minInitialStrength(monsters: IntArray, boosts: Array<IntArray>): Long {
        // Alternatively: Arrays.stream(monsters).asLongStream().sum() defined in java.util
        var sumMonstersStrengthFomStart: Long = 0
        for (strength in monsters) {
            sumMonstersStrengthFomStart += strength
        }

        var prefixSumBoosts: LongArray = createPrefixSumBoosts(boosts, monsters.size)

        return findMinInitialStrengthToDefeatAllMonsters(monsters, prefixSumBoosts, sumMonstersStrengthFomStart)
    }

    private fun createPrefixSumBoosts(boosts: Array<IntArray>, totalMonsters: Int): LongArray {
        val prefixSumBoosts = LongArray(totalMonsters)

        for ((from, to, boost) in boosts) {
            prefixSumBoosts[from] += boost.toLong()
            if (to + 1 < totalMonsters) {
                prefixSumBoosts[to + 1] -= boost.toLong()
            }
        }

        for (i in 1..<totalMonsters) {
            prefixSumBoosts[i] += prefixSumBoosts[i - 1]
        }

        return prefixSumBoosts
    }

    private fun findMinInitialStrengthToDefeatAllMonsters(monsters: IntArray, prefixSumBoosts: LongArray, sumMonstersStrengthFomStart: Long): Long {
        var minInitialStrengthToDefeatAllMonsters: Long = 0
        var sumMonstersStrengthFomStart = sumMonstersStrengthFomStart
        for (i in monsters.size - 1 downTo (0)) {
            if (prefixSumBoosts[i] < monsters[i]) {
                minInitialStrengthToDefeatAllMonsters = sumMonstersStrengthFomStart - prefixSumBoosts[i]
                break
            }
            sumMonstersStrengthFomStart -= monsters[i].toLong()
        }
        return minInitialStrengthToDefeatAllMonsters
    }
}
