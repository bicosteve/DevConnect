import React, { Fragment } from 'react';
//import classnames from 'classnames';
import PropTypes from 'prop-types';

const FileFieldGroup = ({ name, type, id, onChange, error, label }) => {
  return (
    <Fragment>
      <div className='custom-file mb-3'>
        <input
          className='custom-file-input'
          onChange={onChange}
          type={type}
          name={name}
          id={id}
          label={label}
        />
        <label className='custom-file-label'>{label}</label>
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </Fragment>
  );
};

FileFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  filename: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
};

FileFieldGroup.defaultProps = {
  type: 'file',
};

export default FileFieldGroup;
