import React, { Component } from 'react'

export class SignInForm extends Component {

    signIn = (e) => {
        e.preventDefault()
        window.location.href = "http://legendword.com/login?from=http://legendword.com/arcade"
    }

    signUp = (e) => {
        e.preventDefault()
        window.location.href = "http://legendword.com/register"
    }

    render() {
        return (
            <div className="signinBox">
                <button className="btn arcade-btn-blue signinBtnFull" onClick={this.signIn}>Sign In</button>
                <button className="btn arcade-btn-blue signinBtnFull" onClick={this.signUp}>New Account</button>
                <button className="btn arcade-btn-blue signinBtnFull" onClick={this.props.playAsGuest}>Play as Guest</button>
            </div>
        )
    }
}

export default SignInForm
