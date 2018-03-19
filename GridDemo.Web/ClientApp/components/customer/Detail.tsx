import * as CustomerDetailState from '../../store/customer/detail';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { ApplicationState } from '../../store';

// At runtime, Redux will merge together...
type Props =
    CustomerDetailState.State             // ... state we've requested from the Redux store
    & typeof CustomerDetailState.actionCreators;             // ... plus action creators we've requested

class CustomerDetail extends React.Component<Props> {

    componentWillMount() {
        // This method runs when the component is first added to the page
        let idList = this.props.idList || [];
        this.props.getById(idList);
    }

    componentWillReceiveProps(nextProps: Props) {
        // This method runs when incoming props (e.g., route params) change
        let idList = nextProps.idList || [];
        this.props.getById(idList);
    }

    public render() {
        return <div>
            {this.renderTable()}
        </div>;
    }

    private renderTable() {
        return <div className="table-responsive"><table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.props.customers.map(model =>
                        <tr key={model.id}>
                            <td>{model.id}</td>
                            <td>{model.name}</td>
                            <td>{model.email}</td>
                        </tr>
                    )}
            </tbody>
        </table></div>;
    }
}


export default connect(
    (state: ApplicationState) => state.customerDetail, // Selects which state properties are merged into the component's props
    CustomerDetailState.actionCreators                 // Selects which action creators are merged into the component's props
)(CustomerDetail);

