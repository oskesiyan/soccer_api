import { NavLink } from 'react-router-dom';
import s from  './Navbar.module.css';

const Navbar = () => {
  return <nav className = {s.nav}>
    <div className = {s.item}>
      <NavLink to = '/leagues' className = {s.navLink}>Лиги</NavLink>
    </div>
    <div className = {s.item}>
      <NavLink to = '/teams' className = {s.navLink}>Команды</NavLink>
    </div>  
</nav>
}

export default Navbar