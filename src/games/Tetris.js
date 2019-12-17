import React, { Component } from 'react'

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
                tls[this.y+i.y][this.x+i.x].color = "#fff"
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
        if (this.preX) {
            //remove old pre
            for (let i of this.shape.content[this.flip]) {
                if (self.isInBorder(this.preX+i.x,this.preY+i.y) && !tls[this.preY+i.y][this.preX+i.x].current){
                    tls[this.preY+i.y][this.preX+i.x].color = "#fff"
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
        this.color = "#fff";
        this.hasBlock = false;
        this.current = false;
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

        //generate initial tiles
        var tl = []
        for (let i=0;i<20;i++){
            var tt = []
            for (let j=0;j<10;j++){
                tt.push(new Tile({x:i,y:j,size:30}))
            }
            tl.push(tt)
        }
        this.state = {
            tiles: tl,
            score: 0,
            level: 1,
            currentSpeed: 800,
            speedConverted: 1.25,
            nextBlock: this.randomBlock(),
            current: new CurrentShape({shape:null,x:null,y:null,flip:null})
        }

        this.highScore = 0

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

    speedChange = [800, 700, 650, 600, 550, 500, 450, 400, 350, 320, 280, 240, 220, 200, 180, 160, 140, 120, 100, 90, 80, 70, 60, 50]

    speedChangeCondition = [0, 300, 500, 700, 1000, 1600, 2400, 3600, 4800, 6000, 8800, 9900, 12000, 14000, 18000, 22000, 25000, 35000, 60000, 90000, 130000, 160000, 200000, 250000]
    
    goDownTimeout = null

    init = () => {
        this.setState((state) => {
            let cs = this.speedChange[state.level-1]
            return {
                currentSpeed: cs,
                speedConverted: 1000/cs
            }
        })
        this.newBlock()
        this.goDown()
    }

    gameover = () => {
        //todo
        this.paused = true
        //window.alert("Game over.")
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
        let hasDellines = false
        for (let i=0;i<20;i++) {
            let j = 0;
            for (;j<10;j++) {
                if (!tls[i][j].hasBlock) break
            }
            if (j>=10) {
                dellines[i] = true
                hasDellines = true
                for (let k=0;k<10;k++) {
                    tls[i][k].color = "#fff8dc"
                }
            }
        }
        if (hasDellines) {
            this.setState({
                tiles: tls
            })
            window.setTimeout(this.clearLines.bind(this, dellines), this.settings.beforeClearline)    
        }
    }

    isInWidthBounds = (shape,flip,x) => {
        let a = x + shape.bounds[flip][0]
        let b = x + shape.bounds[flip][1]
        return a>=0 && b<10
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

        if (this.isInWidthBounds(cs.shape, newFlip, cs.x) && !this.checkCollapse({shape:cs.shape, flip:newFlip, x:cs.x, y:cs.y, tls})) {
            //remove old
            cs.remove({self:this,tls})
            cs.removePre({self:this,tls})
            //
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

    move = (dir) => {
        if (this.paused) return
        let cs = this.state.current
        let tls = this.state.tiles

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
        /* force update
        this.state.tiles = tls
        this.current = cs
        this.forceUpdate()
        */

        this.goDownTimeout = window.setTimeout(this.goDown, this.speeded?50:this.state.currentSpeed)
    }

    newBlock = () => {
        let bl = this.state.nextBlock
        let cs = this.state.current
        let tls = this.state.tiles
        cs.shape = bl
        cs.x = this.settings.startPos[0]
        cs.y = this.settings.startPos[1]
        cs.flip = 0
        cs.preX = cs.preY = null
        cs.newPre({self:this,tls})
        this.setState({
            current: cs,
            tiles: tls,
            nextBlock: this.randomBlock()
        })
    }

    randomBlock = () => {
        return this.blocks[Math.floor(Math.random()*this.blocks.length)]
    }

    addScore = (s) => {
        this.setState({
            score: this.state.score + s
        })
    }

    hardLand = () => {
        let cs = this.state.current
        let tls = this.state.tiles
        if (cs.preY) {
            cs.remove({self:this,tls})
            cs.y = cs.preY
            cs.add({self:this,tls})
            cs.noLongerCurrent({self:this,tls})
        }
        this.setState({
            current: cs,
            tiles: tls
        })
        this.checkLines()
        this.newBlock()
    }

    componentDidMount() {
        let tm = this.mainElement.current.getBoundingClientRect().width/(30*10);
        let dm = (window.innerHeight - 60 - window.innerHeight * 0.05)/(30*20);
        this.mainElement.current.style.transform = "scale("+Math.min(tm,dm)+")";

        this.keyDownListener = window.addEventListener("keydown", this.keyDown)
        this.keyUpListener = window.addEventListener("keyup", this.keyUp)
        this.init()
        //console.log("Tetris mounted, game started.")
    }

    componentWillUnmount() {
        //console.log("Tetris will unmount")
        window.removeEventListener(this.keyDownListener)
        window.removeEventListener(this.keyUpListener)
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
                this.move(-1)
                break
            case 39:
                this.move(1)
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
                this.paused = !this.paused
                if (!this.paused) {
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
                break
            case 39:
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
                <div className="container">
                    <p className="text-center arcade-game-toosmall">Sorry, your screen is too small to play this game.</p>
                </div>
                <div className="arcade-tetris-outer">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>Next Shape:</h5>
                            <div className="arcade-tetris-nextshape">

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
                                                        width: b.size+"px",
                                                        height: b.size+"px",
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
                            <h3>Tetris</h3>
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
                                    0
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
