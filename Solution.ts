
function minInitialStrength(monsters: number[], boosts: number[][]): number {
    // Alternatively: monsters.reduce((sumStrength, strength) => sumStrength + strength)
    let sumMonstersStrengthFomStart = 0;
    for (let strength of monsters) {
        sumMonstersStrengthFomStart += strength;
    }

    const prefixSumBoosts = createPrefixSumBoosts(boosts, monsters.length);

    return findMinInitialStrengthToDefeatAllMonsters(monsters, prefixSumBoosts, sumMonstersStrengthFomStart);
};

function createPrefixSumBoosts(boosts: number[][], totalMonsters: number): number[] {
    const prefixSumBoosts = new Array(totalMonsters).fill(0);

    for (let [from, to, boost] of boosts) {
        prefixSumBoosts[from] += boost;
        if (to + 1 < totalMonsters) {
            prefixSumBoosts[to + 1] -= boost;
        }
    }

    for (let i = 1; i < totalMonsters; ++i) {
        prefixSumBoosts[i] += prefixSumBoosts[i - 1];
    }

    return prefixSumBoosts;
}

function findMinInitialStrengthToDefeatAllMonsters(monsters: number[], prefixSumBoosts: number[], sumMonstersStrengthFomStart: number): number {
    let minInitialStrengthToDefeatAllMonsters = 0;
    for (let i = monsters.length - 1; i >= 0; --i) {
        if (prefixSumBoosts[i] < monsters[i]) {
            minInitialStrengthToDefeatAllMonsters = sumMonstersStrengthFomStart - prefixSumBoosts[i];
            break;
        }
        sumMonstersStrengthFomStart -= monsters[i];
    }
    return minInitialStrengthToDefeatAllMonsters;
}
