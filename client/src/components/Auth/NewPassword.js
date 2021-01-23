import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { updatePassword } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class NewPassword extends Component {
  state = {
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

  onNewPasswordSubmit = async (event) => {
    event.preventDefault();
    const newData = {
      password: this.state.password,
      password2: this.state.password2,
      token: this.props.match.params.token,
    };

    this.props.updatePassword(newData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='newPassword'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 m-auto border border-light p-4'>
              <h6 className='text-center'>Update Your Password</h6>
              <hr />
              <form noValidate onSubmit={this.onNewPasswordSubmit}>
                <TextFieldGroup
                  placeholder='New password here'
                  name='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.onInputChange}
                  error={errors.password}
                />

                <TextFieldGroup
                  placeholder='Confirm new  password'
                  name='password2'
                  type='password'
                  value={this.state.password2}
                  onChange={this.onInputChange}
                  error={errors.password2}
                />
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewPassword.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { updatePassword })(
  withRouter(NewPassword)
);
