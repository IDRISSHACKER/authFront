import { Link as RouterLink } from "react-router-dom"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './../redux/actions/usersAction';

export default function NavbarComponent({props}){
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)
    const loading = useSelector(state => state.users.loading)
    const error = useSelector(state => state.users.error)

    useEffect(() => {
        dispatch(getUser())
    }, [])
    return(
        <div {...props} className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <RouterLink to="/">IHPI</RouterLink>
                </div>
                <div className="navbar-actions">
                    {loading && <p>Loading...</p>}
                    {!error && !loading && <ul>
                        <li>
                            <RouterLink className="btn" to="login">{user.email}</RouterLink>
                        </li>
                        <li>
                            <RouterLink className="btn btn-secondary" to="register">Sign Out</RouterLink>
                        </li>
                    </ul>}
                    {error && !loading && <ul>
                        <li>
                            <RouterLink className="btn" to="login">Login</RouterLink>
                        </li>
                        <li>
                            <RouterLink className="btn btn-secondary" to="register">Sign Up</RouterLink>
                        </li>
                    </ul>}
                </div>
            </div>
        </div>
    )
}