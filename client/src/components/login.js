import React from 'react';

function Login(){
    return (
        <div>
            <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
        </div>
    )
}

export default Login;