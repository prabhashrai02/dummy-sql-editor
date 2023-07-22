import ThemeToggler from './ThemeToggler';

import logo from '../../Assets/SqlEditorLogo.png';

import styles from './navbar.module.css';

const Navbar = () => {

    return (
        <div className={styles.navbarContainer}>
            <img src={logo} className={styles.logoImg} alt='dummy sql editor' />
            <ThemeToggler />
        </div>
    )
}

export default Navbar;