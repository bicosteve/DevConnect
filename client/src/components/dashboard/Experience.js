import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { deleteExperience } from '../../actions/profileAction';

class Experience extends Component {
    onDeleteExperience = (id) => {
        this.props.deleteExperience(id);
    };

    render() {
        const experience = this.props.experience.map((exp) => {
            return (
                <tr key={exp._id}>
                    <td>{exp.company}</td>
                    <td>{exp.title}</td>
                    <td>
                        {moment(exp.from).format('DD/MM/YYYY')} -{' '}
                        {exp.to === null
                            ? 'Current'
                            : moment(exp.to).format('DD/MM/YYYY')}
                    </td>
                    <td>
                        <button
                            onClick={this.onDeleteExperience}
                            className='btn btn-outline-danger'>
                            Remove
                        </button>
                    </td>
                </tr>
            );
        });
        return (
            <div className='experience'>
                <h6 className='mb-4'>Experiences</h6>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                        {experience}
                    </thead>
                </table>
            </div>
        );
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
