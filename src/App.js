import React from 'react';
import './App.css';
import resume from './resume.json';

function App() {
    const {basics, education, projects, skills, work} = resume;
    return (
        <>
            <div className="header">
                <div className="grid-container">
                    <div className="name">
                        <h1>{basics.name}</h1>
                        <h2>{basics.label}</h2>
                    </div>
                    <div className="social">
                        {basics.profiles.map(profile => <Profile profile={profile}/>)}
                    </div>
                </div>

            </div>
            <section>
                <h2 className="content-subhead">Summary</h2>
                <span>
                    {basics.summary}
                </span>
                <ul>
                    {basics.points.map(point => {
                        return <li>{point}</li>
                    })}
                </ul>
            </section>

            <Section name="Education">
                <ul className="no-list-style">
                    {education.map(ed => <li>
                        <Education education={ed}/>
                    </li>)}
                </ul>
            </Section>

            <Section name="Skills"><Skills skills={skills[0].keywords}/></Section>

            <Section name="Work"><Experience work={work}/></Section>

            <Section name="Personal Projects">
                {projects && <ul>
                    {projects.map(project => {
                        return <li><strong>{project.name}</strong> - <a href={project.website}>{project.website}</a>
                            <div>{project.summary}</div>
                        </li>
                    })}
                </ul>}

            </Section>

            {/*<Section name="Other works">*/}
            {/*    <ul className="no-list-style">*/}
            {/*        {education.map(ed => <li>*/}
            {/*            <Education education={ed}/>*/}
            {/*        </li>)}*/}
            {/*    </ul>*/}
            {/*</Section>*/}
        </>
    );
}

const Section = ({children, name}) => {
    return <section>
        <h2 className="content-subhead">{name}</h2>
        {children}
    </section>
}

const Profile = ({profile}) => {
    return <li className="profile-items no-list-style">
        <a href={profile.url}>{profile.username} {getIcon(profile.network.toLowerCase())}</a>
    </li>
}

const Skills = ({skills}) => {
    return <ul className="skills">
        {skills.map(skill => <li className="chip">{skill}</li>)}
    </ul>
}

const getIcon = (network) => {
    switch (network) {
        case 'github' :
            return <i className="fab fa-github"/>;
        case 'stackoverflow':
            return <i className="fab fa-stack-overflow"/>;
        case 'linkedin':
            return <i className="fab fa-linkedin"/>;
        case 'phone':
            return <i className="fa fa-phone"/>;
        case 'email':
            return <i className="fa fa-envelope"/>;
        default:
    }
}

const Education = ({education}) => {
    return <ul className="no-list-style">
        <li>
            <div>
                <div className="float-right"><small>
                    {getFormattedDate(education.startDate)} {education.startDate ? '-' : ''} {getFormattedDate(education.endDate)}</small>
                </div>
                <div><strong>{education.area}, {education.studyType}&nbsp;</strong>
                    <br/>
                    {education.institution}
                </div>
            </div>
        </li>
    </ul>
}

const Experience = ({work}) => {
    return <ul className="no-list-style">
        {work.map(w => <li>
            <div>
                <div>
                    <strong>{w.position}</strong> | <a href={w.website}
                                                       target="_blank">{w.company}</a> | <span
                    className="italics">{w.summary}</span> <small
                    className="float-right">
                    <span className="space-right">
                        <i className="time-icon far fa-clock"/>
                        {getFormattedDate(w.startDate)} - {w.endDate ? getFormattedDate(w.endDate) : '*'}
                        {w.endDate && (' (' + calcDate(w.endDate, w.startDate) + ')')}
                    </span>
                </small>
                </div>
                <div>

                </div>
                <ul>
                    {w.highlights.map(item => <li>
                        <div>{item}</div>
                    </li>)}
                </ul>
            </div>
        </li>)}
    </ul>
}

const getFormattedDate = (date) => {
    if (!date) return '';
    const options = {year: 'numeric', month: 'short'};
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
    const parts = dateTimeFormat.formatToParts(new Date(Date.parse(date)));
    return parts[0].value + ', ' + (parts[2].value - 2000);
}

function calcDate(date1, date2) {
    if (!date1) return ''
    const diffDate = new Date(new Date(date1).getTime() - new Date(date2).getTime());
    return ((diffDate.toISOString().slice(0, 4) - 1970) + " yrs" +
        (diffDate.getMonth() < 1 ? "" : ' ' + (diffDate.getMonth() + " mos"))  );
}

export default App;
