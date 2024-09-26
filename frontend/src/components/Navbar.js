import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const NavBar = () =>{
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = ()=> {
        logout()
    }
   return(
    <header>
        <div className="container">
            <Link to ="/">
            <h1>Workout Buddy</h1>
            </Link>
            <nav>
                {user && ( // output the tempelate when we have the user
                <div>
                    <span>{user.email}</span>
                    <button onClick={handleClick}>Log out </button>
                </div>
                )}
                {!user && ( //output if we not have the user 
                <div>
                    <Link to ="/login">Login</Link>
                    <Link to ="/signup">Signup</Link>
                </div>
                )}
            </nav>
        </div>
    </header>
   ) 
}

export default NavBar