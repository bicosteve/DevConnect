import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getImages } from '../../actions/imageAction';

class ShowImages extends Component {
  componentDidMount() {
    this.props.getImages();
  }

  render() {
    const { images } = this.props;
    const showImages = () => {
      return images.images.map((image, index) => {
        return (
          <Fragment key={index}>
            <div className='card mb-3' style={{ width: '24rem' }}>
              <img
                src={image.picture}
                className='card-img-top'
                alt={image.title}
              />
              <div className='card-body'>
                <h5 className='card-title'>{image.title}</h5>
                <p className='card-text'>{image.description}</p>
              </div>
            </div>
          </Fragment>
        );
      });
    };

    return <div>{showImages()}</div>;
  }
}

ShowImages.propTypes = {
  getImages: PropTypes.func.isRequired,
  images: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  images: state.images,
});

export default connect(mapStateToProps, { getImages })(ShowImages);
