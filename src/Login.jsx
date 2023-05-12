import React from 'react'
import "./Login.css"
import { Button } from 'antd'
import { signInWithPopup } from 'firebase/auth'
import { auth,provider} from './Firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
function Login() {
    const [{} , dispatch] = useStateValue();
    const signIn = () => {
        
        signInWithPopup(auth,provider).then ( (result)=>{dispatch({
            type: actionTypes.SET_USER,
            user : result.user
        })}).catch((error) => {
            console.error(error);
        })
    }
    return (
        <div className='login'>
            <div className="login_container">
                <img src="https://cdn-icons-png.flaticon.com/512/4096/4096100.png" alt='boom' />
                <div className="login_text">
                    <h1>Sign in to whatsapp</h1>
                    
                </div>
                <Button onClick = {signIn}type="primary" size={5}>
            Sign in with google
          </Button> </div>
        </div>
    )
}

export default Login