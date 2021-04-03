export const NavItem = ({ icon, children, open }) => {
    return (
        <li className="nav-item">
            <button className="nav-icon-button">{icon}</button>
            {open && children}
        </li>
    );
};
