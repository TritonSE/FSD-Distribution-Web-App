import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                <h2>Hello world</h2>
                <form action="/login" method="post">
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" />
                    </div>
                    <div>
                        <input type="submit" value="Log In" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
