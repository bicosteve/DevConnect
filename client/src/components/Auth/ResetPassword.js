import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { resetPassword } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class ResetPassword extends Component {
    state = {
        email: '',
        errors: {},
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/reset');
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onResetSubmit = async (event) => {
        event.preventDefault();
        const newData = {
            email: this.state.email,
        };

        this.props.resetPassword(newData, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className='resetPassword'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 m-auto border border-light p-4'>
                            <h6 className='text-center'>Reset Your Password</h6>
                            <hr />
                            <form noValidate onSubmit={this.onResetSubmit}>
                                <TextFieldGroup
                                    placeholder='Enter email to receive reset link'
                                    name='email'
                                    type='email'
                                    value={this.state.email}
                                    onChange={this.onInputChange}
                                    error={errors.email}
                                    info='Check your mail for a reset link'
                                />
                                <input
                                    type='submit'
                                    className='btn btn-info btn-block mt-4'
                                />
                                <small className='text-center float-right mt-2'>
                                    <Link to='/login' className='text-muted mt-4'>
                                        Have an account? Login
                                    </Link>
                                </small>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { resetPassword })(
    withRouter(ResetPassword)
);
