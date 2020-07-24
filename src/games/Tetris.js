import React, { Component } from 'react'
import Modal from '../components/Modal'
import '../css/Game.Tetris.css'

class CurrentShape {
    constructor(props) {
        this.shape = props.shape
        this.preX = null
        this.preY = null
        this.x = props.x
        this.y = props.y
        this.flip = 0
    }

    remove = (ref) => {
        let tls = ref.tls
        let self = ref.self
        for (let i of this.shape.content[this.flip]) {
            if (self.isInBorder(this.x+i.x,this.y+i.y)){
                tls[this.y+i.y][this.x+i.x].color = "var(--main-light)"
                tls[this.y+i.y][this.x+i.x].hasBlock = false
                tls[this.y+i.y][this.x+i.x].current = false
            }
        }
    }

    add = (ref) => {
        let tls = ref.tls
        let self = ref.self
        for (let i of this.shape.content[this.flip]) {
            if (self.isInBorder(this.x+i.x,this.y+i.y)){
                tls[this.y+i.y][this.x+i.x].color = this.shape.color
                tls[this.y+i.y][this.x+i.x].hasBlock = true
                tls[this.y+i.y][this.x+i.x].current = true
            }
        }
    }

    noLongerCurrent = (ref) => {
        let tls = ref.tls
        let self = ref.self
        for (let i of this.shape.content[this.flip]) {
            if (self.isInBorder(this.x+i.x,this.y+i.y)){
                tls[this.y+i.y][this.x+i.x].current = false
            }
        }
    }

    removePre = (ref) => {
        let tls = ref.tls
        let self = ref.self
        if (this.preX!=null) {
            //remove old pre
            for (let i of this.shape.content[this.flip]) {
                if (self.isInBorder(this.preX+i.x,this.preY+i.y) && !tls[this.preY+i.y][this.preX+i.x].current){
                    tls[this.preY+i.y][this.preX+i.x].color = "var(--main-light)"
                    tls[this.preY+i.y][this.preX+i.x].hasBlock = false
                    tls[this.preY+i.y][this.preX+i.x].current = false
                }
            }
        }
    }

    newPre = (ref) => {
        let tls = ref.tls
        let self = ref.self

        let ny = this.y + 1
        while (ny<20&&(!self.checkCollapse({shape:this.shape, flip:this.flip, x:this.x, y:ny, tls}))) {
            ny++;
        }
        ny--;
        
        this.preX = this.x
        this.preY = ny
        //add new
        for (let i of this.shape.content[this.flip]) {
            if (self.isInBorder(this.preX+i.x,this.preY+i.y) && !tls[this.preY+i.y][this.preX+i.x].current){
                tls[this.preY+i.y][this.preX+i.x].color = "#989898"
                tls[this.preY+i.y][this.preX+i.x].hasBlock = false
                tls[this.preY+i.y][this.preX+i.x].current = false
            }
        }
    }
}

class Tile {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.size = props.size;
        this.reset()
    }
    reset = () => {
        this.color = "var(--main-light)";
        this.hasBlock = false;
        this.current = false;
    }
    resetReturn = () => {
        this.reset()
        return this
    }
    assign = (values) => {
        this.color = values.color;
        this.hasBlock = values.hasBlock;
        this.current = values.current;
    }
}

export class Tetris extends Component {

