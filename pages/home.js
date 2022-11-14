import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { database, app } from '../firebaseConfig'
import { collection, addDoc, getDocs, updateDoc, doc  , deleteDoc } from 'firebase/firestore'
import { getAdditionalUserInfo } from 'firebase/auth'

export default function Home() {
  const databaseRef = collection(database, 'CRUD data')

  const [isUpdate, setIsUpdate] = useState(false)
  const [id, setId] = useState(null)

  const [name, setName] = useState()
  const [age, setAge] = useState()

  const [fireData, setFireData] = useState([])

  const router = useRouter();
  useEffect(() => {
    let token = sessionStorage.getItem('Token')
    

    if (token) {
      getData()
    }

    if (!token) {
      router.push('/register')
    }
  }, [])

  const addData = () => {
    addDoc(databaseRef, {
      name: name,
      age: Number(age)
    }).then(() => {
      alert('Data Sent')
      setName("")
      setAge('')
      getData();
    })
      .catch((err) => {
        console.log(err);
      })

  }

  const getID = (id, name, age) => {
    setIsUpdate(true);
    setName(name)
    setAge(age)
    setId(id)


  }

  const upDateData = () => {
    let fieldToEdit = doc(database, 'CRUD data', id);
    updateDoc(fieldToEdit, {
      name: name,
      age: Number(age)
    }).then(() => {
      alert('Data Updated')
      setName("")
      setAge('')
      setIsUpdate(false)
      getData();
    }).catch((err) => {
      console.log(err);
      alert(err)
    })
  }

  const deleteData =(id)=>{
    let fieldToEdit = doc(database, 'CRUD data', id);
    deleteDoc(fieldToEdit).then(()=>{
      alert('Data DeleteD !')
      getData();
    }).catch((err)=>{
      alert('Cannot Delete Data', err)
    })
  }


  const getData = async () => {
    await getDocs(databaseRef).then((res) => {
      setFireData(res.docs.map((data) => {
        return { ...data.data(), id: data.id }
      }));
    })
  }
  
const  logout =()=>{
  sessionStorage.removeItem('Token')
  router.push('/login')
}

  return (
    <div className={styles.container}>
      <Head>
        <title>HomePage of Next Auth Crud</title>
        <meta name="description" content="FireStore Crud and Authentication With Next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       <div>
       <button  className={styles.button} onClick={logout} >LOGOUT</button>
       </div> 
      <h1>Home</h1>
        <input type='text' placeholder='Enter Your Name' className={styles.inputBox} value={name} onChange={(e) => setName(e.target.value)} />
        <input type='number' placeholder='Enter Your Age' className={styles.inputBox} value={age} onChange={(e) => setAge(e.target.value)} />
        {isUpdate ? (<button className={styles.button} onClick={upDateData} >UPDATE</button>) : (<button className={styles.button} onClick={addData} >ADD</button>)}

        <table className={styles.tableBorder}>

          <thead>
            <tr>
              <th className={styles.tableBorder}>Name</th>
              <th className={styles.tableBorder}>Age</th>
              <th className={styles.tableBorder}>ID</th>
              <th className={styles.tableBorder}>Action </th>
            </tr>
          </thead>

          <tbody>
            {fireData.map((data) => {
              return (
                <tr key={data}>
                  <td className={styles.tableBorder}>{data.name}</td>
                  <td className={styles.tableBorder}>{data.age}</td>
                  <td className={styles.tableBorder}>{data.id}</td>
                  <td className={styles.tableBorder}>
                    <button className={styles.button} onClick={() => getID(data.id, data.name, data.age)} >Update</button>
                    <button className={styles.button} onClick={()=>  deleteData(data.id) } >Delete </button>
                  </td>
                </tr>
              )
            })

            }

          </tbody>

        </table>
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
