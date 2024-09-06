class box {
    constructor(value, color) {
        this.color = color
        this.value = value
    }
}

function shuffle(array) {
    let i = array.length - 1
    while (i > 0) {
        let j = Math.floor(Math.random() * (i + 1))
        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        // you'll find more details about that syntax in later chapters
        // same can be written as:
        let t = array[i];
        array[i] = array[j];
        array[j] = t
        i--
    }
    return array
}

export function createBox(amount) {
    if (amount % 2 != 0 || amount <= 0) return -1
    let i = 0
    const colorList = []
    while (i < amount / 2) {
        const newColor = randomColor({
            luminosity: 'random',
            hue: 'random'
        })
        const item_game = new box(i, newColor)
        colorList.push(item_game)
        i++
    }
    const newListColor = shuffle([...colorList, ...colorList])
    return newListColor
}
export function renderBox(boxesCreated) {
    const numberBoxToCreate = 12
    const game_container = document.getElementById("game-container")
    boxesCreated.forEach(val => {
        const itemHTML = document.createElement("div")
        const overlay = document.createElement("div")
        overlay.className="overlay"
        itemHTML.className = "item-game"
        itemHTML.style.background = val.color
        itemHTML.dataset.val = val.value
        itemHTML.append(overlay)
        game_container.append(itemHTML)
    })
    let __cols = Math.ceil(Math.sqrt(numberBoxToCreate))
    game_container.style.setProperty('--cols', __cols);

}

