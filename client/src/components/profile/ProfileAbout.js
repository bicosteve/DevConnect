import React, { Component } from 'react';
import PropTypes from 'prop-types';

import isEmpty from '../../validation/is_empty';

class ProfileAbout extends Component {
    render() {
        const { profile } = this.props;

        //get first name
        const firstName = profile.user.username.trim().split(' ')[0];

        //skill list
        const skills = profile.skills.map((skill, index) => {
            return (
                <div key={index} className='p-3'>
                    <i className='fa fa-check' /> {skill}
                </div>
            );
        });

        return (
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card card-body bg-light mb-3'>
                        <h3 className='text-center text-info'>{firstName}</h3>
                        <p className='lead'>
                            {isEmpty(profile.bio) ? (
                                <span>{firstName} has no Bio</span>
                            ) : (
                                <span>{profile.bio}</span>
                            )}
                        </p>
                        <hr />
                        <h3 className='text-center text-info'>Skills</h3>
                        <div className='row'>
                            <div className='d-flex flex-wrap justify-content-center align-items-center'>
                                {skills}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
