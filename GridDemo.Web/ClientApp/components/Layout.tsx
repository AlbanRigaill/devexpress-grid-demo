import * as React from 'react';
import { NavMenu } from './NavMenu';
import { SideBar } from './SideBar';

export class Layout extends React.Component {
    public render() {
        return (
            <div>
                <NavMenu />
                <div className="container-fluid">
                    <div className="row">
                        <SideBar />
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                                {this.props.children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}