    blocks = [
        {
            name: "I",
            content: [
                [{ x: 0, y: -3 }, { x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }],
                [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]
            ],
            bounds: [ //boundary of x of each flip
                [0, 0],
                [-1, 2]
            ],
            height: [4, 2],
            color: "#1bef18"
        },
        {
            name: "J",
            content: [
                [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }],
                [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
                [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }],
                [{ x: -1, y: -2 }, { x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }]
            ],
            bounds: [ //boundary of x of each flip
                [-1, 1],
                [0, 1],
                [-1, 1],
                [-1, 0]
            ],
            height: [2, 3, 2, 3],
            color: "#ffeb3b"
        },
        {
            name: "L",
            content: [
                [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: -1 }],
                [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: -2 }],
                [{ x: 1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }],
                [{ x: -1, y: 0 }, { x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }]
            ],
            bounds: [ //boundary of x of each flip
                [-1, 1],
                [0, 1],
                [-1, 1],
                [-1, 0]
            ],
            height: [2, 3, 2, 3],
            color: "#03a9f4"
        },
        {
            name: "O",
            content: [
                [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }]
            ],
            bounds: [ //boundary of x of each flip
                [0, 1]
            ],
            height: [2],
            color: "#f97e00"
        },
        {
            name: "S",
            content: [
                [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 1, y: -1 }],
                [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }]
            ],
            bounds: [ //boundary of x of each flip
                [-1, 1],
                [0, 1]
            ],
            height: [2, 3],
            color: "#2afff5"
        },
        {
            name: "Z",
            content: [
                [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }, { x: 1, y: 0 }],
                [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: -2 }]
            ],
            bounds: [ //boundary of x of each flip
                [-1, 1],
                [-1, 0]
            ],
            height: [2, 3],
            color: "#f44336"
        },
        {
            name: "T",
            content: [
                [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }],
                [{ x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: -1 }],
                [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: -1 }],
                [{ x: -1, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -1 }, { x: 0, y: 0 }]
            ],
            bounds: [ //boundary of x of each flip
                [-1, 1],
                [0, 1],
                [-1, 1],
                [-1, 0]
            ],
            height: [2, 3, 2, 3],
            color: "#831df3"
        }
    ]

    constructor(props) {
        super(props)

        //generate initial tiles (same as in this.init)
        let tl = []
        for (let i=0;i<20;i++){
            let tt = []
            for (let j=0;j<10;j++){
                tt.push(new Tile({x:i,y:j,size:30}))
            }
            tl.push(tt)
        }
        let ntl = []
        for (let i=0;i<4;i++){
            let ntt = []
            for (let j=0;j<3;j++){
                ntt.push(new Tile({x:i,y:j,size:30}))
            }
            ntl.push(ntt)
        }

        this.state = {
            tiles: tl,
            score: 0,
            level: 1,
            currentSpeed: 800,
            speedConverted: 1.25,
            nextShape: new CurrentShape({shape:this.randomBlock(),x:1,y:3,flip:0}),
            nextTiles: ntl,
            current: new CurrentShape({shape:null,x:null,y:null,flip:null}),
            modal: {
                show: false,
                buttons: []
            },
            init: false
        }

        //create refs
        this.mainElement = React.createRef()
    }

    settings = {
        startPos: [4, -1],
        userMoveInterval: 120,
        beforeClearline: 250
    }

    paused = false

    speeded = false

    moveDir = 0

    speedChange = [800, 700, 650, 600, 550, 500, 450, 400, 350, 320, 280, 240, 220, 200, 180, 160, 140, 120, 100, 90, 80, 70, 60, 50]

    speedChangeCondition = [0, 300, 500, 700, 1000, 1600, 2400, 3600, 4800, 6000, 8800, 9900, 12000, 14000, 18000, 22000, 25000, 35000, 60000, 90000, 130000, 160000, 200000, 250000]
    
    goDownTimeout = null

    gameEnded = false

    init = () => {
        if (!this.paused) {
            this.paused = true
            window.clearTimeout(this.goDownTimeout)
        }
        //generate initial tiles
        let tl = []
        for (let i=0;i<20;i++){
            let tt = []
            for (let j=0;j<10;j++){
                tt.push(new Tile({x:i,y:j,size:30}))
            }
            tl.push(tt)
        }
        let ntl = []
        for (let i=0;i<4;i++){
            let ntt = []
            for (let j=0;j<3;j++){
                ntt.push(new Tile({x:i,y:j,size:30}))
            }
            ntl.push(ntt)
        }

        //reset variables
        this.moveDir = 0

        //load highscore
        let hs = this.props.highscore[this.props.gameCode]
        if (hs===null||(typeof hs)!=="number") {
            this.props.highscoreUpdate({gameCode:this.props.gameCode, score:0})
        }

        this.setState((st) => ({
            tiles: st.tiles.map((v) => (v.map(w => (w.resetReturn())))),
            score: 0,
            level: 1,
            currentSpeed: 800,
            speedConverted: 1.25,
            nextShape: new CurrentShape({shape:this.randomBlock(),x:1,y:3,flip:0}),
            nextTiles: ntl,
            current: new CurrentShape({shape:null,x:null,y:null,flip:null}),
            paused: false,
            modal: {
                show: false,
                buttons: []
            },
            init: true
        }))

        this.paused = false;
        this.gameEnded = false;

        this.mainElement.current.focus()
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (!prevState.init&&this.state.init) {
            this.newBlock()
            this.goDown()
            this.setState({
                init: false
            })
        }
    }

    showModal = (title, content, buttons) => {
        if ((typeof content)==="function") {
            content = content()
        }
        this.setState({
            modal: {
                show: true,
                title,
                content,
                buttons,
                close: this.closeModal
            }
        })
    }

    closeModal = () => {
        this.setState({
            modal: {
                show: false,
                buttons: []
            }
        })
    }

    updateHighscore = (ns) => {
        this.props.highscoreUpdate({gameCode: this.props.gameCode, score: ns})
    }

    restartClick = (e) => {
        e.nativeEvent.target.blur()
        this.init()
    }

    gameover = () => {
        this.gameEnded = true
        this.paused = true
        this.setState({
            paused: this.paused
        })
        let nhs = false
        if (this.state.score>this.props.highscore[this.props.gameCode]) {
            this.updateHighscore(this.state.score)
            nhs = true
        }
        window.setTimeout(() => {
            this.showModal("Game Over", (
                <div>
                    <h4 className="text-center">Game Over</h4>
                        <br />
                        <div className="row">
                            <div className="col">
                                <p className="text-right">Score:</p>
                            </div>
                            <div className="col">
                                <p>{this.state.score}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className="text-right">High Score:</p>
                            </div>
                            <div className="col">
                                <p>{nhs?this.state.score:this.props.highscore[this.props.gameCode]}</p>
                            </div>
                        </div>
                </div>
            ), [
                {
                    type: "primary",
                    text: "Select Game",
                    callback: this.props.leaveGame
                },
                {
                    type: "success",
                    text: "Play Again",
                    callback: () => {
                        this.closeModal()
                        this.init()
                    }
                },
                {
                    type: "secondary",
                    text: "Close",
                    callback: this.closeModal
                }
            ])
        }, 250)
        this.props.gameEnd()
    }

    clearLines = (lines) => {
        let tls = this.state.tiles
        let cs = this.state.current
        cs.removePre({self:this,tls})

        let sd = false
        for (let i=19;i>=1;i--) {
            if (!sd && !lines[i]) continue
            sd = true
            let ni = i-1
            while (ni>=1 && lines[ni]) {
                ni--
            }
            lines[ni] = true
            for (let j=0;j<10;j++) {
                if (tls[i][j].current || tls[ni][j].current) continue
                tls[i][j].assign({color: tls[ni][j].color, hasBlock: tls[ni][j].hasBlock, current: tls[ni][j].current})
            }
        }

        cs.newPre({self:this,tls})
        this.setState({
            tiles: tls,
            current: cs
        })
    }

    checkLines = () => {
        let dellines = {}
        let tls = this.state.tiles
        let totalLines = 0
        for (let i=0;i<20;i++) {
            let j = 0;
            for (;j<10;j++) {
                if (!tls[i][j].hasBlock) break
            }
            if (j>=10) {
                dellines[i] = true
                totalLines++;
                for (let k=0;k<10;k++) {
                    tls[i][k].color = "#fff8dc"
                }
            }
        }
        if (totalLines>0) {
            this.setState({
                tiles: tls
            })
            this.addScore(Math.pow(2, totalLines - 1) * 100)
            window.setTimeout(this.clearLines.bind(this, dellines), this.settings.beforeClearline)    
        }
        else {
            this.addScore(10)
        }
    }

    isInWidthBounds = (shape,flip,x) => {
        let a = x + shape.bounds[flip][0]
        let b = x + shape.bounds[flip][1]
        return a>=0 && b<10
    }

    widthBoundDelta = (shape, flip, x) => {
        let a = x + shape.bounds[flip][0]
        let b = x + shape.bounds[flip][1]
        if (a<0) return 0-a
        if (b>=10) return 9-b
        return 0
    }

    isInBorder = (x,y) => {
        return x>=0&&x<10&&y>=0&&y<20
    }

    checkCollapse = (ref) => {
        let tls = ref.tls
        let dr = ref.shape.content[ref.flip]
        for (let i of dr) {
            if (this.isInBorder(ref.x+i.x, ref.y+i.y) && tls[ref.y+i.y][ref.x+i.x].hasBlock && !tls[ref.y+i.y][ref.x+i.x].current) {
                return true
            }
        }
        return false
    }

    rotate = () => {
        if (this.paused) return
        let cs = this.state.current
        let tls = this.state.tiles

        let newFlip = cs.flip + 1
        if (newFlip>=cs.shape.content.length) newFlip = 0

        let delta = 0
        if (!this.isInWidthBounds(cs.shape, newFlip, cs.x)) {
            delta = this.widthBoundDelta(cs.shape, newFlip, cs.x)
        }

        if (!this.checkCollapse({shape:cs.shape, flip:newFlip, x:cs.x+delta, y:cs.y, tls})) {
            //remove old
            cs.remove({self:this,tls})
            cs.removePre({self:this,tls})
            //
            cs.x += delta
            cs.flip = newFlip
            //add new
            cs.add({self:this,tls})
            cs.newPre({self:this,tls})
            //update state
            this.setState({
                current: cs,
                tiles: tls
            })
        }
    }

    move = () => {
        if (this.paused) return
        let cs = this.state.current
        let tls = this.state.tiles
        let dir = this.moveDir
        if (dir===0) return

        if (this.isInWidthBounds(cs.shape, cs.flip, cs.x+dir) && !this.checkCollapse({shape:cs.shape, flip:cs.flip, x:cs.x+dir, y:cs.y, tls})) {
            //remove old
            cs.remove({self:this,tls})
            cs.removePre({self:this,tls})
            //
            cs.x += dir
            //add new
            cs.add({self:this,tls})
            cs.newPre({self:this,tls})
            //update state
            this.setState({
                current: cs,
                tiles: tls
            })
        }
    }

    goDown = () => {
        if (this.paused) return
        let tls = this.state.tiles
        let cs = this.state.current
        
        //go down
        cs.y += 1
        if (cs.y>=20 || this.checkCollapse({shape:cs.shape, flip:cs.flip, x:cs.x, y:cs.y, tls})) { //can't move anymore
            cs.y -= 1
            if (cs.y<0) {
                this.gameover()
                return
            }
            //they're not current tiles anymore, so
            cs.noLongerCurrent({self:this,tls})
            //check for line clears
            this.checkLines()
            //move on to a new block
            this.newBlock()
        }
        else { //proceeds to move
            cs.y -= 1
            //clear tiles before movement
            cs.remove({self:this,tls})
            //
            cs.y += 1
            //add tiles after movement
            cs.add({self:this,tls})
        }
        
        //update state
        this.setState({
            tiles: tls,
            current: cs
        })

        this.goDownTimeout = window.setTimeout(this.goDown, this.speeded?50:this.state.currentSpeed)
    }

    newBlock = () => {
        let ns = this.state.nextShape
        let cs = this.state.current
        let tls = this.state.tiles
        cs.shape = ns.shape
        cs.x = this.settings.startPos[0]
        cs.y = this.settings.startPos[1]
        cs.flip = 0
        cs.preX = cs.preY = null
        cs.newPre({self:this,tls})

        
        let ntls = this.state.nextTiles
        ns.remove({self:this,tls:ntls})
        ns.shape = this.randomBlock()
        ns.add({self:this,tls:ntls})

        this.setState({
            current: cs,
            tiles: tls,
            nextShape: ns,
            nextTiles: ntls
        })
    }

    randomBlock = () => {
        return this.blocks[Math.floor(Math.random()*this.blocks.length)]
    }

    addScore = (s) => {
        let ns = this.state.score + s
        let nl = this.state.level
        if (ns>=this.speedChangeCondition[nl]) {
            if (nl+1<this.speedChange.length) {
                nl++
                this.setState({
                    score: ns,
                    level: nl,
                    currentSpeed: this.speedChange[nl-1],
                    speedConverted: (1000/this.speedChange[nl-1]).toFixed(2)
                })
            }
            else {
                this.setState({
                    score: ns
                })
            }
        }
        else {
            this.setState({
                score: ns
            })
        }
    }

    hardLand = () => {
        if (this.paused) return
        let cs = this.state.current
        let tls = this.state.tiles
        if (cs.preY!=null) {
            cs.remove({self:this,tls})
            cs.y = cs.preY
            cs.add({self:this,tls})
            cs.noLongerCurrent({self:this,tls})

            if (cs.y<0) {
                this.gameover()
                return
            }

            this.setState({
                current: cs,
                tiles: tls
            })
            this.checkLines()
            this.newBlock()
        }
    }

    componentDidMount() {
        let tm = this.mainElement.current.getBoundingClientRect().width/(30*10);
        let dm = (window.innerHeight - 60 - window.innerHeight * 0.05 - 20)/(30*20);
        this.mainElement.current.style.transform = "scale("+Math.min(tm,dm)+")";

        this.keyDownListener = window.addEventListener("keydown", this.keyDown)
        this.keyUpListener = window.addEventListener("keyup", this.keyUp)
        this.init()
        //console.log("Tetris mounted, game started.")
    }

    componentWillUnmount() {
        //console.log("Tetris will unmount")
        this.paused = true
        this.gameEnded = true
        window.removeEventListener("keydown", this.keyDownListener)
        window.removeEventListener("keyup", this.keyUpListener)
        this.props.leaveGame()
    }

    speedup = () => {
        this.speeded = true
        clearTimeout(this.goDownTimeout)
        this.goDown()
    }

    slowdown = () => (this.speeded = false)

    keyDown = (e) => {
        //console.log(e.keyCode);
        switch (e.keyCode) {
            case 37:
                if (!this.moveDir) {
                    this.moveDir = -1
                    this.move()
                    this.moveInterval = window.setInterval(this.move, this.settings.userMoveInterval)
                } else {
                    this.moveDir = -1
                }
                break
            case 39:
                if (!this.moveDir) {
                    this.moveDir = 1
                    this.move()
                    this.moveInterval = window.setInterval(this.move, this.settings.userMoveInterval)
                } else {
                    this.moveDir = 1
                }
                break
            case 38:
                this.rotate()
                break
            case 40:
                this.speedup()
                break
            case 32:
                this.hardLand()
                break
            case 27:
                if (this.gameEnded) break
                this.paused = !this.paused //separate from state.paused, since state updates may be asynchronous
                this.setState({
                    paused: this.paused
                })
                if (this.paused) {
                    window.clearTimeout(this.goDownTimeout)
                }
                else {
                    this.goDown()
                }
                break
            default:
                break
        }
    }

    keyUp = (e) => {
        switch (e.keyCode) {
            case 37:
            case 39:
                this.moveDir = 0
                window.clearInterval(this.moveInterval)
                break
            case 38:
                break
            case 40:
                this.slowdown()
                break
            default:
                break
        }
    }

    render() {
        return (
            <div>
                <Modal modal={this.state.modal} />
                <div className="container">
                    <p className="text-center arcade-game-toosmall">Sorry, your screen is too small to play this game.</p>
                </div>
                <div className="arcade-tetris-outer">
                    <div className="row">
                        <div className="col-md-4">
                            <div style={{padding:"0 10px"}}>
                                <h5 className="text-center">Next Shape</h5>
                                <div className="arcade-tetris-nextshape">
                                    {
                                        this.state.nextTiles.map((a,aid) => (
                                            <div className="arcade-tetris-next-row" key={aid}>
                                                {
                                                    a.map((b,bid) => (
                                                        <div className="arcade-tetris-tile" key={bid} style={{
                                                            width: (b.size+1)+"px",
                                                            height: (b.size+1)+"px",
                                                            top: (b.size*b.x)+"px",
                                                            left: (b.size*b.y)+"px",
                                                            backgroundColor: b.color
                                                        }}></div>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="arcade-tetris-leftButtons">
                                    <button className="btn btn-secondary" onClick={this.restartClick}>Restart</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="arcade-tetris-game" ref={this.mainElement}>
                                {
                                    this.state.tiles.map((a,aid) => (
                                        <div className="arcade-tetris-row" key={aid}>
                                            {
                                                a.map((b,bid) => (
                                                    <div className="arcade-tetris-tile" key={bid} style={{
                                                        width: (b.size+1)+"px",
                                                        height: (b.size+1)+"px",
                                                        top: (b.size*b.x)+"px",
                                                        left: (b.size*b.y)+"px",
                                                        backgroundColor: b.color
                                                    }}></div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h3>
                                Tetris 
                                <span className="arcade-tetris-paused">{
                                    (this.state.paused ? "PAUSED" : "")
                                }</span>
                            </h3>
                            <div className="row arcade-tetris-scores">
                                <div className="col-md-3 arcade-tetris-desc">
                                    Score
                                </div>
                                <div className="col-md-9 arcade-tetris-score">
                                    {this.state.score}
                                </div>
                                <div className="col-md-3 arcade-tetris-desc">
                                    Level
                                </div>
                                <div className="col-md-9 arcade-tetris-score">
                                    {this.state.level}
                                </div>
                                <div className="col-md-3 arcade-tetris-desc">
                                    Speed
                                </div>
                                <div className="col-md-9 arcade-tetris-score">
                                    {this.state.speedConverted} <span style={{fontSize:"0.8rem"}}>blocks/second</span>
                                </div>
                            </div>
                            <hr />
                            <div className="row arcade-tetris-scores">
                                <div className="col-md-12">
                                    <h5>Your High Score</h5>
                                </div>
                                <div className="col-md-3 arcade-tetris-desc">
                                    Score
                                </div>
                                <div className="col-md-9 arcade-tetris-score">
                                    {this.props.highscore[this.props.gameCode]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tetris
