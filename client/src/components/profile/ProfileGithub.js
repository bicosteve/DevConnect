import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileGithub extends Component {
    state = {
        clientId: 'de1149b63e0b8df5841a',
        clientSecret: '94d72823e31507f50eb46ce1bdadcb57b7ffb5cb',
        count: 5,
        sort: 'created:asc',
        repos: [],
    };

    componentDidMount() {
        const { username } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;

        fetch(
            `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (this.refs.myRef) {
                    this.setState({ repos: data });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        const { repos } = this.state;
        const repoItems = repos.map((repo) => {
            return (
                <div key={repo.id} className='card card-body mb-3'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h5>
                                <Link
                                    to={repo.html_url}
                                    className='text-info'
                                    target='_blank'>
                                    {repo.name}
                                </Link>
                            </h5>
                            <p>{repo.description}</p>
                        </div>
                        <div className='col-md-6'>
                            <span className='badge badge-info mr-3'>
                                Stars {repo.stargazers_count}
                            </span>
                            <span className='badge badge-secondary mr-3'>
                                Watchers {repo.watchers_count}
                            </span>
                            <span className='badge badge-success'>
                                Forks {repo.forks_count}
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div ref='myRef'>
                <hr />
                <h4 className='mb-4'>Latest Github Repos</h4>
                {repoItems}
            </div>
        );
    }
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired,
};

export default ProfileGithub;
