import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postAction';

class PostForm extends Component {
    state = {
        text: '',
        errors: {},
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    postFormSubmit = async (event) => {
        event.preventDefault();

        const { user } = this.props.auth;

        const newPost = {
            text: this.state.text,
            username: user.username,
            avatar: user.avatar,
        };

        this.props.addPost(newPost);
        this.setState({ text: '' });
    };

    render() {
        const { errors } = this.state;

        return (
            <div className='post-form mb-3'>
                <div className='card card-info'>
                    <div className='card-header bg-info text-white'>
                        Talk to other devs...
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.postFormSubmit}>
                            <div className='form-group'>
                                <TextAreaFieldGroup
                                    onChange={this.onChange}
                                    placeholder='Create a post'
                                    name='text'
                                    value={this.state.text}
                                    error={errors.text}
                                />
                            </div>
                            <button
                                type='submit'
                                className='btn btn-info btn-block mt-2'>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(PostForm);
