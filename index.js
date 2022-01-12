
let login = false
let playAgain = false
let winner=null
let score = 0
let round = 1
let game = 1
let lastGames = []
const RONDAS = 3
let loginValidationMsg = ""

document.addEventListener("DOMContentLoaded", function(event) {
    const alfa = localStorage.getItem('lastGames') 
    if (localStorage.getItem('lastGames')){
        lastGames = JSON.parse(localStorage.getItem('lastGames'))
        game = JSON.parse(localStorage.getItem('lastGames'))[0].game +1
        document.getElementById('game').innerHTML=game
        document.getElementById('lastGamesList').innerHTML=lastGamesFunc(lastGames)
    }
    else
        localStorage.setItem('lastGames',JSON.stringify(lastGames))
});

function lastGamesFunc(lastGames){
    const liList = lastGames.reduce((acu,lastGame)=>{
        return acu + `<li>Game ${lastGame.game}, Score: ${lastGame.score}  </li>`
    },"")
    return liList
}


function onLogin(){
    const user = document.getElementById("user-input").value
    const password = document.getElementById("password-input").value
    if (user==="edgar" && password==="haro"){
        login = true
        document.getElementById("play-container").classList.remove("none")
        document.getElementById("play-container").classList.add("flex")
        document.getElementById("login-container").classList.add("none")
        document.getElementById("score-container").classList.remove("none")
        document.getElementById("round-container").classList.remove("none")
        document.getElementById("header-container").classList.remove("none")
        document.getElementById("stats-container").classList.remove("none")
        document.getElementById("divider").classList.remove("none")
        document.getElementById("tip").classList.remove("tip")
        document.getElementById("tip").classList.add("none")
        playAgain=true
    }else if (user==="" || password===""){
        loginValidationMsg="Es necesario llenar los dos campos"
    }else{
        loginValidationMsg="Las credenciales son incorrectas"
    }
    document.getElementById("loginValidationMsg").innerHTML=loginValidationMsg
}

function onChooseMyPlay(selection){
    if (playAgain===true){
        round +=1
        if (round>RONDAS){
            document.getElementById('playAgain').innerHTML='Play Again'
            document.getElementById("playAgain").classList.add("highlighted")
        }else{
            document.getElementById("playAgain").innerHTML= "Siguiente selección"
            document.getElementById("playAgain").classList.add("highlighted")
        }
        const aiAlternatives = ['pp','st','sc']
        const aiPlay = aiAlternatives[Math.floor(Math.random() * 3 )]
        switch (selection) {
            case 'pp':
                if (aiPlay==='st') 
                    winner = 'me'
                else if (aiPlay==='sc')
                    winner = 'ai'
                else 
                    winner = null
                break;
            case 'st':
                if (aiPlay==='st') 
                    winner = null
                else if (aiPlay==='sc')
                    winner = 'me'
                else 
                    winner = 'ai'
                break;
            case 'sc':
                if (aiPlay==='st') 
                    winner = 'ai'
                else if (aiPlay==='sc')
                    winner = null
                else 
                    winner = 'me'
                break;
            default:
                break;
        }
        if (winner === 'me'){
            document.getElementById("my-selection").classList.add('winner')
            score+=100
        }
        if (winner === 'ai'){
            document.getElementById("ai-selection").classList.add('winner')
            score-=30
        }
        playAgain=false
        winner = null
        if (round>RONDAS){
            lastGames.unshift({game,score})
            if (lastGames.length>5)
                lastGames.pop()
            localStorage.setItem('lastGames',JSON.stringify(lastGames))    
            document.getElementById('lastGamesList').innerHTML=lastGamesFunc(lastGames)
            game+=1
        }
        document.getElementById("my-selection").innerHTML = `<img src='./images/left-${selection}.jpg' alt='leftHandPaper' width='100px')'>`
        document.getElementById("ai-selection").innerHTML = `<img src='./images/right-${aiPlay}.jpg' alt='leftHandPaper' width='100px')'>`
        document.getElementById("score").innerHTML=score
    }
}

function onPlayAgain(){
    if (round > RONDAS){
        score=0
        round=1
        document.getElementById("playAgain").innerHTML= "Play Again"
    }else{
        document.getElementById("playAgain").innerHTML= "Selecciona tu jugada a la izquierda"
        document.getElementById("playAgain").classList.remove("highlighted")
    }
    document.getElementById("game").innerHTML=game
    document.getElementById("round").innerHTML=round
    document.getElementById("score").innerHTML=score
    document.getElementById("my-selection").classList.remove('winner')
    document.getElementById("ai-selection").classList.remove('winner')
    document.getElementById("my-selection").innerHTML = `<div class="my-selection-inner">?</div>`
    document.getElementById("ai-selection").innerHTML = `<div class="ai-selection-inner">?</div>`
    playAgain = true
}



