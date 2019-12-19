import React, { Component } from 'react'
import flagImageFile from './resources/flag.png'
import mineImageFile from './resources/mine.png'

const flagImage = <img className="arcade-mine-flagImage" src={flagImageFile} alt="a flag" />
const mineImage = <img className="arcade-mine-mineImage" src={mineImageFile} alt="a mine" />

class Tile {

    constructor(props) {
        this.reset()
        this.x = props.x
        this.y = props.y
    }

    reset = () => {
        this.n = -1 //number of bombs around it (-1 means "not assigned", 9 means "it's a bomb")
        this.x = null
        this.y = null
        this.flagged = false
        this.clicked = false
        this.state = "unopened"
        this.text = ""
    }
}

export class Minesweeper extends Component {

    constructor(props) {
        super(props)

        let tls = {}
        this.loadDifficulty({tls})

        this.state = {
            tiles: tls,
            flags: 0,
            opens: 0,
            mode: this.currentDifficulty.name,
            mines: this.currentDifficulty.mines,
            grids: this.currentDifficulty.width*this.currentDifficulty.height,
            time: 0
        }

        this.mainElement = React.createRef()

        
        Array.prototype.toKey = function() {
            return this[0]+","+this[1];
        }
        Array.prototype.toKeyArray = function() {
            return this.map(v => v.toKey())
        }
        String.prototype.toArr = function() {
            return this.split(",").map(v => parseInt(v))
        }
        Array.prototype.toArrArray = function() {
            return this.map(v => v.toArr())
        }
    }

    difficulties = [
        {
            name: "Easy",
            width: 9,
            height: 9,
            mines: 10
        },
        {
            name: "Medium",
            width: 16,
            height: 16,
            mines: 40
        },
        {
            name: "Hard",
            width: 30,
            height: 16,
            mines: 99
        }
    ]

    currentDifficulty = null

    settings = {
        difficulty: 0,
        tileSize: 30 //related to some CSS as well, so don't ONLY change this
    }

    firstClick = true

    hold = [0, 0] //mouse button is holding down [left, right]
    revealing = false
    revealArray = null
    revealMode = "normal"

    gameEnded = false

    loadDifficulty = (ref) => {
        let dif = this.difficulties[this.settings.difficulty]
        this.currentDifficulty = dif
        let tl = ref.tls
        for (let i=0;i<dif.width;i++){
            for (let j=0;j<dif.height;j++){
                tl[i+","+j] = new Tile({x:i,y:j})
            }
        }
    }

    generateMap = (ref) => {
        let tls = ref.tls
        let cx = ref.x, cy = ref.y;
        let ard = this.around(cx,cy).toKeyArray()
        ard.push([cx,cy].toKey())
        //put mines
        let mines = this.currentDifficulty.mines
        while (mines>0) {
            let rx = Math.floor(Math.random()*(this.currentDifficulty.width)),
                ry = Math.floor(Math.random()*(this.currentDifficulty.height));
            if (tls[rx+","+ry].n!==9&&ard.indexOf(rx+","+ry)===-1) {
                tls[rx+","+ry].n = 9
                mines--;
            }
        }
        //calculate other numbers
        for (let i=0;i<this.currentDifficulty.width;i++){
            for (let j=0;j<this.currentDifficulty.height;j++){
                if (tls[i+","+j].n===9) continue
                tls[i+","+j].n = this.around(i,j).toKeyArray().filter(v => tls[v].n===9).length
            }
        }
    }

    gameover = (win) => {
        //!todo
        this.gameEnded = true
        this.props.gameEnd()
        if (win) {
            let tls = this.state.tiles
            this.revealFullMap({tls})
            this.setState({
                tiles: tls
            })
            window.setTimeout(() => {window.alert("You Won!")}, 500)
        }
        else {
            let tls = this.state.tiles
            this.revealBombs({tls})
            this.setState({
                tiles: tls
            })
            window.setTimeout(() => {window.alert("You Lost.")}, 500)
        }
    }

    around = (x,y) => {
        const delta = [[1,0],[-1,0],[-1,-1],[0,-1],[1,-1],[-1,1],[0,1],[1,1]]
        return delta.map(v => [x+v[0],y+v[1]]).filter(v => this.isInBound(v[0],v[1]))
    }

