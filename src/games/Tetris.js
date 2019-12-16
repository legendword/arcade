import React, { Component } from 'react'

export class Tetris extends Component {

    componentDidMount() {
        console.log("Tetris mounted")
    }

    componentWillUnmount() {
        console.log("Tetris will unmount")
        this.props.leaveGame()
    }

    render() {
        return (
            <div>
                <h1>Tetris</h1>
            </div>
        )
    }
}

export default Tetris
