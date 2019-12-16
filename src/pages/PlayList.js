import React, { Component } from 'react'
import gameIndex from '../games/index'

export class PlayList extends Component {
    render() {
        var rows = []
        for (let i=0;i<=parseInt(gameIndex.length/3);i++) {
            rows.push(i);
        }
        return (
            <div className="arcade-play-content">
                <h2>Games</h2>
                <div className="arcade-play-list">
                    {
                        rows.map((v,id) => (
                            <div className="row" key={id}>
                                {
                                    gameIndex.filter((xx, x) => (x>=v*3&&x<(v+1)*3)).map((w,wi) => (
                                        <div className="col-md-4" key={wi}>
                                            <div className="card arcade-list-card" onClick={this.props.gameSelect.bind(this, w)}>
                                                <img src="../../favicon.ico" width="100%" alt="" />
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        {w.name}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                        /*
                        gameIndex.map((v,id) => {
                            if (id%3==0) {
                                return (
                                    <div className="row">
                                        {
                                            
                                        }
                                    </div>
                                )
                                
                            }
                            return (
                                <React.Fragment key={id}>
                                    <div className="card arcade-list-card">
                                        <img src="../../favicon.ico" width="100%" alt="" />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {v.name}
                                            </h5>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                        */
                    }
                </div>
            </div>
        )
    }
}


export default PlayList
