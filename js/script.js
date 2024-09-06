import { createBox, renderBox } from "./box.js"

const GAME_STATE = {
    PENDING: 'pending',
    PLAYING: 'playing',
    BLOCKING: 'blocking',
    FINISHED: 'finished'
}

const main = () => {
    let items_box
    const PAIRS = 16
    const GAME_TIME = 45
    let time = GAME_TIME
    let GameState = GAME_STATE.PENDING
    let matchcount = 0
    let numberCreatedBox = []
    let boxSeletected = []
    let countdownInterval = null;
    //timer
    const result_game = document.querySelector("#result-game")
    const button_play = document.querySelector("#begin-play-game")
    const init = () => {
        document.getElementById("game-container").innerHTML = ""
        numberCreatedBox = createBox(PAIRS)
        renderBox(numberCreatedBox)
        items_box = document.querySelectorAll("#game-container .item-game")
        items_box.forEach(element => {
            element.addEventListener("click", () => handleClickBoxes(element))
        })
        //countDownTime
        countDownTimer()
    }
    const reset = () => {
        time = GAME_TIME
        GameState = GAME_STATE.PENDING
        matchcount = 0
        boxSeletected = []
        result_game.innerHTML = `${GAME_TIME}s`;
    }
    //countdown
    const countDownTimer = () => {
        countdownInterval = setInterval(() => {
            result_game.innerHTML = `${time}s`
            time--
            if (time < 0) {
                GameState = GAME_STATE.FINISHED
                clearInterval(countdownInterval)
                result_game.innerHTML = 'GAME OVER'
                button_play.style.display = "block"
            }
        }, 1000)
    }

    const handleClickBoxes = (item) => {
        if (!item ||
            item.classList.contains("active") ||
            GameState === GAME_STATE.BLOCKING ||
            GameState === GAME_STATE.FINISHED ||
            time < 0
        ) return
        item.classList.add("active")
        boxSeletected.push(item)
        if (boxSeletected.length < 2) return
        const match = boxSeletected[0].dataset.val * 1 === boxSeletected[1].dataset.val * 1
        if (!match) {
            GameState = GAME_STATE.BLOCKING
            setTimeout(() => {
                boxSeletected[0].classList.remove("active")
                boxSeletected[1].classList.remove("active")
                boxSeletected = []
                GameState = GAME_STATE.PLAYING
            }, 500)
            return
        }
        matchcount++
        boxSeletected[0].classList.add("animation")
        boxSeletected[1].classList.add("animation")
        setTimeout(() => {
            boxSeletected[0].classList.remove("animation")
            boxSeletected[1].classList.remove("animation")
        }, 500)
        boxSeletected = []
        //check win
        if (matchcount === PAIRS / 2) {
            clearInterval(countdownInterval)
            result_game.innerHTML = "YOU WIN!!!"
            GameState = GAME_STATE.FINISHED
            button_play.style.display = "block"
        }
    }
    button_play.addEventListener("click", function () {
        this.style.display = "none"
        reset()
        init()
    })
}
main()