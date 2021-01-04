import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postAction';

class CommentForm extends Component {
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

    commentFormSubmit = async (event) => {
        event.preventDefault();

        const { user } = this.props.auth;
        const { postId } = this.props;

        const newComment = {
            text: this.state.text,
            username: user.username,
            avatar: user.avatar,
        };

        this.props.addComment(postId, newComment);
        this.setState({ text: '' });
    };

    render() {
        const { errors } = this.state;

        return (
            <div className='post-form mb-3'>
                <div className='card card-info'>
                    <div className='card-header bg-info text-white'>
                        Make a comment...
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.commentFormSubmit}>
                            <div className='form-group'>
                                <TextAreaFieldGroup
                                    onChange={this.onChange}
                                    placeholder='Create a comment'
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

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
