import React, { Component } from 'react'
import { motion } from 'framer-motion'
import '../css/Home.Friend.css'
import ArrowRight from './resources/arrow-right-bold-white-01.png'

export class HomeFriends extends Component {

    constructor(props) {
        super(props)
        this.state = {
            groupExpand: [true, true]
        }
    }

    groupArrVariants = {
        collapse: { rotate: 0 },
        expand: { rotate: 90 }
    }

    groupListVariants = {
        collapse: { display: "none" },
        expand: { display: "block" }
    }

    groupNameTap = (which, info) => {
        let gExp = this.state.groupExpand
        gExp.splice(which, 1, !gExp[which])
        this.setState({
            groupExpand: gExp
        })
    }

    render() {
        return (
            <div className="container arcade-friend-outer">
                <div className="arcade-friend-list-outer">
                    <h6 className="arcade-friend-list-title">Friend List</h6>
                    <motion.div
                        className="arcade-friend-list-group-outer"
                        initial="expand"
                        animate={this.state.groupExpand[0]?"expand":"collapse"}
                    >
                        <motion.div onTap={this.groupNameTap.bind(this, 0)} className="arcade-friend-list-group-name">
                            <motion.img src={ArrowRight} variants={this.groupArrVariants} className="arcade-friend-list-group-arr" />
                            <motion.span className="arcade-friend-list-group-text">Online <span className="arcade-text-muted">(2/3)</span></motion.span>
                        </motion.div>
                        <motion.div variants={this.groupListVariants} className="arcade-friend-list-group">
                            <div className="arcade-friend-list-item">
                                <span className="arcade-friend-list-item-name">
                                    Test
                                </span>
                                <span className="arcade-friend-list-item-status">
                                    Online
                                </span>
                            </div>
                            <div className="arcade-friend-list-item">
                                <span className="arcade-friend-list-item-name">
                                    Test2
                                </span>
                                <span className="arcade-friend-list-item-status">
                                    Online
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div
                        className="arcade-friend-list-group-outer"
                        initial="expand"
                        animate={this.state.groupExpand[1]?"expand":"collapse"}
                    >
                        <motion.div onTap={this.groupNameTap.bind(this, 1)} className="arcade-friend-list-group-name">
                            <motion.img src={ArrowRight} variants={this.groupArrVariants} className="arcade-friend-list-group-arr" />
                            <motion.span className="arcade-friend-list-group-text">Offline <span className="arcade-text-muted">(1/3)</span></motion.span>
                        </motion.div>
                        <motion.div variants={this.groupListVariants} className="arcade-friend-list-group">
                            <div className="arcade-friend-list-item">
                                <span className="arcade-friend-list-item-name">
                                    Test3
                                </span>
                                <span className="arcade-friend-list-item-status">
                                    Offline
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
                <div className="arcade-friend-detail-outer">
                    <h5>Detail</h5>
                    <p>Work in progress.</p>
                </div>
            </div>
        )
    }
}

export default HomeFriends
