
let login = false
let playAgain = false

function onLogin(){
    const user = document.getElementById("user-input").value
    const password = document.getElementById("password-input").value
    if (user==="x" && password==="1234"){
        login = true
        console.log("isLogin")
        document.getElementById("play-container").classList.remove("none")
        document.getElementById("play-container").classList.add("flex")
        playAgain=true
    }  
}

function onChooseMyPlay(selection){
    if (playAgain===true){
        const aiAlternatives = ['right-pp','right-st','right-sc']
        const aiPlay = aiAlternatives[Math.floor(Math.random() * 3 )]
        console.log(selection)
        console.log(aiPlay)
        document.getElementById("my-selection").innerHTML = `<img src='./images/${selection}.jpg' alt='leftHandPaper' width='100px')'>`
        document.getElementById("ai-selection").innerHTML = `<img src='./images/${aiPlay}.jpg' alt='leftHandPaper' width='100px')'>`
        switch (selection) {
            case 'rigth-pp':
                
                break;
        
            default:
                break;
        }
        playAgain=false
    }
}

function onPlayAgain(){
    document.getElementById("my-selection").innerHTML = `<div class="my-selection-inner">?</div>`
    document.getElementById("ai-selection").innerHTML = `<div class="ai-selection-inner">?</div>`
    playAgain = true
}



