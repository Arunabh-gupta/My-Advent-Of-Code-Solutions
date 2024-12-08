const input = require('fs').readFileSync('day6Input.txt', 'utf-8');

// Parse the input as a matrix of characters
const matrix = input.trim().split("\n").map(line => line.trim().split(""));


const size = [matrix[0].length, matrix.length];

const initialGuardPosition = [0, 0]

// x: horizontal, y: vertical
const direction = [0, 1];
for (let i = 0; i < size[1]; i++) {
    for (let j = 0; j < size[0]; j++) {
        if (matrix[i][j].match(/<|\^|>|v/)) {
            initialGuardPosition[0] = j;
            initialGuardPosition[1] = i;

            const guard = matrix[i][j];

            if (guard === "<") {
                direction[0] = -1;
                direction[1] = 0;
            }

            if (guard === ">") {
                direction[0] = 1;
                direction[1] = 0;
            }

            if (guard === "^") {
                direction[0] = 0;
                direction[1] = -1;
            }

            if (guard === "v") {
                direction[0] = 0;
                direction[1] = 1;
            }

            // Replace the guard with a dot
            matrix[i][j] = ".";


            break;
        }
    }
}

function move(guardPosition, direction) {
    const newX = guardPosition[0] + direction[0];
    const newY = guardPosition[1] + direction[1];

    return [newX, newY];
}

function getGuardIcon(direction) {
    if (direction[0] === -1) {
        return "<";
    } else if (direction[0] === 1) {
        return ">";
    } else if (direction[1] === -1) {
        return "^";
    } else if (direction[1] === 1) {
        return "v";
    }
}

async function printMap(guardPosition, direction) {

    // Clear the console
    console.log("\x1B[2J\x1B[0;0H");

    console.log("\n")
    for (let i = 0; i < size[1]; i++) {
        let line = "";
        for (let j = 0; j < size[0]; j++) {
            if (j === guardPosition[0] && i === guardPosition[1]) {

                line += getGuardIcon(direction);
            } else {
                line += matrix[i][j];
            }
        }
        console.log(line);
    }
    console.log("\n")

    await new Promise(resolve => setTimeout(resolve, 10));

}

async function playGame(matrix) {
    let currentGuardPosition = initialGuardPosition;
    let currentDirection = direction;
    let acceptedMoves = 0;
    let isLooped = false;
    const visitedPositions = new Set();
    const obstacles = new Set();

    // Add the initial position to the set of visited positions
    visitedPositions.add(JSON.stringify(currentGuardPosition));

    while (currentGuardPosition[0] < size[0] && currentGuardPosition[1] < size[1]) {

        const tentativeNewPosition = move(currentGuardPosition, currentDirection);

        // If the tentative new position is out of bounds, finish the game
        if (!matrix[tentativeNewPosition[1]]?.[tentativeNewPosition[0]]) {
            break;
        }

        if (matrix[tentativeNewPosition[1]][tentativeNewPosition[0]] === "#") {
            // Rotate the direction 90 degrees
            currentDirection = [-currentDirection[1], currentDirection[0]];

            const obstaclePos = `${JSON.stringify(currentGuardPosition)}-${JSON.stringify(currentDirection)}`

            if (obstacles.has(obstaclePos)) {
                // We are in a loop!
                isLooped = true;
                break;
            }

            // Add the obstacle to check later if we are on a loop
            obstacles.add(obstaclePos);

        } else {
            currentGuardPosition = tentativeNewPosition;
            acceptedMoves++;

            // Add the current position to the set of visited positions
            visitedPositions.add(JSON.stringify(currentGuardPosition));

            // Print the current position
            // await printMap(currentGuardPosition, currentDirection);
        }

    }

    return { acceptedMoves, visitedPositions: visitedPositions.size, isLooped };
}

// Part 1
playGame(matrix).then(({ visitedPositions }) => {
    console.log("The guard visited ", visitedPositions, " positions")
});



// Part 2
// Lests try positionaing an obstacle on all empty spaces to check if we will create an infinite loop
async function loopGuard() {
    let obstaclePositions = 0;
    for (let i = 0; i < size[1]; i++) {
        for (let j = 0; j < size[0]; j++) {

            // Skip the initial guard position
            if (i === initialGuardPosition[1] && j === initialGuardPosition[0]) {
                continue;
            }

            if (matrix[i][j] === ".") {
                matrix[i][j] = "#";
                const { isLooped } = await playGame(matrix);

                if (isLooped) {
                    obstaclePositions++;
                }

                matrix[i][j] = ".";
            }
        }
    }
    return obstaclePositions
}


loopGuard().then(obstaclePositions => {
    console.log("There are ", obstaclePositions, " possible obstacle positions")
});