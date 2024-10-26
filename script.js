console.log("Welcome To Tic Tac Toe.....Enjoy");

let modebtn =  document.querySelector(".modebtn");
let htmlElement = document.getElementsByTagName("html")[0];
let currMode = "light";
let main_heading = document.querySelector("nav h1");

// DARK-LIGHT MODE 

modebtn.addEventListener("click", ()=>{

    
    if(currMode == "light"){
        htmlElement.classList.add("dark_mode");
        htmlElement.style.color = "white";
        main_heading.style.color = "white";
        currMode = "dark";
    }
    
    else {
        htmlElement.classList.remove("dark_mode");
        currMode = "light";
        main_heading.style.color = "black";
        htmlElement.style.color = "black";
    }
   
});

// GAME BOXES TEXT CHANGE 

let boxes = document.querySelectorAll(".box");
let currText = 'O';
let turnO = true;
let count = 0; //tracks box fill to draw

boxes.forEach(box => {
    box.addEventListener("click", ()=>{
       
            if(turnO == true){
                box.innerText = "O";
                turnO = false;
                player_status.innerText = "Turn To Player X"; 
            }
            else{
                player_status.innerText = "Turn To Player O";
                box.innerText = "X";
                turnO = true;
            }
            box.style.pointerEvents = 'none'; // Prevent further clicks on the box
            count++;
            console.log(count)
        checkWinner(); //will check winner from that fucntion
    });
});

// Winner Checking Funcion 

let player_status = document.querySelector("#current_info");


const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

const checkWinner =  ()=>{
    for (let pattern of winPatterns) {
        
        let w1 = boxes[pattern[0]].innerText; /*CHECK EVERY SINGLE BOX WITH WIN PATTERNS*/
        let w2 = boxes[pattern[1]].innerText;
        let w3 = boxes[pattern[2]].innerText;
        
        if(w1 != "" && w2 != "" && w3 != ""){
            if(w1 == w2 && w2 == w3){
                player_status.innerText = `Winner Is ${w1} Congratulations`;
                if(w1 == "X"){
                    scoreX ++;
                }
                else{
                    scoreO ++;
                }
                updateScoreBoard(); //Function Call
                disable_btns(); // Disable Buttons After Buttons
                count = 0;
                return;
            };
            
        };
        // Draw 
        if(count === 9){
            player_status.innerText = `IT'S A DRAW`;
            disable_btns();
        };
        

    };
    
};


// Disable Buttons 

const disable_btns = () =>{
   
     for (const box of boxes) {
        box.disabled = 'none';
     }
    
};

// Score Board 

let scoreX = 0;
let scoreO = 0;

const updateScoreBoard = ()=>{

    document.getElementById("PlayerXscore").innerText = scoreX;
    document.getElementById("PlayerOscore").innerText = scoreO;

};

// RESET/NEW GAME BUTTONS 

// Enable Boxes Function
const enable_btns = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.style.pointerEvents = 'auto'; // Restores interaction
        box.innerText = ""; // Clear box content for a new game
    }
};

// Reset Button 
let reset_btn = document.querySelector(".reset_btn");

reset_btn.addEventListener("click", ()=>{
    enable_btns();
});

// New Game Function
const newGame = () => {
    enable_btns();
    count = 0;             
    turnO = true;           
    player_status.innerText = "Player O's turn"; // Update status
    console.log("New game started");
};

// New Game 

let new_game = document.querySelector(".newgame_btn")

new_game.addEventListener("click", ()=>{

    location.reload(true);
    newGame(); //Function Call

});


// Themes Functions 

const themes = ["default-background","background-1","background-2"];
let currentThemeIndex = 0;


function changeTheme() {
    const htmlElement = document.documentElement;
    const BodyElement = document.body;
    

    // Remove the current theme class, if any
    htmlElement.classList.remove(themes[currentThemeIndex]);

    // Update index to the next theme
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    
    // Add the new theme class
    htmlElement.classList.add(themes[currentThemeIndex]);
    if(currentThemeIndex > 0 || currentThemeIndex === 1 ){
        BodyElement.classList.add("text-white");
       modebtn.style.pointerEvents = "none";
       modebtn.style.opacity = '0.5';
    }
    else{
       modebtn.style.pointerEvents = "auto";
       modebtn.style.opacity = '1';
       BodyElement.classList.remove("text-white");
      

    }
}


document.querySelector('.themes').addEventListener('click', changeTheme);

// Rules Button Redirection

let aboutBtn = document.querySelector(".rules");

aboutBtn.addEventListener("click", ()=>{
    window.location.href = 'about.html';
});