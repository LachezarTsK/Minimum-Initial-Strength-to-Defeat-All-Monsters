
#include <span>
#include <vector>
using namespace std;

class Solution {

public:
    long long minInitialStrength(vector<int>& monsters, vector<vector<int>>& boosts) {
        // Alternatively: acumulate(monsters.begin(), monsters.end(), 0LL)
        //                reduce(monsters.begin(), monsters.end(), 0LL)  
        long long sumMonstersStrengthFomStart = 0;
        for (int strength : monsters) {
            sumMonstersStrengthFomStart += strength;
        }

        vector<long long> prefixSumBoosts = createPrefixSumBoosts(boosts, monsters.size());

        return findMinInitialStrengthToDefeatAllMonsters(monsters, prefixSumBoosts, sumMonstersStrengthFomStart);
    }

private:
    static vector<long long> createPrefixSumBoosts(span<const vector<int>> boosts, int totalMonsters) {
        vector<long long> prefixSumBoosts(totalMonsters);

        for (int i = 0; i < boosts.size(); ++i) {
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

    static long long findMinInitialStrengthToDefeatAllMonsters(span<const int> monsters, span<const long long> prefixSumBoosts, long long sumMonstersStrengthFomStart) {
        long long minInitialStrengthToDefeatAllMonsters = 0;
        for (int i = monsters.size() - 1; i >= 0; --i) {
            if (prefixSumBoosts[i] < monsters[i]) {
                minInitialStrengthToDefeatAllMonsters = sumMonstersStrengthFomStart - prefixSumBoosts[i];
                break;
            }
            sumMonstersStrengthFomStart -= monsters[i];
        }
        return minInitialStrengthToDefeatAllMonsters;
    }
};
