import React, { Component } from 'react'
import uuid from 'react-uuid'

const tileColors = ['#3C3A32','#EEE4DA','#EDE0C8','#F2B179','#F59563','#F67C5F','#F65E3B','#EDCF72','#EDCC61','#EDC850','#EDC53F','#EDC22E']
const tileSize = 100
const tileMargin = 10

class Tile {

    constructor(props) {
        this.x = props.x
        this.y = props.y
        this.n = props.n
        this.isNew = true
        this.isMerged = false
        this.destroyed = false
        this.calcProps()
    }

    calcProps = () => {
        this.ind = this.x*4 + this.y
        this.top = this.x * (tileSize + tileMargin) + 1.5 * tileMargin
        this.left = this.y * (tileSize + tileMargin) + 1.5 * tileMargin
        this.transform = "translate( "+this.left+"px , "+this.top+"px )"
        this.number = 2**this.n
        this.color = this.n>=tileColors.length?tileColors[0]:tileColors[this.n]
        this.fontColor = this.n==1?"#776E65":"#F9F6F2"
    }
}

export class TwentyFortyEight extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tiles: {}        }

        this.backgroundTiles = [];
        for (let i=0;i<4;i++) {
            for (let j=0;j<4;j++) {
                this.backgroundTiles.push([i,j])
            }
        }

        this.mainElement = React.createRef()
    }

    valid = new Array(16).fill(true)
    validCount = 16

    numbers = new Array(16).fill(0)
    numToTile = new Array(16).fill(-1)

    generateTiles = () => {
        console.log("Generate tiles...")
        if (this.validCount===0) {
            window.alert("No More Valid Tiles, Game Over")
            return
        }

        let tls = this.state.tiles

        let howMany = Math.min(Math.random()>0.9?2:1, this.validCount)
        do {
            let ri = Math.floor(Math.random()*16)
            while (!this.valid[ri]) {
                ri = Math.floor(Math.random()*16)
            }
            let rn = Math.random()>0.9?2:1;
            
            let uni = uuid()
            tls[uni] = new Tile({x:parseInt(ri/4),y:ri%4,n:rn})
            this.valid[ri] = false
            this.validCount--
            this.numbers[ri] = rn
            this.numToTile[ri] = uni
            console.log("+"+ri)
            howMany--
        } while (howMany>0)

        this.setState({
            tiles: tls
        })
    }

    move = (dx, dy) => {
        let tls = this.state.tiles
        for (let i in tls) {
            if (tls[i].destroyed||tls[i].isMerged) {
                delete tls[i]
            }
            else {
                if (tls[i].isNew) tls[i].isNew = false
            }
        }
        let moved = false
        for (let i=0;i<4;i++) {
            for (let j=0;j<4;j++) {
                let k = (dx>0?3-i:i)*4 + (dy>0?3-j:j)
                if (this.numbers[k]!==0) {
                    let lastOne = -1
                    if (!dy) {
                        for (let m=k;m<16&&m>=0;m+=dx*4) {
                            if (m===k) continue
                            if (this.numbers[m]!==0) {
                                if (this.numbers[m]===this.numbers[k]) {
                                    console.log("+"+m+" -"+k)
                                    this.numbers[m]++
                                    this.numbers[k] = 0

                                    let mgid = uuid()
                                    tls[mgid] = new Tile({x:tls[this.numToTile[m]].x,y:tls[this.numToTile[m]].y,n:tls[this.numToTile[m]].n+1})
                                    tls[mgid].isNew = false
                                    tls[mgid].isMerged = true

                                    tls[this.numToTile[m]].n++
                                    tls[this.numToTile[m]].calcProps()

                                    tls[this.numToTile[k]].n++
                                    tls[this.numToTile[k]].x = tls[this.numToTile[m]].x
                                    tls[this.numToTile[k]].y = tls[this.numToTile[m]].y
                                    tls[this.numToTile[k]].calcProps()

                                    tls[this.numToTile[k]].destroyed = true
                                    this.numToTile[k] = -1

                                    this.valid[k] = true
                                    this.validCount++

                                    lastOne = -1

                                    moved = true
                                }
                                break
                            }
                            lastOne = m
                        }
                    }
                    else {
                        for (let m=k;m>=parseInt(k/4)*4&&m<parseInt(k/4+1)*4;m+=dy) {
                            if (m===k) continue
                            if (this.numbers[m]!==0) {
                                if (this.numbers[m]===this.numbers[k]) {
                                    console.log("+"+m+" -"+k)
                                    this.numbers[m]++
                                    this.numbers[k] = 0

                                    let mgid = uuid()
                                    tls[mgid] = new Tile({x:tls[this.numToTile[m]].x,y:tls[this.numToTile[m]].y,n:tls[this.numToTile[m]].n+1})
                                    tls[mgid].isNew = false
                                    tls[mgid].isMerged = true

                                    tls[this.numToTile[m]].n++
                                    tls[this.numToTile[m]].calcProps()

                                    tls[this.numToTile[k]].n++
                                    tls[this.numToTile[k]].x = tls[this.numToTile[m]].x
                                    tls[this.numToTile[k]].y = tls[this.numToTile[m]].y
                                    tls[this.numToTile[k]].calcProps()

                                    tls[this.numToTile[k]].destroyed = true
                                    this.numToTile[k] = -1

                                    this.valid[k] = true
                                    this.validCount++

                                    lastOne = -1

                                    moved = true
                                }
                                break
                            }
                            lastOne = m
                        }
                    }
                    if (lastOne!==-1) {
                        console.log(k+"-->"+lastOne)
                        this.numbers[lastOne] = this.numbers[k]
                        this.numbers[k] = 0
                        this.numToTile[lastOne] = this.numToTile[k]
                        this.numToTile[k] = -1

                        let nx = parseInt(lastOne/4)
                        let ny = lastOne%4

                        tls[this.numToTile[lastOne]].x = nx
                        tls[this.numToTile[lastOne]].y = ny
                        tls[this.numToTile[lastOne]].calcProps()

                        this.valid[k] = true
                        this.valid[lastOne] = false

                        moved = true
                    }
                }
            }
        }
        
        this.setState({
            tiles: tls
        })

        if (moved) this.generateTiles()
    }

    init = () => {

        this.valid = new Array(16).fill(true)
        this.validCount = 16
        this.numbers = new Array(16).fill(0)
        this.numToTile = new Array(16).fill(-1)

        //scale game to window size
        let tm = (window.innerWidth - 40)/(tileSize*4+tileMargin*6);
        let dm = (window.innerHeight - 60 - 60 - 40)/(tileSize*4+tileMargin*6);
        this.mainElement.current.style.transform = "scale("+Math.min(tm,dm)+")";
        this.mainElement.current.style.left = "calc( 50% - " + (Math.min(tm,dm)*(tileSize*4+tileMargin*5) / 2) + "px )";

        this.generateTiles()
    }

    keyDown = (e) => {
        switch (e.keyCode) {
            case 37:
                this.move(0,-1)
                break
            case 39:
                this.move(0,1)
                break
            case 38:
                this.move(-1,0)
                break
            case 40:
                this.move(1,0)
                break
            default:
                break
        }
    }

    componentDidMount() {

        this.keyDownListener = window.addEventListener("keydown", this.keyDown)

        this.init()
    }

    componentWillUnmount() {

        window.removeEventListener("keydown", this.keyDownListener)
        this.props.leaveGame()
    }

    render() {
        return (
            <div>
                <div className="container">
                    <p className="text-center arcade-game-toosmall">Sorry, your screen is too small to play this game.</p>
                </div>
                <div className="arcade-2048-outer">
                    <div className="arcade-2048-title">
                        <h4 className="text-center d-flex justify-content-between arcade-2048-title-inner">
                            <span><button className="btn btn-secondary">Restart</button></span>
                            <span>2048</span>
                            <span>
                                <button className="btn btn-secondary">Settings</button>
                            </span>
                        </h4>
                        <hr className="arcade-mine-hr" />
                    </div>
                    <div className="arcade-2048-game" ref={this.mainElement} style={{
                        width: (tileSize*4+tileMargin*6),
                        height: (tileSize*4+tileMargin*6)
                    }}>
                        {
                            Object.entries(this.state.tiles).map(([ind,v]) => (
                                <div className={"arcade-2048-tile"+(v.isNew?" new":"")+(v.isMerged?" merged":"")} key={ind} style={{
                                    width: (tileSize+1)+"px",
                                    height: (tileSize+1)+"px",
                                    transform: v.transform,
                                    backgroundColor: v.color,
                                    color: v.fontColor
                                }}>
                                    {
                                        v.isMerged?(<div className="arcade-2048-tile-inner">{v.number}</div>):v.number
                                    }
                                </div>
                            ))
                        }
                        {
                            this.backgroundTiles.map((v,ind) => (
                                <div className="arcade-2048-tile-background" key={ind} style={{
                                    width: (tileSize+1)+"px",
                                    height: (tileSize+1)+"px",
                                    top: (tileMargin*1.5+(tileSize+tileMargin)*v[0])+"px",
                                    left: (tileMargin*1.5+(tileSize+tileMargin)*v[1])+"px"
                                }}></div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default TwentyFortyEight
