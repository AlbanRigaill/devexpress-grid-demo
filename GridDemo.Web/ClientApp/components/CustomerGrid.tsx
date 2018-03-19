import * as CustomerGridState from '../store/customerGrid';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { ApplicationState } from '../store';
import { SortingState, SelectionState, PagingState, FilteringState, CustomPaging } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel, TableFilterRow, TableSelection } from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

type Props = CustomerGridState.State & typeof CustomerGridState.actionCreators;

class CustomerGrid extends React.Component<Props> {

    componentWillMount() {
        let currentPage = this.props.currentPage || 0;
        let pageSize = this.props.pageSize || 10;
        let sorting = this.props.sorting || [];
        let filters = this.props.filters || [];
        this.props.list(currentPage, pageSize, sorting, filters);
    }

    componentWillReceiveProps(nextProps: Props) {
        let currentPage = nextProps.currentPage || 0;
        let pageSize = nextProps.pageSize || 10;
        let sorting = nextProps.sorting || [];
        let filters = nextProps.filters || [];
        this.props.list(currentPage, pageSize, sorting, filters);
    }
    
    public render() {
        return <div className="full-width">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">Customers</h1>
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
                <SortingState sorting={this.props.sorting} onSortingChange={this.props.handleSortingChange} />
                <PagingState currentPage={this.props.currentPage} onCurrentPageChange={this.props.handleCurrentPageChange}
                    pageSize={this.props.pageSize} onPageSizeChange={this.props.handlePageSizeChange} />
                <CustomPaging totalCount={this.props.totalCount} />
                <FilteringState filters={this.props.filters} onFiltersChange={this.props.handleFiltersChange} />
                <SelectionState selection={this.props.selection} onSelectionChange={this.props.handleSelectionChange}/>
                <Table />
                <TableHeaderRow showSortingControls />
                <TableFilterRow />
                <TableSelection />
                <PagingPanel pageSizes={this.props.pageSizes} />
            </Grid>
        </Paper>;
    }
}


export default connect((state: ApplicationState) => state.customerGrid, CustomerGridState.actionCreators)(CustomerGrid);

