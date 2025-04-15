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