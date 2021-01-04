import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { deletePost, addLike, removeLike } from '../../actions/postAction';

class PostItem extends Component {
    constructor(props) {
        super(props);

        this.onDeletePost.bind(this);
        this.onAddLike.bind(this);
        this.onRemoveLike.bind(this);
    }

    onDeletePost = (id) => {
        this.props.deletePost(id);
    };

    onAddLike = (id) => {
        this.props.addLike(id);
    };

    onRemoveLike = (id) => {
        this.props.removeLike(id);
    };

    findUserLike = (likes) => {
        const { auth } = this.props;
        if (likes.filter((like) => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    };

    render() {
        const { post, auth, showActions } = this.props;

        return (
            <div className='card card-body mb-3'>
                <div className='row'>
                    <div className='col-md-2'>
                        <Link to='/profile'>
                            <img
                                className='rounded-circle d-none d-md-block'
                                src={post.avatar}
                                alt={post.username}
                            />
                        </Link>
                        <br />
                        <p className='text-center'>{post.username}</p>
                    </div>
                    <div className='col-md-10'>
                        <p className='lead'>{post.text}</p>
                        {showActions ? (
                            <span>
                                {' '}
                                <button
                                    onClick={this.onAddLike.bind(this, post._id)}
                                    type='button'
                                    className='btn btn-light '>
                                    <span className='badge badge-light mr-1'>
                                        {post.likes.length}{' '}
                                    </span>
                                    <i
                                        className={classnames(
                                            ' fas fa-thumbs-up ml-2',
                                            {
                                                'text-info ml-2': this.findUserLike(
                                                    post.likes
                                                ),
                                            }
                                        )}></i>
                                </button>
                                <button
                                    onClick={this.onRemoveLike.bind(this, post._id)}
                                    type='button'
                                    className='btn btn-light ml-2'>
                                    <span className='badge badge-light bg-light mr-1'></span>
                                    <i className='text-secondary fas fa-thumbs-down ml-2'></i>
                                </button>
                                <Link
                                    to={`/post/${post._id}`}
                                    className='btn btn-info ml-2'>
                                    {post.comments.length}{' '}
                                    <i className='fa fa-comment-o ml-1'></i>
                                </Link>
                                {post.user === auth.user.id ? (
                                    <button
                                        onClick={this.onDeletePost.bind(
                                            this,
                                            post._id
                                        )}
                                        type='button'
                                        className='btn btn-danger ml-2'>
                                        <i className='fas fa-times m-1' />
                                        <span className='ml-2'>Delete</span>
                                    </button>
                                ) : null}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
};

PostItem.defaultProps = {
    showActions: true,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
    PostItem
);
