import React, { Component } from 'react'

export class SignInForm extends Component {
    render() {
        return (
            <div className="signinBox">
                <form onSubmit={this.props.signIn}>
                    <div className="row">
                        <div className="col-md-8">
                            <h4 className="text-center signinLabel">Sign In</h4>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn arcade-btn-blue signinBtn">Sign In</button>
                            </div>
                        </div>
                        <div className="col-md-4 signinColRight">
                            <h4 className="text-center signinLabel">Or</h4>
                            <button className="btn arcade-btn-blue signinBtnFull">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignInForm
