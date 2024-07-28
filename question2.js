// Function to find friends of a person
function findFriends(person, friendships) {
    return friendships[person] || [];
}

// Function to find common friends between two persons
function findCommonFriends(person1, person2, friendships) {
    const friends1 = new Set(friendships[person1] || []);
    const friends2 = friendships[person2] || [];
    
    const common = new Set();
    for (const friend of friends2) {
        if (friends1.has(friend)) {
            common.add(friend);
        }
    }
    return common;
}

// Function to find the nth connection between two persons using BFS
function findNthConnection(person1, person2, friendships) {
    if (person1 === person2) {
        return 0;
    }
    
    const visited = new Set();
    const queue = [{ person: person1, level: 0 }];
    
    while (queue.length > 0) {
        const { person: currentPerson, level } = queue.shift();
        
        if (!visited.has(currentPerson)) {
            visited.add(currentPerson);
            
            const friends = friendships[currentPerson] || [];
            for (const friend of friends) {
                if (friend === person2) {
                    return level + 1;
                }
                queue.push({ person: friend, level: level + 1 });
            }
        }
    }
    
    return -1;
}

function main() {
    const friendships = {
        Alice: ["Bob", "Charlie","David"],
        Bob: ["Alice", "David", "Janice"],
        Charlie: ["Alice", "Eve"],
        David: ["Bob","Alice"],
        Janice: ["Bob"],
        Eve: ["Charlie"]
    };

    // Finding friends of Alice and Bob
    const aliceFriends = findFriends("Alice", friendships);
    const bobFriends = findFriends("Bob", friendships);

    console.log("Friends of Alice:", aliceFriends);
    console.log("Friends of Bob:", bobFriends);

    // Finding common friends between Alice and Bob
    const commonFriends = findCommonFriends("Alice", "Bob", friendships);
    console.log("Common friends of Alice and Bob:", Array.from(commonFriends));

    // Finding nth connection between two persons
    console.log("Connection(Alice, Janice) =>", findNthConnection("Alice", "Janice", friendships));
    console.log("Connection(Alice, Bob) =>", findNthConnection("Alice", "Bob", friendships));
    console.log("Connection(Alice, Eve) =>", findNthConnection("Alice", "Eve", friendships));
    console.log("Connection(Alice, David) =>", findNthConnection("Alice", "David", friendships));
    console.log("Connection(Alice, Alice) =>", findNthConnection("Alice", "Alice", friendships));
    console.log("Connection(Eve, Tommy) =>", findNthConnection("Eve", "Tommy", friendships));
}

main();
