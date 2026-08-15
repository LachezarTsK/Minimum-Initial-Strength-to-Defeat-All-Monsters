
/**
 * @param {number[]} monsters
 * @param {number[][]} boosts
 * @return {number}
 */
var minInitialStrength = function (monsters, boosts) {
    // Alternatively: monsters.reduce((sumStrength, strength) => sumStrength + strength)
    let sumMonstersStrengthFomStart = 0;
    for (let strength of monsters) {
        sumMonstersStrengthFomStart += strength;
    }

    const prefixSumBoosts = createPrefixSumBoosts(boosts, monsters.length);

    return findMinInitialStrengthToDefeatAllMonsters(monsters, prefixSumBoosts, sumMonstersStrengthFomStart);
};

/**
 * @param {number[][]} boosts
 * @param {number} totalMonsters
 * @return {number[]}
 */
function createPrefixSumBoosts(boosts, totalMonsters) {
    const prefixSumBoosts = new Array(totalMonsters).fill(0);

    for (let [from, to, boost]of boosts) {
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

/**
 * @param {number[]} monsters
 * @param {number[]} prefixSumBoosts
 * @param {number} sumMonstersStrengthFomStart
 * @return {number}
 */
function findMinInitialStrengthToDefeatAllMonsters(monsters, prefixSumBoosts, sumMonstersStrengthFomStart) {
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
