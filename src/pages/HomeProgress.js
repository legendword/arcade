import React, { Component } from 'react'
import { findName } from '../games/index'
import '../css/Home.Progress.css'
import { Textfit } from 'react-textfit'

export class HomeProgress extends Component {

    render() {
        return (
            <div className="container" style={{marginTop:"10px"}}>
                <h4 className="text-muted">Your Rankings</h4>
                <p>Ranking System Coming Soon!</p>
                <h4 className="text-muted">Individual Game Progress</h4>
                <div className="arcade-progress-row">
                    {
                        Object.entries(this.props.highscore).map(([key, value]) => (
                            <div className="arcade-progress-block" key={key}>
                                <div className="arcade-progress-block-title">
                                    {findName(key)}
                                </div>
                                {
                                    (!value)?(
                                        <Textfit className="arcade-progress-block-content">No Record</Textfit>
                                    ):((typeof value)==="number"?(
                                        <Textfit className="arcade-progress-block-content">{value}</Textfit>
                                    ):(
                                        <div className="arcade-progress-block-content">
                                            {
                                                Object.entries(JSON.parse(value)).map(([k,v]) => (
                                                    <h6 key={k} style={{marginBottom:"5px"}}><b>[{k}]</b> {v?v:"No Record"}</h6>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default HomeProgress
