
package main

func minInitialStrength(monsters []int, boosts [][]int) int64 {
    var sumMonstersStrengthFomStart int64 = 0
    for _, strength := range monsters {
        sumMonstersStrengthFomStart += int64(strength)
    }

    var prefixSumBoosts []int64 = createPrefixSumBoosts(boosts, len(monsters))

    return findMinInitialStrengthToDefeatAllMonsters(monsters, prefixSumBoosts, sumMonstersStrengthFomStart)
}

func createPrefixSumBoosts(boosts [][]int, totalMonsters int) []int64 {
    prefixSumBoosts := make([]int64, totalMonsters)

    for i := range boosts {
        from := boosts[i][0]
        to := boosts[i][1]
        boost := boosts[i][2]
        prefixSumBoosts[from] += int64(boost)
        if to + 1 < totalMonsters {
            prefixSumBoosts[to+1] -= int64(boost)
        }
    }

    for i := 1; i < totalMonsters; i++ {
        prefixSumBoosts[i] += prefixSumBoosts[i - 1]
    }

    return prefixSumBoosts
}

func findMinInitialStrengthToDefeatAllMonsters(monsters []int, prefixSumBoosts []int64, sumMonstersStrengthFomStart int64) int64 {
    var minInitialStrengthToDefeatAllMonsters int64 = 0
    for i := len(monsters) - 1; i >= 0; i-- {
        if prefixSumBoosts[i] < int64(monsters[i]) {
            minInitialStrengthToDefeatAllMonsters = sumMonstersStrengthFomStart - prefixSumBoosts[i]
            break
        }
        sumMonstersStrengthFomStart -= int64(monsters[i])
    }
    return minInitialStrengthToDefeatAllMonsters
}
