import React, { Component } from 'react';
import * as moment from 'moment';

class ProfileCreds extends Component {
    render() {
        const { education, experience } = this.props;

        const educationItem = education.map((edu, index) => {
            return (
                <li key={index} className='list-group-item'>
                    <h5>{edu.school}</h5>
                    <p>
                        {moment(edu.from).format('DD/MM/YYYY')} -{' '}
                        {edu.to === null
                            ? 'Now'
                            : moment(edu.to).format('DD/MM/YYYY')}
                    </p>
                    <p>
                        <strong>Education </strong>
                        {edu.degree}
                    </p>
                    <p>
                        <strong>Field Of Study </strong> {edu.fieldOfStudy}
                    </p>
                    <p>
                        {edu.description === '' ? null : (
                            <span>
                                <strong>Description </strong>
                                {edu.description}
                            </span>
                        )}
                    </p>
                </li>
            );
        });

        const experienceItem = experience.map((exp, index) => {
            return (
                <li key={index} className='list-group-item'>
                    <h5>{exp.company}</h5>
                    <p>
                        {moment(exp.from).format('DD/MM/YYYY')} -{' '}
                        {exp.to === null
                            ? 'Now'
                            : moment(exp.to).format('DD/MM/YYYY')}
                    </p>
                    <p>
                        <strong>Position </strong>
                        {exp.title}
                    </p>
                    <p>
                        {exp.location === '' ? null : (
                            <span>
                                <strong>Location </strong>
                                {exp.location}
                            </span>
                        )}
                    </p>
                    <p>
                        {exp.description === '' ? null : (
                            <span>
                                <strong>Description </strong>
                                {exp.description}
                            </span>
                        )}
                    </p>
                </li>
            );
        });

        return (
            <div className='row'>
                <div className='col-md-6'>
                    <h4 className='text-center text-info'>Experience</h4>
                    {experienceItem.length > 0 ? (
                        <ul className='list-group'>{experienceItem}</ul>
                    ) : (
                        <p className='text'>No experience listed yet</p>
                    )}
                </div>
                <div className='col-md-6'>
                    <h4 className='text-center text-info'>Education</h4>
                    {educationItem.length > 0 ? (
                        <ul className='list-group'>{educationItem}</ul>
                    ) : (
                        <p className='text'>No education listed yet</p>
                    )}
                </div>
            </div>
        );
    }
}

export default ProfileCreds;
