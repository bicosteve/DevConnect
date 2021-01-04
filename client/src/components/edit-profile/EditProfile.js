import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import isEmpty from '../../validation/is_empty';

import { createProfile, getCurrentProfile } from '../../actions/profileAction';

class CreateProfile extends Component {
    state = {
        dispalySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedIn: '',
        youtube: '',
        instagram: '',
        errors: {},
    };

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            //Bring skills array back to CSV
            const skillsCSV = profile.skills.join(',');
            //check if profile field does not exist, make empty strings
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername)
                ? profile.githubusername
                : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter)
                ? profile.social.twitter
                : '';
            profile.facebook = !isEmpty(profile.social.facebook)
                ? profile.social.facebook
                : '';
            profile.linkedIn = !isEmpty(profile.social.linkedIn)
                ? profile.social.linkedIn
                : '';
            profile.instagram = !isEmpty(profile.social.instagram)
                ? profile.social.instagram
                : '';
            profile.youtube = !isEmpty(profile.social.youtube)
                ? profile.social.youtube
                : '';

            //set component fields state
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedIn: profile.linkedIn,
                youtube: profile.youtube,
            });
        }
    }

    onProfileSubmit = (event) => {
        event.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedIn: this.state.linkedIn,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        };

        this.props.createProfile(profileData, this.props.history);
    };

    onFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { errors, dispalySocialInputs } = this.state;

        let socialInputs;

        if (dispalySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder='Twitter'
                        name='twitter'
                        icon='fab fa-twitter'
                        value={this.state.twitter}
                        onChange={this.onFieldChange}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder='Facebook'
                        name='facebook'
                        icon='fab fa-facebook'
                        value={this.state.facebook}
                        onChange={this.onFieldChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder='Youtube'
                        name='youtube'
                        icon='fab fa-youtube'
                        value={this.state.youtube}
                        onChange={this.onFieldChange}
                        error={errors.youtube}
                    />
                    <InputGroup
                        placeholder='Instagram'
                        name='instagram'
                        icon='fab fa-instagram'
                        value={this.state.instagram}
                        onChange={this.onFieldChange}
                        error={errors.instagram}
                    />
                    <InputGroup
                        placeholder='LinkedIn'
                        name='linkedIn'
                        icon='fab fa-linkedin'
                        value={this.state.linkedIn}
                        onChange={this.onFieldChange}
                        error={errors.linkedIn}
                    />
                </div>
            );
        }

        //select option for status
        const options = [
            { label: ' * Select your job status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student', value: 'Student' },
            { label: 'Instructor', value: 'Instructor' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' },
        ];

        return (
            <div className='create-profile'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                            <h4 className='display-4 text-center'>Edit Profile</h4>
                            <p className='lead text-center text-muted'>
                                Revise Your Profile
                            </p>
                            <small className='d-block pb-3'>
                                {' '}
                                * are required fields
                            </small>
                            <form onSubmit={this.onProfileSubmit}>
                                <TextFieldGroup
                                    placeholder='* Profile handle'
                                    name='handle'
                                    value={this.state.handle}
                                    onChange={this.onFieldChange}
                                    error={errors.handle}
                                    info='A unique name for your profile url'
                                />
                                <TextFieldGroup
                                    placeholder='* Skills'
                                    name='skills'
                                    value={this.state.skills}
                                    onChange={this.onFieldChange}
                                    error={errors.skills}
                                    info='Please use comma separated values e.g html,css'
                                />
                                <SelectListGroup
                                    placeholder='Status'
                                    name='status'
                                    value={this.state.status}
                                    onChange={this.onFieldChange}
                                    error={errors.status}
                                    info='Tell us what you do'
                                    options={options}
                                />
                                <TextFieldGroup
                                    placeholder='Company'
                                    name='company'
                                    value={this.state.company}
                                    onChange={this.onFieldChange}
                                    error={errors.company}
                                    info='Tell us where you work'
                                />
                                <TextFieldGroup
                                    placeholder='Website'
                                    name='website'
                                    value={this.state.website}
                                    onChange={this.onFieldChange}
                                    error={errors.website}
                                    info='Show us your blog'
                                />
                                <TextFieldGroup
                                    placeholder='Location'
                                    name='location'
                                    value={this.state.location}
                                    onChange={this.onFieldChange}
                                    error={errors.location}
                                    info='Tell us the town you work'
                                />

                                <TextFieldGroup
                                    placeholder='Githubusername'
                                    name='githubusername'
                                    value={this.state.githubusername}
                                    onChange={this.onFieldChange}
                                    error={errors.githubusername}
                                    info='This showcases your latest repos'
                                />
                                <TextAreaFieldGroup
                                    placeholder='Short Biodata'
                                    name='bio'
                                    value={this.state.bio}
                                    onChange={this.onFieldChange}
                                    error={errors.bio}
                                    info='Show a brief description of yourself'
                                />
                                <div className='mb-3'>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            this.setState((prevState) => ({
                                                dispalySocialInputs: !prevState.dispalySocialInputs,
                                            }));
                                        }}
                                        className='btn btn-light'>
                                        Add Social Links
                                    </button>
                                    <small className='text-muted'>Optional</small>
                                </div>
                                {socialInputs}
                                <input
                                    type='submit'
                                    value='Submit'
                                    className='btn btn-info btn-block mt-4'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(CreateProfile)
);