    isInBound = (x,y) => {
        return x>=0&&x<this.currentDifficulty.width&&y>=0&&y<this.currentDifficulty.height;
    }

    genKey = (x,y) => (x+","+y)

    genArr = (x,y) => [x,y]

    revealBombs = (ref) => {
        let tls = ref.tls
        for (let i=0;i<this.currentDifficulty.width;i++){
            for (let j=0;j<this.currentDifficulty.height;j++){
                let k = this.genKey(i,j)
                if (tls[k].n===9) {
                    if (!tls[k].flagged) {
                        tls[k].text = mineImage
                    }
                }
                else if (tls[k].flagged) { //wrong flag
                    tls[k].state = "wrongflag"
                }
            }
        }
    }

    revealFullMap = (ref) => {
        let tls = ref.tls
        for (let i=0;i<this.currentDifficulty.width;i++){
            for (let j=0;j<this.currentDifficulty.height;j++){
                let k = this.genKey(i,j)
                if (tls[k].n===9) {
                    if (!tls[k].flagged) {
                        tls[k].state = "flagged"
                        tls[k].text = flagImage
                        tls[k].flagged = true
                    }
                }
                else if (tls[k].flagged) { //wrong flag, shouldn't happen in this function since it's called by gameover(1)
                    tls[k].state = "wrongflag"
                }
                else if (!tls[k].clicked) {
                    tls[k].state = "opened"
                    tls[k].clicked = true
                }
            }
        }
    }

    flag = (ref) => {
        let tls = ref.tls
        let tl = tls[this.genKey(ref.x,ref.y)]
        if (tl.clicked) return
        if (tl.flagged) {
            tl.flagged = false
            tl.state = "unopened"
            tl.text = ""
            this.setState({
                flags: this.state.flags - 1
            })
        }
        else {
            tl.flagged = true
            tl.state = "flagged"
            tl.text = flagImage
            this.setState({
                flags: this.state.flags + 1
            })
        }
    }

    click = (ref) => {
        let tls = ref.tls
        let tl = tls[this.genKey(ref.x,ref.y)]
        if (tl.clicked) {
            return
        }
        else if (tl.flagged) {
            this.flag({tls,x:ref.x,y:ref.y})
        }
        else {
            tl.clicked = true
            if (tl.n===9) {
                tl.state = "mine"
                tl.text = mineImage
                this.gameover(false)
                return
            }
            else {
                this.setState((st) => {
                    console.log("inside", st.grids, st.flags, st.mines, st.opens+1)
                    if (st.grids==st.mines+st.opens+1) {
                        this.gameover(true)
                        return {}
                    }
                    return {
                        opens: st.opens + 1
                    }
                })
                tl.text = tl.n===0?" ":tl.n
                tl.state = "opened"
                if (tl.n===0) {
                    for (let k of this.around(tl.x,tl.y)) {
                        this.click({tls,x:k[0],y:k[1]})
                    }
                }
            }
        }
    }

    reveal = (ref) => {
        let tls = ref.tls
        let ard = this.around(ref.x,ref.y).toKeyArray()
        
        if (ard.filter(v => tls[v].flagged).length==tls[this.genKey(ref.x,ref.y)].n) this.revealMode = "open"
        else this.revealMode = "normal"

        this.revealArray = ard.filter(v => (!tls[v].flagged&&!tls[v].clicked));
        for (let i of this.revealArray) {
            tls[i].state = "reveal"
        }
        this.revealing = true
    }

    endReveal = (ref) => {
        let tls = ref.tls
        if (this.revealMode=="normal") {
            for (let i of this.revealArray) {
                tls[i].state = "unopened"
            }
        }
        else if (this.revealMode=="open") {
            for (let i of this.revealArray) {
                this.click({tls,x:i.toArr()[0],y:i.toArr()[1]})
            }
        }
        this.revealing = false
    }

    mouseDown = (tl,e) => {
        //console.log(tl, e.nativeEvent.which)
        if (this.gameEnded) return
        e.preventDefault()
        let tls = this.state.tiles
        switch (e.nativeEvent.which) {
            case 1: //left click
                this.hold[0]++
                if (this.hold[1]) {
                    this.reveal({tls,x:tl.x,y:tl.y})
                    this.setState({
                        tiles: tls
                    })
                }
                break
            case 3: //right click
                this.hold[1]++
                if (this.hold[0]) {
                    this.reveal({tls,x:tl.x,y:tl.y})
                    this.setState({
                        tiles: tls
                    })
                }
                break
            default:
                break
        }
    }

