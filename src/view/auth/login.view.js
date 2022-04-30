import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from './../../config';


const api = axios.create({
    baseURL: config.baseUrlServerApiUser,
    method : "POST",
})

export default function LoginView({ props }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("")
    const [msg, setMsg] = useState("")
    const [load, setLoad] = useState(0)
    const [err, setErr] = useState(0)
    const [succ, setSucc] = useState(0)


    const TIMER_INTERVAL = 3000

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setErr(0)
            setSucc(0)
        }, TIMER_INTERVAL)

        return ()=>{
            clearTimeout(timer)
        }
    },[err, succ])

    useEffect(()=>{
        localStorage.setItem("connected", 1)
        localStorage.setItem("token", token)
    }, [token])

    const infosVerification = ()=>{
        if (email.length > 0 && password.length > 0) {
            return true
        }
        setLoad(0)
        setMsg("Veillez remplir tout les champs")
        setErr(1)
        return false
    }

    const authentificateUser = ()=>{
        return api.post("/login", 
            {email, password}, 
            config
        )
        .then(data=>{
            setToken(data.data.token)
            localStorage.setItem("token", data.data.token)
            setMsg(data.data.message)
            setSucc(1)
            let timer = setTimeout(()=>{
                clearTimeout(timer)
                window.location = "/"
            },1000)
            return true
        })
        .catch(err=>{
            setMsg(err.message)
            setErr(1)
            return false
        })
        .finally(()=>{
            setLoad(0)
        })
    }

    const login = (event)=>{
        event.preventDefault()
        setLoad(1)
        if(infosVerification()){
            authentificateUser()
        }
    }


    return (
        <div {...props} className="logIn">
            <div className="state">
                <div className={`alert alert-danger ${err ? "alert-visible" : ""}`}>{msg}</div>
                <div className={`alert alert-success ${succ ? "alert-visible" : ""}`}>{msg}</div>
            </div>
            <div className="title">
                <h1 className="hero-title">Log in to IHPI</h1>
            </div>
            <div className="form">
                <form onSubmit={login} autoComplete="off">
                    <div className="input">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            id="pwd"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="submit">
                        <button type="submit" className="btn btn-primary" disabled={load}>{load ? "Connexion..." : "continue with email"}</button>
                        <Link to="/register" className="btn btn-outained-primary">Don't have an account? Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}