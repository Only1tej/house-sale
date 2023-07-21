import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = formData

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

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            updateProfile(auth.currentUser, {
                displayName: name,
            })

            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')
        } catch (error) {
            toast.error('Something went wrong with the registration')
        }
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Create an account</p>
                </header>

                <main>
                    <form onSubmit={onSubmit}>
                        <input type="name" placeholder='Name' id="name" className="nameInput" value={name} onChange={onChange} />
                        <input type="email" placeholder='Email' id="email" className="emailInput" value={email} onChange={onChange} />
                        <div className='passwordInputDiv'>
                            <input type={showPassword ? 'text' : 'password'} id="password" placeholder='Password' value={password} className='passwordInput' onChange={onChange} />

                            <img src={visibilityIcon} alt="Show password" className='showPassword' onClick={() => setShowPassword((prevState) => !prevState)} />
                        </div>

                        <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password </Link>

                        <div className="signUpBar">
                            <p className="signUpText">Sign Up</p>
                            <button className="signUpButton">
                                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                            </button>
                        </div>
                    </form>

                    <OAuth />

                    <Link to='/sign-in' className='registerLink'>Sign In Instead</Link>
                </main>
            </div>
        </>
    )
}

export default SignUp