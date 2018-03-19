import * as CustomerGridState from '../../store/customer/grid';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { ApplicationState } from '../../store';
import { SortingState, SelectionState, PagingState, FilteringState, CustomPaging } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel, TableFilterRow, TableSelection } from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';


// At runtime, Redux will merge together...
type Props =
    CustomerGridState.State             // ... state we've requested from the Redux store
    & typeof CustomerGridState.actionCreators;             // ... plus action creators we've requested

class CustomerGrid extends React.Component<Props> {

    componentWillMount() {
        // This method runs when the component is first added to the page
        let currentPage = this.props.currentPage || 0;
        let pageSize = this.props.pageSize || 10;
        let sorting = this.props.sorting || [];
        let filters = this.props.filters || [];
        this.props.list(currentPage, pageSize, sorting, filters);
    }

    componentWillReceiveProps(nextProps: Props) {
        // This method runs when incoming props (e.g., route params) change
        let currentPage = nextProps.currentPage || 0;
        let pageSize = nextProps.pageSize || 10;
        let sorting = nextProps.sorting || [];
        let filters = nextProps.filters || [];
        this.props.list(currentPage, pageSize, sorting, filters);
    }
    
    public render() {
        return <div className="full-width">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Liste des clients</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button className="btn btn-sm btn-outline-secondary" onClick={this.props.openSnackbar}>Snackbar</button>
                        <button className="btn btn-sm btn-outline-secondary" disabled={this.props.actualSelection.length === 0} onClick={this.props.openCustomerDetailModal}>Show selected</button>
                    </div>
                </div>
            </div>
            
            <br />
            <div>
                {this.renderTable()}
            </div>
            <br />
        </div>;
    }

    private renderTable() {
        return <Paper>
            <Grid rows={this.props.rows} columns={this.props.columns} >
                <SortingState sorting={this.props.sorting} onSortingChange={this.props.onSortingChange} />
                <PagingState currentPage={this.props.currentPage} onCurrentPageChange={this.props.onCurrentPageChange}
                    pageSize={this.props.pageSize} onPageSizeChange={this.props.onPageSizeChange} />
                <CustomPaging totalCount={this.props.totalCount} />
                <FilteringState filters={this.props.filters} onFiltersChange={this.props.onFiltersChange} />
                <SelectionState selection={this.props.selection} onSelectionChange={this.props.onSelectionChange}/>
                <Table />
                
                <TableHeaderRow showSortingControls />
                <TableFilterRow />
                <TableSelection />
                <PagingPanel pageSizes={this.props.pageSizes} />
            </Grid>
        </Paper>;
    }
}


export default connect(
    (state: ApplicationState) => state.customerGrid, // Selects which state properties are merged into the component's props
    CustomerGridState.actionCreators                 // Selects which action creators are merged into the component's props
)(CustomerGrid);

