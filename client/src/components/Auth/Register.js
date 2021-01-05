import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: '',
        errors: {},
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
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

    onRegisterSubmit = async (event) => {
        event.preventDefault();
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className='register'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 m-auto border border-light p-4'>
                            <h6 className='text-center'>
                                Create Your DevConnect Account
                            </h6>
                            <hr />
                            <form noValidate onSubmit={this.onRegisterSubmit}>
                                <TextFieldGroup
                                    placeholder='Username here'
                                    name='username'
                                    type='text'
                                    value={this.state.username}
                                    onChange={this.onInputChange}
                                    error={errors.username}
                                />
                                <TextFieldGroup
                                    placeholder='Email here'
                                    name='email'
                                    type='email'
                                    value={this.state.email}
                                    onChange={this.onInputChange}
                                    error={errors.email}
                                    info='To get profile image, use gravatar'
                                />

                                <TextFieldGroup
                                    placeholder='Password here'
                                    name='password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.onInputChange}
                                    error={errors.password}
                                />

                                <TextFieldGroup
                                    placeholder='Confirm password'
                                    name='password2'
                                    type='password'
                                    value={this.state.password2}
                                    onChange={this.onInputChange}
                                    error={errors.password2}
                                />
                                <input
                                    type='submit'
                                    className='btn btn-info btn-block mt-4'
                                />
                            </form>
                            <hr />
                            <small>
                                <Link
                                    to='/login'
                                    className='text-center text-muted mt-4'>
                                    Already have an account? Login
                                </Link>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    //registerGoogle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
