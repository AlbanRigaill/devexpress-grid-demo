import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCubes } from '@fortawesome/fontawesome-free-solid'

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return (
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <Link className="navbar-brand col-sm-3 col-lg-2 mr-0 align-items-center" style={{ display: 'flex' }} to={'/'}><FontAwesomeIcon icon={faCubes} size="2x" style={{ marginRight: '0.75rem' }}/>Grid Demo</Link>
            </nav>
        );
    }
}
