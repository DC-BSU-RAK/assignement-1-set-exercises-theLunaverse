//game state variables
let lives = 3;
let score = 0;
let level = 1;
let correctColor;
let colorOptions = [];

//DOM elements
const heartsDisplay = document.getElementById('hearts');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const rgbDisplay = document.getElementById('rgb-value');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');
const colorBoxes = document.querySelectorAll('.color-box');