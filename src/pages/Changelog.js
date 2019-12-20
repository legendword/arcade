import React, { Component } from 'react'
import Commit from '../components/Commit'

export class Changelog extends Component {
    render() {
        return (
            <div className="container arcade-changelog-container">
                <h2>Changelog</h2>
                <hr />
                <Commit id="" ver="0.1.2" date="">
                    <ul>
                        <li>MineSweeper Settings button now works, providing the option to change difficulty level. (Currently only 3 preset levels: Easy, Medium, and Hard. Custom difficulties may be added in the future.)</li>
                        <li>MineSweeper time counting implemented.</li>
                        <li>Several minor bug fixes:
                            <br />
                            <b>MineSweeper</b>
                            <ul>
                                <li>When auto-flagging all remaining mines (when there are only unflagged mines left on the map), the flag count now displays the correct number.</li>
                            </ul>
                        </li>
                    </ul>
                </Commit>
                <Commit id="5ec11a7cbc18b3d996f7749d12d8323c440c22ff" ver="0.1.1" date="Dec. 18, 2019">
                    <ul>
                        <li>Added a Changelog tab in Home. Starting to write changelogs for future commits.</li>
                        <li>Added Insiders Beta information in Home/Overview tab.</li>
                        <li>Header links now have different background colors when hovering/active.</li>
                        <li>Switching tabs in Header won't trigger the confirmation prompt once current game is finished.</li>
                        <li>MineSweeper advanced win conditions implemented.</li>
                        <li>MineSweeper now shows all mines and wrong flags after game lost, and reveals full map after game won.</li>
                        <li>Several bug fixes:
                            <br />
                            <b>Tetris</b>
                            <ul>
                                <li>Player can no longer hard land (using SPACE) while paused/gameover.</li>
                                <li>Player can no longer un-pause the game after losing the game.</li>
                                <li>Fixed a bug where the gray drop position continues to show after player moves away from the left-most column.</li>
                            </ul>
                            <b>MineSweeper</b>
                            <ul>
                                <li>Player can no longer perform any action to the map after game ended.</li>
                            </ul>
                        </li>
                    </ul>
                </Commit>
                <Commit id="fdbfc549a3366ca6d41ace8d09d7bdc6e28697c8" ver="0.1.0" date="Dec. 17, 2019">
                    <ul>
                        <li><b>Implemented basic MineSweeper gameplay.</b></li>
                        <li>Full Tetris game finished, but with obvious bugs.
                            <ul>
                                <li>"Next Shape" is now working.</li>
                                <li>Added scoring and speed change.</li>
                                <li>Added a red "PAUSED" indicator.</li>
                                <li>Minor bug fixes and improvements.</li>
                            </ul>
                        </li>
                        <li>First Insiders Beta, served on http://legendword.com/arcade</li>
                    </ul>
                </Commit>
                <Commit id="fe8909ff9232cb4b75b2216169399f4139a16309" ver="0.0.2" date="Dec. 16, 2019">
                    <ul>
                        <li><b>Implemented basic Tetris gameplay.</b></li>
                        <li>"Next Shape" is not done.</li>
                    </ul>
                </Commit>
                <Commit id="bf10df6f6d08b1aff00a7a1a0fa36cd6ab3fd897" ver="0.0.1" date="Dec. 15, 2019">
                    <ul>
                        <li><b>Game list layout created.</b></li>
                        <li>Top navigation bar adjustments.</li>
                        <li>Game index and basic structure are created.</li>
                    </ul>
                </Commit>
            </div>
        )
    }
}

export default Changelog
