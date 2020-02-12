import Tetris from './Tetris'
import TetrisImg from './resources/Tetris.png'
import Minesweeper from './Minesweeper'
import MineSweeperImg from './resources/MineSweeper.png'
import TwentyFortyEight from './TwentyFortyEight'
import TwentyFortyEightImg from './resources/2048.png'
import defaultImg from './resources/favicon.ico'

export { Tetris, Minesweeper }

const gameIndex = [
    {
        gameCode: 1,
        name: "Tetris",
        component: Tetris,
        image: TetrisImg
    },
    {
        gameCode: 2,
        name: "Mine Sweeper",
        component: Minesweeper,
        image: MineSweeperImg
    },
    {
        gameCode: 3,
        name: "2048",
        component: TwentyFortyEight,
        image: TwentyFortyEightImg
    }
]

const findName = (gameCode) => {
    return gameIndex[gameCode-1].name
}

export { findName }

export default gameIndex