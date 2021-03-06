import React, { Component } from 'react'
import Commit from '../components/Commit'

export class Changelog extends Component {
    render() {
        return (
            <div className="container arcade-changelog-container">
                <h2>Changelog</h2>
                <hr />
                <div className="arcade-changelog-content">
                    <Commit id="" ver="0.2.1" date="">
                        <ul>
                            <li>Massive changes has been made to the theme. Originally, the theme color is blue/light blue; these colors are too bright. Also, the old look includes too much white. The new theme has purple as the primary color and very light blue (almost white) as the secondary color.</li>
                            <li>New button styles (to fit the new theme).</li>
                            <li>New header! No longer a gradient background as it always used to be.</li>
                            <li>The <i>Progress</i> Tab now displays highest scores for all the games.</li>
                            <li>The <i>Friends</i> Tab now shows a template of what the interface will look like, but is not linked to the back-end for now.</li>
                            <li><i>Friends</i>: Friend List styling/animation finished. Groups inside the list separates your online friends from your offline friends. The groups can be collapsed/expanded.</li>
                            <li><i>Overview</i>: The layout has been altered. User and friends information are now on the right side. Removed the highscore section in <i>Overview</i> (moved to <i>Progress</i>). New colors and animations for the Singleplayer/Multiplayer button.</li>
                        </ul>
                    </Commit>
                    <Commit id="521ed7da03e07d8f86fd1b1757b19e6fc0b6b4d7" ver="0.2.0" date="Apr. 4, 2020">
                        <p style={{paddingLeft: "1rem"}}>Welcome to v0.2.x! Starting from this version, player data will be linked to the database. More online systems are coming to this wonderful arcade!</p>
                        <ul>
                            <li>Although this platform is now linked to Legendword Accounts, you can still play without an account. Just click "Play as Guest" when you see the login/register prompt.</li>
                            <li>In Play as Guest, or <b>Guest Mode</b>, your high scores are saved locally, which means you can still break your own record when playing without an account.</li>
                            <li>If you're logged in, your <i>Highscores</i> will be stored in the database. Even if you use a different browser or device, as long as you're signed in using the same account, your highscores will be synchronized.</li>
                            <li>Fixed some bugs related to signing in and out.</li>
                            <li>Improved user action buttons in <i>Overview</i></li>
                        </ul>
                    </Commit>
                    <Commit id="cd87e5c5b709b3e975c0d3710c1ddb27f35719e7" ver="0.1.9" date="Apr. 3, 2020">
                        <ul>
                            <li>Sign-In page is remade. Since the login/register system is linked to Legendword Account, I will just use the login/register page from LAccount.</li>
                            <li>New experimental button styles in <i>Overview</i>.</li>
                            <li>Rearranged elements in <i>Overview</i> by using <code>cards</code> to better distinguish different parts.</li>
                        </ul>
                    </Commit>
                    <Commit id="714a3b44163ec28f078cd73b06b9d212c32725f8" ver="0.1.8" date="Mar. 3, 2020">
                        <ul>
                            <li>2048: Fixed <a href="https://github.com/legendword/arcade/issues/1" target="blank">Issue #1</a>, font size of large numbers (&gt;=1024) is now adjusted to fit the grid.</li>
                            <li>Experimental button styles in the <i>Overview</i> tab.</li>
                            <li>Rearranged CSS file layout.</li>
                        </ul>
                    </Commit>
                    <Commit id="bc891075cedc4d95dcc8443679068f4c9a80bffe" ver="0.1.7" date="Feb. 11, 2020">
                        <ul>
                            <li>2048: Added score display and <i>High Score</i> support.</li>
                            <li>2048: Added Game Over prompt, and <i>Restart</i> button is now functional.</li>
                            <li>2048: A screenshot of the 2048 game is now showing at the Game Select list.</li>
                            <li>2048: Fixed the bug mentioned in v0.1.6.</li>
                        </ul>
                    </Commit>
                    <Commit id="16e86538ca68f48fe7304d973bdcb2e5e01dd9ee" ver="0.1.6" date="Jan. 11, 2020">
                        <ul>
                            <li>2048: added animations.</li>
                            <li>Bug yet to be fixed: when merging tiles, only one pair of tiles can be merged per row/column per move. Consecutive merges shouldn't be allowed.</li>
                        </ul>
                    </Commit>
                    <Commit id="5e0aa36aaec65b5d0d19d0d18a3631f4de137f1b" ver="0.1.5" date="Jan. 6, 2020">
                        <ul>
                            <li>New Game: <b>2048</b> added.</li>
                            <li>Basic game algorithm is finished (with gameover check).</li>
                            <li>Score, "Restart" and "Options" button, and animations are all yet to be implemented.</li>
                            <li>Currently, no screenshot of 2048 is shown at the Game Select list.</li>
                        </ul>
                    </Commit>
                    <Commit id="416f7d3d6ab02983092822bae1b6ca43412b46a7" ver="0.1.4" date="Dec. 21, 2019">
                        <ul>
                            <li>Screenshots of the games are displayed at <i>Game Select</i>. (This will likely change in the future as I'm planning on making an icon for each game.)</li>
                            <li>MineSweeper: Fixed an issue where Game Over won't be triggered if player clicks too fast.</li>
                            <li>MineSweeper: Added a pop-up for Game Over, showing difficulty, time, and highscore.</li>
                            <li>Tetris: Added a pop-up for Game Over, showing score and highscore.</li>
                            <li>Introducing a <i>Highscore System</i> that stores your record scores for each game. Currently, it is stored locally in your browser since the platform isn't connected to any server.</li>
                            <li>Tetris: Player can now rotate the shape even if it's on the left/right edge.</li>
                            <li>The <i>High Scores</i> section in <i>Home/Overview</i> now displays your locally stored high scores of the games.</li>
                            <li>Removed the <i>News</i> section in <i>Home/Overview</i> as it seems unnecessary for now.</li>
                            <li>Added a <i>Play</i> button in <i>Home/Overview</i> just under the user name and level for better navigation.</li>
                        </ul>
                    </Commit>
                    <Commit id="354b51421e907e8a0600b3d9d89bca4917e303ea" ver="0.1.3" date="Dec. 20, 2019">
                        <ul>
                            <li>You can now click "Play" in the Header to return to Game Select page. Previously, returning to Game Select once in game was only possible by going "Home" and then back to "Play", or by refreshing.</li>
                            <li>MineSweeper: Added different colors for different numbers.</li>
                            <li>MineSweeper: Improved the "revealing" algorithm when holding down the mouse, showing white before releasing.</li>
                            <li>MineSweeper: Added a "Restart" button.</li>
                            <li>Tetris: Added a "Restart" button as well.</li>
                        </ul>
                    </Commit>
                    <Commit id="8f55661bce459b0f8f756f8bf47a5b20d0154525" ver="0.1.2" date="Dec. 19, 2019">
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
            </div>
        )
    }
}

export default Changelog
