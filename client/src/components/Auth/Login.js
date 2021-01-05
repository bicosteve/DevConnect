import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUser } from '../../actions/authAction';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {},
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onLoginSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(userData);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className='login'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 m-auto border border-light p-4'>
                            <h6 className='text-center '>
                                Log In To Your DevConnect Account
                            </h6>
                            <hr />
                            <form noValidate onSubmit={this.onLoginSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='email'
                                        className={classnames(
                                            'form-control form-control-md',
                                            {
                                                'is-invalid': errors.email,
                                            }
                                        )}
                                        placeholder='Email Address'
                                        name='email'
                                        value={this.state.email}
                                        onChange={this.onInputChange}
                                    />
                                    {errors.email && (
                                        <div className='invalid-feedback'>
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='password'
                                        className={classnames(
                                            'form-control form-control-md',
                                            {
                                                'is-invalid': errors.password,
                                            }
                                        )}
                                        placeholder='Password'
                                        name='password'
                                        value={this.state.password}
                                        onChange={this.onInputChange}
                                    />
                                    {errors.password && (
                                        <div className='invalid-feedback'>
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                                <input
                                    type='submit'
                                    className='btn btn-info btn-block mt-4 mb-3'
                                />
                                <small className='text-center float-right'>
                                    <Link
                                        to='/resetPassword'
                                        className='text-muted mt-4'>
                                        Forgot Password?
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
