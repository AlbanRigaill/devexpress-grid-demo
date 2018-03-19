import * as SnackbarState from '../../store/snackbar';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { ApplicationState } from '../../store';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

// At runtime, Redux will merge together...
type Props =
    SnackbarState.State             // ... state we've requested from the Redux store
    & typeof SnackbarState.actionCreators;             // ... plus action creators we've requested

class SnackbarWrapper extends React.Component<Props> {

    componentWillMount() {
        // This method runs when the component is first added to the page
    }

    componentWillReceiveProps(nextProps: Props) {
        // This method runs when incoming props (e.g., route params) change
    }

    public render() {
        return <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.props.snackbarStatus}
            autoHideDuration={6000}
            onClose={this.props.closeSnackbar}
            SnackbarContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.props.text}</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.props.closeSnackbar}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />;
    }
}


export default connect(
    (state: ApplicationState) => state.snackbar, // Selects which state properties are merged into the component's props
    SnackbarState.actionCreators                 // Selects which action creators are merged into the component's props
)(SnackbarWrapper);




