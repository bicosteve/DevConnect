import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addEducation } from '../../actions/profileAction';

class AddEducation extends Component {
    state = {
        school: '',
        degree: '',
        fieldOfStudy: '',
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

    onEducationSubmit = (event) => {
        event.preventDefault();
        const educationData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldOfStudy: this.state.fieldOfStudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description,
        };

        this.props.addEducation(educationData, this.props.history);
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
            <div className='add-education'>
                <div className='container'>
                    <div className='col-md-8 m-auto'>
                        <Link className='btn btn-light btn-block' to='/dashboard'>
                            Back To Dashboard
                        </Link>
                        <p className='lead text-center'>
                            Add Your Level of Education
                        </p>
                        <small className='d-block pb-3'>* is required field</small>
                        <form onSubmit={this.onEducationSubmit}>
                            <TextFieldGroup
                                name='school'
                                placeholder='*School here'
                                value={this.state.school}
                                onChange={this.onChange}
                                error={errors.school}
                            />
                            <TextFieldGroup
                                name='degree'
                                placeholder='* Degree or certification'
                                value={this.state.degree}
                                onChange={this.onChange}
                                error={errors.degree}
                            />
                            <TextFieldGroup
                                name='fieldOfStudy'
                                placeholder='*Field Of Study Here'
                                value={this.state.fieldOfStudy}
                                onChange={this.onChange}
                                error={errors.fieldOfStudy}
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
                                placeholder='Your school activities'
                                name='description'
                                value={this.state.description}
                                onChange={this.onChange}
                                error={errors.description}
                                info='Tell us about your course and extra curricula activities'
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

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors,
    addEducation: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
