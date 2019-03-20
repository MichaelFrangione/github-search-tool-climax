import React from 'react';
import RepoContainer from './RepoContainer';

class OrganizationCard extends React.Component {
    constructor(props) {
        super(props);
        this.onExpandClicked = this.onExpandClicked.bind(this);
        this.state = {
            expanded: false
        }
    }

    onExpandClicked() {
        const { expanded } = this.state
        this.setState({
            expanded: !expanded
        });
    }
        
    render() {
        const { avatarUrl, name, login, location, repositories, url} = this.props.user;
        const { expanded } = this.state

        return (
        <div className={`organization-card ${expanded ? 'expanded' : ''}`}>
            <div className="visible-flex-container">
                <img className="user-avatar" src={avatarUrl} alt={login} />   
                <div className="metadata">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <h3 className="name">{name ? name : login }</h3>
                    </a>
                    {location && <p>Location: {location}</p>}
                    <p>Repos: {repositories.totalCount}</p>
                </div>
                {repositories.totalCount > 0 && 
                    <i onClick={this.onExpandClicked} title='Show Repos' className={`material-icons expand-icon ${expanded ? 'expanded': '' }`}>expand_more</i>
                }
            </div>
            {expanded && <RepoContainer login={login} organization={true}/>}
        </div>);
    }
}

export default OrganizationCard;