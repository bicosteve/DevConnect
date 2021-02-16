import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import FileFieldGroup from '../common/FileFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { postImage } from '../../actions/imageAction';

class ImagesUpload extends Component {
  state = {
    picture: '',
    title: '',
    filename: 'Choose file',
    description: '',
    errors: {},
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFileChange = (event) => {
    this.setState({ picture: event.target.files[0] });
    this.setState({ filename: event.target.files[0].name });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();

    formData.append('description', this.state.description);
    formData.append('title', this.state.title);
    formData.append('picture', this.state.picture);
    this.props.postImage(formData, this.props.history);
    this.setState({ description: '' });
    this.setState({ title: '' });
    this.setState({ filename: '' });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='images'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 m-auto border border-light p-4'>
              <h6 className='text-center'>Upload Images</h6>
              <hr />
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='Title here'
                  name='title'
                  type='text'
                  value={this.state.title}
                  onChange={this.onInputChange}
                  error={errors.title}
                />
                <FileFieldGroup
                  placeholder='File here'
                  name='picture'
                  type='file'
                  id='picture'
                  label={this.state.filename}
                  onChange={this.onFileChange}
                  error={errors.picture}
                />
                <TextAreaFieldGroup
                  placeholder='Description here'
                  name='description'
                  type='text'
                  value={this.state.description}
                  onChange={this.onInputChange}
                  error={errors.description}
                />
                <input
                  type='submit'
                  value='Submit'
                  className='btn btn-info btn-block mt-4'
                />
              </form>
              <hr />
              <Link
                to='/all-images'
                className='btn btn-info btn-block mt-4 mb-3'>
                Show Images
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ImagesUpload.propTypes = {
  images: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  images: state.image,
  errors: state.errors,
});

export default connect(mapStateToProps, { postImage })(
  withRouter(ImagesUpload)
);
