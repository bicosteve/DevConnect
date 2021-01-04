import React, { Component } from 'react';
import isEmpty from '../../validation/is_empty';

class ProfileHeader extends Component {
    render() {
        const { profile } = this.props;

        return (
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card card-body bg-info text-white mb-3'>
                        <div className='row'>
                            <div className='col-4 col-md-3 m-auto'>
                                <img
                                    className='rounded-circle'
                                    src={profile.user.avatar}
                                    alt=''
                                />
                            </div>
                        </div>
                        <div className='text-center'>
                            <h1 className='display-4 text-center'>
                                {profile.user.username}
                            </h1>
                            <p className='lead text-center'>
                                {profile.status}
                                {isEmpty(profile.company) ? null : (
                                    <span> at {profile.company}</span>
                                )}
                            </p>

                            {isEmpty(profile.location) ? null : (
                                <p> at {profile.location}</p>
                            )}

                            <p>
                                {isEmpty(profile.website) ? null : (
                                    <a
                                        rel='noreferrer'
                                        className='text-white p-2'
                                        href={profile.website}
                                        target='_blank'>
                                        <i className='fas fa-globe fa-2x'></i>
                                    </a>
                                )}
                                {isEmpty(
                                    profile.social && profile.social.twitter
                                ) ? null : (
                                    <a
                                        className='text-white p-2'
                                        rel='noreferrer'
                                        href={profile.social.twitter}
                                        target='_blank'>
                                        <i className='fa fa-twitter fa-2x'></i>
                                    </a>
                                )}
                                {isEmpty(
                                    profile.social && profile.social.facebook
                                ) ? null : (
                                    <a
                                        rel='noreferrer'
                                        className='text-white p-2'
                                        href={profile.social.facebook}
                                        target='_blank'>
                                        <i className='fa fa-facebook fa-2x'></i>
                                    </a>
                                )}
                                {isEmpty(
                                    profile.social && profile.social.linkedIn
                                ) ? null : (
                                    <a
                                        className='text-white p-2'
                                        href={profile.social.linkedIn}
                                        rel='noreferrer'
                                        target='_blank'>
                                        <i className='fa fa-linkedin fa-2x'></i>
                                    </a>
                                )}
                                {isEmpty(
                                    profile.social && profile.social.instagram
                                ) ? null : (
                                    <a
                                        className='text-white p-2'
                                        href={profile.social.instagram}
                                        rel='noreferrer'
                                        target='_blank'>
                                        <i className='fa fa-instagram fa-2x'></i>
                                    </a>
                                )}
                                {isEmpty(
                                    profile.social && profile.social.youtube
                                ) ? null : (
                                    <a
                                        className='text-white p-2'
                                        href={profile.social.youtube}
                                        rel='noreferrer'
                                        target='_blank'>
                                        <i className='fa fa-youtube fa-2x'></i>
                                    </a>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileHeader;
