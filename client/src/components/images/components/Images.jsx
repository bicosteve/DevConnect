import React, { Component } from 'react';
import axios from 'axios';

import TextFieldGroup from '../../common/TextFieldGroup';

class Images extends Component {
  state = {
    image: '',
    title: '',
    loading: false,
    description: '',
    errors: {},
  };

  preset = 'lfir2kop';
  APIBASEURL = 'https://api.cloudinary.com/v1_1/bico';

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onImageInput = (event) => {
    this.setState({ image: event.target.image });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('upload_preset', this.preset);

    try {
      this.setState({ loading: true });
      const res = await axios.post(this.APIBASEURL, formData);
      const imageUrl = res.data.secure_url;
      console.log(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
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
                  error={this.state.errors.title}
                />
                <TextFieldGroup
                  placeholder='Description here'
                  name='description'
                  type='text'
                  value={this.state.description}
                  onChange={this.onInputChange}
                  error={this.state.errors.description}
                />
                <TextFieldGroup
                  placeholder='Description here'
                  name='image'
                  type='file'
                  value={this.state.image}
                  onChange={this.onImageInput}
                  error={this.state.errors.image}
                />

                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Images;

//APIBASEURL - 'https://api.cloudinary.com/v1_1/bico
//Uplaad preset - 'lfir2kop'
