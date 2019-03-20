import React from 'react';
import LanguageBox from './LanguageBox';

class RepoBox extends React.Component {

    render() {
        const { description, languages, name, url, stargazers} = this.props.repo;

        return (
            <div className="repo-box">
                <a className="repo-name" href={url} target="_blank" rel="noopener noreferrer"><h4>{name}</h4></a>
                <p className="ellipsis description">{description}</p>
                <div className="stargazers" title="Stargazers">
                    <i className="material-icons">star_rate</i>
                    <span>{stargazers.totalCount}</span>
                </div>
                <div className="languages-container">
                    {languages.edges.map((language, i) => {
                        const {name, color} = language.node;
                        return <LanguageBox name={name} color={color} key={i} />
                    })}
                </div>
            </div>
        );
    }
}

export default RepoBox;