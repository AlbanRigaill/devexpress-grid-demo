import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlusCircle, faUsers, faHome, faTablet } from '@fortawesome/fontawesome-free-solid'

export class SideBar extends React.Component {
    public render() {
        return (
            <nav className="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to={'/'} activeClassName="active"><FontAwesomeIcon icon={faHome} fixedWidth={true} /> Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/customer/grid'} activeClassName="active"><FontAwesomeIcon icon={faUsers} fixedWidth={true} /> Customers </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
