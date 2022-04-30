import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './../redux/actions/usersAction';
import { Link } from 'react-router-dom';


export default function HomeView({ props })  {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)
    const loading = useSelector(state => state.users.loading)
    const error = useSelector(state => state.users.error)

    useEffect(() => {
        dispatch(getUser())
    }, [])
    
    return (
        <div {...props} className="container jcenter">
            <h1>Welcome to react</h1>
            <div>
                {loading && <p>Loading...</p>}
                {!loading && !error && <p>Hello {user.username}</p>}
                {!loading && error && <div className=''>
                    <Link to="/login" className='btn btn-primary'>S'authentifier</Link>
                </div>}
            </div>
        </div>
    )
}