import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { app } from '../firebaseConfig'
import styles from '../styles/Home.module.css'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'

export default function login() {

  const auth = getAuth();
  const router = useRouter();

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      router.push('/home')
      sessionStorage.setItem('Token', res.user.accessToken)
    })
  }

  const GoogleSignIn = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
      console.log(res.user);
      router.push('/home')
      sessionStorage.setItem('Token', res.user.accessToken)
    })
  }

  const GithubSignin = () => {
    signInWithPopup(auth, githubProvider).then((res) => {
      console.log(res.user);
      router.push('/home')
      sessionStorage.setItem('Token', res.user.accessToken)
    })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Auth Crud</title>
        <meta name="description" content="FireStore Crud and Authentication With Next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>


        <main className={styles.main}>
          <h1>Login</h1>
          <input type='email' placeholder='Enter Email' className={styles.inputBox} onChange={(e) => setEmail(e.target.value)} value={email}
          />
          <input type='password' placeholder='Password' className={styles.inputBox} onChange={(e) => setPassword(e.target.value)} value={password} />
          <button className={styles.button} onClick={signIn} >Sign in</button>
          <button className={styles.button} onClick={GoogleSignIn} >Sign in with Google</button>
          <button className={styles.button} onClick={GithubSignin} >Sign in with GitHub&nbsp;</button>
          <Link href='/register' > <p>  don't have an account ? create one  </p>  </Link>
        </main>
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