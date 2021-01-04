import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { deleteEducation } from '../../actions/profileAction';

class Education extends Component {
    onDeleteEducation = (id) => {
        this.props.deleteEducation(id);
    };

    render() {
        const education = this.props.education.map((ed) => {
            return (
                <tr key={ed._id}>
                    <td>{ed.school}</td>
                    <td>{ed.degree}</td>
                    <td>{ed.fieldOfStudy}</td>
                    <td>
                        {moment(ed.from).format('DD/MM/YYYY')} -{' '}
                        {ed.to === null
                            ? 'Current'
                            : moment(ed.to).format('DD/MM/YYYY')}
                    </td>
                    <td>
                        <button
                            onClick={this.onDeleteEducation}
                            className='btn btn-outline-danger'>
                            Remove
                        </button>
                    </td>
                </tr>
            );
        });
        return (
            <div className='education'>
                <h6 className='mb-4'>Education</h6>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Field</th>
                            <th>Year</th>
                            <th></th>
                        </tr>
                        {education}
                    </thead>
                </table>
            </div>
        );
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
