import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteComment } from '../../actions/postAction';

class CommentItem extends Component {
    onDeleteComment(postId, commentId) {
        this.props.deleteComment(postId, commentId);
    }

    render() {
        const { comment, auth, postId } = this.props;
        return (
            <div className='card card-body mb-3'>
                <div className='row'>
                    <div className='col-md-2'>
                        <a href='profile.html'>
                            <img
                                className='rounded-circle d-none d-md-block'
                                src={comment.avatar}
                                alt={comment.username}
                            />
                        </a>
                        <br />
                        <p className='text-center'>{comment.username}</p>
                    </div>
                    <div className='col-md-10'>
                        <p className='lead'>{comment.text}</p>
                        {comment.user === auth.user.id ? (
                            <button
                                onClick={this.onDeleteComment.bind(
                                    this,
                                    postId,
                                    comment._id
                                )}
                                type='button'
                                className='btn btn-danger ml-2'>
                                <i className='fas fa-times m-1' />
                                <span className='ml-2'>Delete</span>
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
