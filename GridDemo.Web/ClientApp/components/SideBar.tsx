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
                            <NavLink className="nav-link" exact to={'/'} activeClassName="active"><FontAwesomeIcon icon={faHome} fixedWidth={true} /> Accueil <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/customer/grid'} activeClassName="active"><FontAwesomeIcon icon={faUsers} fixedWidth={true} /> Liste des clients</NavLink>
                        </li>
                    </ul>

                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Saved reports</span>
                        <a className="d-flex align-items-center text-muted" href="#">
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </a>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Current month</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Last quarter</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Social engagement</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Year-end sale</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
