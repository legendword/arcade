import Tetris from './Tetris'
import Minesweeper from './Minesweeper'

export { Tetris, Minesweeper }


const gameIndex = [
    {
        name: "Tetris",
        component: Tetris
    },
    {
        name: "Mine Sweeper",
        component: Minesweeper
    }
]
export default gameIndex