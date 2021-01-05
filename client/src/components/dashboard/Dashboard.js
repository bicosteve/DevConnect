import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    getCurrentProfile,
    deleteAccount,
    deleteProfile,
} from '../../actions/profileAction';
import { fetchUser } from '../../actions/authAction';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
        this.props.fetchUser();
    }

    onDeleteAccount = (event) => {
        this.props.deleteAccount();
    };

    onDeleteProfile = (event) => {
        this.props.deleteProfile(this.props.history);
    };

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            //check if logged user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className='lead text-muted'>
                            Welcome{' '}
                            <Link to={`/profile/${profile.handle}`}>
                                {user.username}
                            </Link>{' '}
                        </p>
                        <ProfileActions />
                        <Experience
                            className='mb-4'
                            experience={profile.experience}
                        />
                        <Education className='mt-4' education={profile.education} />
                        <div style={{ marginBottom: '10px' }}>
                            <button
                                onClick={this.onDeleteProfile}
                                className='btn btn-outline-warning float-left btn-lg mt-3'>
                                Delete Profile
                            </button>
                            <button
                                style={{}}
                                onClick={this.onDeleteAccount}
                                className='btn btn-outline-danger  btn-lg m-3'>
                                Delete Account
                            </button>
                        </div>
                    </div>
                );
            } else {
                ///user logged in with no profile
                dashboardContent = (
                    <div>
                        <p className='lead text-muted'>Welcome {user.username}</p>
                        <p>
                            Please create your profile since you do not have any yet
                        </p>
                        <Link to='/create-profile' className='btn btn-lg btn-info'>
                            Create Profile
                        </Link>
                    </div>
                );
            }
        }

        return (
            <div className='dashboard'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h2 className='display-4'>Dashboard</h2>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    getCurrentProfile,
    deleteAccount,
    deleteProfile,
    fetchUser,
})(withRouter(Dashboard));
