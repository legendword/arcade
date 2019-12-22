import React, { Component } from 'react'
import { findName } from '../games/index'

export class Highscores extends Component {
    render() {
        return (
            <div className="arcade-highscore-outer">
                {
                    Object.entries(this.props.highscore).map(([key, value]) => (
                        <div className="row arcade-highscore-row" key={key}>
                            <div className="col-sm-6 text-right" style={{fontWeight:600}}>
                                {findName(key)}
                            </div>
                            <div className="col-sm-6">
                                {
                                    (
                                        (!value)?"No Record":((typeof value)==="number"?value:(
                                            <div className="row">
                                                {
                                                    Object.entries(JSON.parse(value)).map(([k,v]) => (
                                                        <React.Fragment key={k}>
                                                            <div className="col-sm-5 text-right">{k}</div>
                                                            <div className="col-sm-7">{(!v)?"No Record":v}</div>
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default Highscores
