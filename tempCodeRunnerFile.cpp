#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <climits>
#include <algorithm>

using namespace std;

struct Activity {
    int id;
    int duration;
    vector<int> successors;
};

void topologicalSort(int v, vector<vector<int>>& adj, vector<bool>& visited, vector<int>& order) {
    visited[v] = true;
    for (int u : adj[v]) {
        if (!visited[u]) {
            topologicalSort(u, adj, visited, order);
        }
    }
    order.push_back(v);
}

void findCriticalPath(vector<Activity>& activities) {
    int n = activities.size();
    vector<vector<int>> adj(n);
    vector<int> indegree(n, 0);

    // Build the adjacency list and calculate indegree
    for (const auto& act : activities) {
        for (int succ : act.successors) {
            adj[act.id].push_back(succ);
            indegree[succ]++;
        }
    }

    // Topological sort
    vector<bool> visited(n, false);
    vector<int> order;
    for (int i = 0; i < n; ++i) {
        if (!visited[i]) {
            topologicalSort(i, adj, visited, order);
        }
    }

    reverse(order.begin(), order.end());

    // Forward pass
    vector<int> ES(n, 0), EF(n, 0);
    for (int i : order) {
        EF[i] = ES[i] + activities[i].duration;
        for (int succ : adj[i]) {
            ES[succ] = max(ES[succ], EF[i]);
        }
    }

    // Backward pass
    reverse(order.begin(), order.end());
    vector<int> LF(n, INT_MAX), LS(n, 0);
    int projectCompletionTime = *max_element(EF.begin(), EF.end());
    // int i= order.size()-1;
    for (int i : order) {
        if (LF[i] == INT_MAX) {
            LF[i] = projectCompletionTime;
        }
        // cout<<LS[i]<<" "<<LF[i]<<"-"<<activities[i].duration<<endl;
        
        for (int succ : adj[i]) {
            LF[i] = min(LF[i], LS[succ]);
        }
        LS[i] = LF[i] - activities[i].duration;
    }

    

    // Output the results
    cout << "Activity\tES\tEF\tLS\tLF" << endl;
    for (int i = 0; i < n; ++i) {
        cout << i << "\t\t" << ES[i] << "\t" << EF[i] << "\t" << LS[i] << "\t" << LF[i] << "\t"<< endl;
    }

   
    cout << endl;
}

int main() {
    vector<Activity> activities = {
        {0, 7, {2, 3}},
        {1, 9, {3}},
        {2, 12, {5}},
        {3, 8, {4}},
        {4, 9, {5,6}},
        {5, 6, {}},
        {6, 5, {}}

    };

    findCriticalPath(activities);

    return 0;
}
