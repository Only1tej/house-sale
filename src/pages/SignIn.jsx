import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()

            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            toast.error('Wrong User Credentials')
        }
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back</p>
                </header>

                <main>
                    <form onSubmit={onSubmit}>
                        <input type="email" placeholder='Email' id="email" className="emailInput" value={email} onChange={onChange} />
                        <div className='passwordInputDiv'>
                            <input type={showPassword ? 'text' : 'password'} id="password" placeholder='Password' value={password} className='passwordInput' onChange={onChange} />

                            <img src={visibilityIcon} alt="Show password" className='showPassword' onClick={() => setShowPassword((prevState) => !prevState)} />
                        </div>

                        <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password </Link>

                        <div className="signInBar">
                            <p className="signInText">Sign In</p>
                            <button className="signInButton">
                                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                            </button>
                        </div>
                    </form>

                    <OAuth />

                    <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
                </main>
            </div>
        </>
    )
}

export default SignIn