function topologicalSort(v, adj, visited, order) {
    visited[v] = true;
    for (let u of adj[v]) {
        if (!visited[u]) {
            topologicalSort(u, adj, visited, order);
        }
    }
    order.push(v);
}

function findTime(activities) {
    let n = activities.length;
    let adj = Array.from({ length: n }, () => []);
    let indegree = Array(n).fill(0);

    // Build the adjacency list and calculate indegree
    for (let act of activities) {
        for (let succ of act.successors) {
            adj[act.id].push(succ);
            indegree[succ]++;
        }
    }

    // Topological sort
    let visited = Array(n).fill(false);
    let order = [];
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            topologicalSort(i, adj, visited, order);
        }
    }

    order.reverse();

    // Forward pass
    let ES = Array(n).fill(0);
    let EF = Array(n).fill(0);
    for (let i of order) {
        EF[i] = ES[i] + activities[i].duration;
        for (let succ of adj[i]) {
            ES[succ] = Math.max(ES[succ], EF[i]);
        }
    }

    // Backward pass
    order.reverse();
    let LF = Array(n).fill(Infinity);
    let LS = Array(n).fill(0);
    let projectCompletionTime = Math.max(...EF);

    for (let i of order) {
        if (LF[i] === Infinity) {
            LF[i] = projectCompletionTime;
        }
        for (let succ of adj[i]) {
            LF[i] = Math.min(LF[i], LS[succ]);
        }
        LS[i] = LF[i] - activities[i].duration;
    }

    // Output the results
    console.log("Activity    Duration\tES\tEF\tLS\tLF");
    for (let i = 0; i < n; i++) {
        console.log(`${i}\t\t${activities[i].duration}\t${ES[i]}\t${EF[i]}\t${LS[i]}\t${LF[i]}`);
    }
}

let activities = [
    { id: 0, duration: 7, successors: [2, 3] },
    { id: 1, duration: 9, successors: [3] },
    { id: 2, duration: 12, successors: [5] },
    { id: 3, duration: 8, successors: [4] },
    { id: 4, duration: 9, successors: [5, 6] },
    { id: 5, duration: 6, successors: [] },
    { id: 6, duration: 5, successors: [] }
];

findTime(activities);
