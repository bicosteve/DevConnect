import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addExperience } from '../../actions/profileAction';

class AddExperience extends Component {
    state = {
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false,
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onExperienceSubmit = (event) => {
        event.preventDefault();
        const experienceData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description,
        };

        this.props.addExperience(experienceData, this.props.history);
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onCheck = (event) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current,
        });
    };

    render() {
        const { errors } = this.state;

        return (
            <div className='add-experience'>
                <div className='container'>
                    <div className='col-md-8 m-auto'>
                        <Link className='btn btn-light btn-block' to='/dashboard'>
                            Back To Dashboard
                        </Link>
                        <p className='lead text-center'>
                            Add Current/Past Job Experience
                        </p>
                        <small className='d-block pb-3'>* is required field</small>
                        <form onSubmit={this.onExperienceSubmit}>
                            <TextFieldGroup
                                name='company'
                                placeholder='*Company here'
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                            />
                            <TextFieldGroup
                                name='title'
                                placeholder='* Title here'
                                value={this.state.title}
                                onChange={this.onChange}
                                error={errors.title}
                            />
                            <TextFieldGroup
                                name='location'
                                placeholder='Location here'
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                            />
                            <TextFieldGroup
                                label='From'
                                name='from'
                                type='date'
                                value={this.state.from}
                                onChange={this.onChange}
                                error={errors.from}
                            />
                            <TextFieldGroup
                                label='To'
                                name='to'
                                type='date'
                                value={this.state.to}
                                onChange={this.onChange}
                                error={errors.to}
                                disabled={this.state.disabled ? 'disabled' : ''}
                            />
                            <div className='form-check m-3'>
                                <input
                                    type='checkbox'
                                    className='form-check-input'
                                    name='current'
                                    value={this.state.current}
                                    checked={this.state.current}
                                    onChange={this.onCheck}
                                    id='current'
                                />
                                <label
                                    htmlFor='current'
                                    className='form-check-label'>
                                    Current
                                </label>
                            </div>
                            <TextAreaFieldGroup
                                placeholder='Job Description'
                                name='description'
                                value={this.state.description}
                                onChange={this.onChange}
                                error={errors.description}
                                info='Brief description of your work'
                            />
                            <input
                                type='submit'
                                value='Submit'
                                className='btn btn-info btn-block mt-3'
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors,
});

export default connect(mapStateToProps, { addExperience })(
    withRouter(AddExperience)
);
