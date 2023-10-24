import React, { Component } from 'react'

export class SignInForm extends Component {

    signIn = (e) => {
        e.preventDefault()
        window.location.href = "https://legendword.com/login?from=http://legendword.com/arcade"
    }

    signUp = (e) => {
        e.preventDefault()
        window.location.href = "https://legendword.com/register"
    }

    render() {
        return (
            <div className="signinBox">
                <button className="signinBtnFull arcade-btn-block btn-dark" onClick={this.signIn}>Sign In</button>
                <button className="signinBtnFull arcade-btn-block btn-dark" onClick={this.signUp}>New Account</button>
                <hr style={{margin:"1.5rem 0"}} />
                <button className="signinBtnFull arcade-btn-block btn-light" onClick={this.props.playAsGuest}>Play as Guest</button>
            </div>
        )
    }
}

export default SignInForm
