import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    label,
    info,
    type,
    onChange,
    disabled,
}) => {
    return (
        <div className='form-group'>
            {label && <label className='form-info text-muted'>{label}</label>}
            <input
                type={type}
                className={classnames('form-control form-control-md', {
                    'is-invalid': error,
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info && <small className='form-info text-muted'>{info}</small>}
            {error && <div className='invalid-feedback'>{error}</div>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
    label: PropTypes.string,
};

TextFieldGroup.defaultProps = {
    type: 'text',
};

export default TextFieldGroup;
