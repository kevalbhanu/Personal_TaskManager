import React from 'react'
import{ Link,useNavigate} from 'react-router-dom'

export default function Nav() {
  const auth = localStorage.getItem('user');
    const navigate=useNavigate();
    const logout=()=>{
      localStorage.clear();
      navigate('/login')
    }
  return (
    <div className='nav'>
      {auth ?( <ul className='nav-ul'>
        <li><Link onClick={logout} to="/login">Logout</Link></li>

        </ul>):
        (<ul className='nav-ul nav-right'>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>

      </ul>)}
    </div>
  )
}