    mouseUp = (tl, e) => {
        //console.log(tl, e.nativeEvent.which)
        if (this.gameEnded) return
        e.preventDefault()
        let tls = this.state.tiles
        switch (e.nativeEvent.which) {
            case 1: //left click
                this.hold[0]--
                if (this.revealing) {
                    this.endReveal({tls})
                    this.setState({
                        tiles: tls
                    })
                    break
                }
                if (this.firstClick) {
                    this.generateMap({tls,x:tl.x,y:tl.y})
                    console.log(tls)
                    this.firstClick = false
                }
                this.click({tls,x:tl.x,y:tl.y})
                this.setState({
                    tiles: tls
                })
                break
            case 3: //right click
                this.hold[1]--
                if (this.revealing) {
                    this.endReveal({tls})
                    this.setState({
                        tiles: tls
                    })
                    break
                }
                this.flag({tls,x:tl.x,y:tl.y})
                this.setState({
                    tiles: tls
                })
                break
            default:
                break
        }
    }

    contextMenu = (e) => {
        e.preventDefault()
    }

    componentDidMount() {
        let tm = (window.innerWidth - 40)/(this.settings.tileSize*this.currentDifficulty.width);
        let dm = (window.innerHeight - 60 - 60 - 10 - 30 - 40)/(this.settings.tileSize*this.currentDifficulty.height);
        this.mainElement.current.style.transform = "scale("+Math.min(tm,dm)+")";
        this.mainElement.current.style.left = "calc( 50% - " + (Math.min(tm,dm)*((this.settings.tileSize+1)*this.currentDifficulty.width) / 2) + "px )";

        //this.mouseDownListener = window.addEventListener("mousedown", this.mouseDown)
        //this.mouseUpListener = window.addEventListener("mouseup", this.mouseUp)
        console.log("MineSweeper mounted, game started.")
    }

    componentWillUnmount() {
        //console.log("MineSweeper will unmount")
        /*
        this.paused = true
        window.removeEventListener("keydown", this.keyDownListener)
        window.removeEventListener("keyup", this.keyUpListener)
        */
        this.props.leaveGame()
    }

    render() {
        return (
            <div>
                <div className="modal" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <p className="text-center arcade-game-toosmall">Sorry, your screen is too small to play this game.</p>
                </div>
                <div className="arcade-mine-outer">
                    <div className="arcade-mine-title">
                        <h4 className="text-center d-flex justify-content-between arcade-mine-title-inner">
                            <span style={{visibility:"hidden"}}><button className="btn btn-secondary">Settings</button></span>
                            <span>Mine Sweeper</span>
                            <span><button className="btn btn-secondary">Settings</button></span>
                        </h4>
                        <hr className="arcade-mine-hr" />
                    </div>
                    <div className="arcade-mine-scores">
                        <div className="arcade-mine-scoreSection">
                            <div className="row">
                                <div className="col text-right small-padding">
                                    Time: 
                                </div>
                                <div className="col small-padding">
                                    {this.state.time}
                                </div>
                            </div>
                        </div>
                        <div className="arcade-mine-scoreSection">
                            <div className="row">
                                <div className="col text-right small-padding">
                                    Mode: 
                                </div>
                                <div className="col small-padding">
                                    {this.state.mode}
                                </div>
                            </div>
                        </div>
                        <div className="arcade-mine-scoreSection">
                            <div className="row">
                                <div className="col text-right small-padding">
                                    Mines: 
                                </div>
                                <div className="col small-padding">
                                    {this.state.flags} / {this.state.mines}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="arcade-mine-game" ref={this.mainElement}>
                        {
                            Object.entries(this.state.tiles).map(([key, value], id) => (
                                <div className={"arcade-mine-tile "+value.state} key={id} style={{
                                    width: (this.settings.tileSize+1)+"px",
                                    height: (this.settings.tileSize+1)+"px",
                                    left: this.settings.tileSize*value.x+"px",
                                    top: this.settings.tileSize*value.y+"px"
                                }} onMouseDown={this.mouseDown.bind(this, value)} onMouseUp={this.mouseUp.bind(this, value)} onContextMenu={this.contextMenu}>
                                    {value.text}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Minesweeper
