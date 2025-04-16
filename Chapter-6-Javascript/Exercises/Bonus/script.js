//game state variables
let lives = 3;                //player starts with 3 lives
let score = 0;                //initial score is 0
let level = 1;                //game starts at level 1
let correctColor;             //will store the correct RGB color
let colorOptions = [];        //will store all color options for each round

//DOM elements
//these connect JavaScript to HTML elements using their IDs and classes
const heartsDisplay = document.getElementById('hearts');     //hearts display (❤️❤️❤️)
const scoreDisplay = document.getElementById('score');       //score number display
const levelDisplay = document.getElementById('level');       // Level number display
const rgbDisplay = document.getElementById('rgb-value');     // RGB value display
const message = document.getElementById('message');          // Game messages
const playAgainBtn = document.getElementById('play-again');  // Play again button
const colorBoxes = document.querySelectorAll('.color-box'); // All color option boxes

const basicColors = [
    //each object represents a basic RGB color with r, g, b values
    { r: 255, g: 0, b: 0 },    // Pure Red
    { r: 0, g: 255, b: 0 },    // Pure Green
    { r: 0, g: 0, b: 255 },    // Pure Blue
    { r: 255, g: 255, b: 0 },  // Yellow (Red + Green)
    { r: 0, g: 255, b: 255 },  // Cyan (Green + Blue)
    { r: 255, g: 0, b: 255 },  // Magenta (Red + Blue)
    { r: 0, g: 0, b: 0 },      // Black (No color)
    { r: 255, g: 255, b: 255 } // White (All colors)
];

//generateColor(level): creates the correct color based on current level
// - Levels 1-8: uses basic colors from basicColors array
// - Levels 9-12: uses medium difficulty colors (0, 128, 255 values only)
// - Levels 13+: uses completely random RGB values

function generateColor(level) {
    if (level <= 8) {
        //use basic colors for first 8 levels
        return basicColors[level - 1];
    } else if (level <= 12) {
        //use medium values (0, 128, 255)
        const values = [0, 128, 255];
        return {
            r: values[Math.floor(Math.random() * 3)],
            g: values[Math.floor(Math.random() * 3)],
            b: values[Math.floor(Math.random() * 3)]
        };
    } else {
        //random colors for higher levels
        return {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };
    }
}

// generateWrongOptions(correct, level): creates incorrect color options
// - Levels 1-8: uses other basic colors
// - Levels 9-12: uses medium values
// - Levels 13+: generates similar but different colors

function generateWrongOptions(correct, level) {
    if (level <= 8) {
        //for basic levels, use other basic colors
        return basicColors
            .filter(color => 
                color.r !== correct.r || 
                color.g !== correct.g || 
                color.b !== correct.b)
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
    } else if (level <= 12) {
        //for medium levels, use medium values
        const options = [];
        const values = [0, 128, 255];
        while (options.length < 2) {
            let newColor = {
                r: values[Math.floor(Math.random() * 3)],
                g: values[Math.floor(Math.random() * 3)],
                b: values[Math.floor(Math.random() * 3)]
            };
            if (newColor.r !== correct.r || 
                newColor.g !== correct.g || 
                newColor.b !== correct.b) {
                options.push(newColor);
            }
        }
        return options;
    } else {
        //for advanced levels, generate similar colors
        return Array(2).fill(null).map(() => {
            const variance = Math.max(20, 100 - (level * 2));
            return {
                r: restrict(correct.r + (Math.random() - 0.5) * variance * 2),
                g: restrict(correct.g + (Math.random() - 0.5) * variance * 2),
                b: restrict(correct.b + (Math.random() - 0.5) * variance * 2)
            };
        });
    }
}

// colorToRGB(color): converts color object to RGB string format
// example: {r: 255, g: 0, b: 0} → "rgb(255, 0, 0)"

function colorToRGB(color) {
    return `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;
}

// newRound(): sets up each new round
// - generates new correct color
// - creates wrong options
// - updates display
// - sets difficulty

function newRound() {
    // generate correct color
    const baseColor = generateColor(level);
    correctColor = colorToRGB(baseColor);
    
    // display RGB value
    rgbDisplay.textContent = correctColor;

    // generate wrong options
    let wrongOptions = generateWrongOptions(baseColor, level);
    
    // combine and shuffle all options
    colorOptions = [correctColor, ...wrongOptions.map(colorToRGB)]
        .sort(() => Math.random() - 0.5);

    // update boxes (always show 3 options)
    colorBoxes.forEach((box, index) => {
        if (index < 3) {
            box.style.backgroundColor = colorOptions[index];
            box.style.display = 'block';
            box.style.pointerEvents = 'auto';
        } else {
            box.style.display = 'none';
        }
    });

    // update difficulty 
    let difficulty = 'BASIC RGB';
    if (level <= 8) difficulty = 'BASIC RGB';
    else if (level <= 12) difficulty = 'INTERMEDIATE';
    else difficulty = 'ADVANCED';
    
    levelDisplay.textContent = `${level} (${difficulty})`;
}

// restrict value between 0 and 255
function restrict(value) {
    return Math.min(255, Math.max(0, Math.floor(value)));
}

// handleGuess(selectedColor): handles player's color selection
// - checks if correct
// - updates score/lives
// - shows messages
// - triggers next round or game over

function handleGuess(selectedColor) {
    if (selectedColor === correctColor) {
        // calculate score based on level
        let levelBonus = Math.floor(level * 50);
        score += levelBonus;
        level++;
        message.textContent = `CORRECT! +${levelBonus} POINTS`;
        message.className = 'message correct';
        scoreDisplay.textContent = score;
        setTimeout(newRound, 1200);
    } else {
        lives--;
        heartsDisplay.textContent = '❤️'.repeat(lives);
        message.textContent = 'WRONG! TRY AGAIN!';
        message.className = 'message incorrect';
        
        if (lives === 0) {
            endGame();
        } else {
            setTimeout(newRound, 1200);
        }
    }
}

//endGame(): ends the game 
// - shows final score
// - displays play again button
// - disables color boxes

function endGame() {
    message.textContent = `GAME OVER! FINAL SCORE: ${score}`;
    playAgainBtn.style.display = 'block';
    colorBoxes.forEach(box => box.style.pointerEvents = 'none');
}

// resetGame(): resets game to initial state
// - resets lives, score, level
// - starts new round

function resetGame() {
    lives = 3;
    score = 0;
    level = 1;
    heartsDisplay.textContent = '❤️❤️❤️';
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
    message.textContent = '';
    playAgainBtn.style.display = 'none';
    colorBoxes.forEach(box => box.style.display = 'block');
    newRound();
}