import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { app } from '../firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup} from 'firebase/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function register() {
    const auth = getAuth();
    const router = useRouter();

    const googleProvider  = new GoogleAuthProvider()
    const githubProvider  = new GithubAuthProvider()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password).then((res) => {
            router.push('/home')
            sessionStorage.setItem('Token', res.user.accessToken  )
        })
    }
const GoogleSignUp=()=>{
   signInWithPopup(auth, googleProvider).then((res)=>{
   console.log(res.user);  
   router.push('/home')  
   sessionStorage.setItem('Token', res.user.accessToken  )
   })
}

const GithubSignUp=()=>{
signInWithPopup(auth, githubProvider).then((res)=>{
    console.log(res.user);
    router.push('/home')
    sessionStorage.setItem('Token', res.user.accessToken  )
})
}

useEffect(()=>{
let token = sessionStorage.getItem('Token')
if(token){
    router.push('/home')
}
},[])

    return (
        <div className={styles.container}>
            <Head>
                <title>Next Auth Crud</title>
                <meta name="description" content="FireStore Crud and Authentication With Next js" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1>Register</h1>
                <input type='email' placeholder='Enter Email' className={styles.inputBox} onChange={(e) => setEmail(e.target.value)} value={email}
                />
                <input type='password' placeholder='Password' className={styles.inputBox} onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className={styles.button} onClick={signUp} >Sign Up</button>
                <button className={styles.button} onClick={GoogleSignUp} >Sign up with Google</button>
                <button className={styles.button} onClick={GithubSignUp} >Sign up with GitHub&nbsp;</button>
                <Link  href='/login' > <p>  already have an account ? just sign in  </p>  </Link>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>
    )
}