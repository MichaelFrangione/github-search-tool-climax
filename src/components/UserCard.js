import React from 'react';
import RepoContainer from './RepoContainer';

class UserCard extends React.Component {
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
        const { avatarUrl, bio, name, login, following, followers, location, repositories, url} = this.props.user;
        const { expanded } = this.state

        return (
        <div className={`user-card ${expanded ? 'expanded' : ''}`}>
            <div className="visible-flex-container">
                <img className="user-avatar" src={avatarUrl} alt={login} />   
                <div className="metadata">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <h3 className="name">{name ? name : login }</h3>
                    </a>
                    {location && <div className="location">{location}</div>}
                    <hr />
                    <p>Followers: {followers.totalCount || 0} Following: {following.totalCount || 0}</p>
                    <p className="bio">{bio}</p>
                    <p>Repos: {repositories.totalCount}</p>
                </div>
                {repositories.totalCount > 0 && 
                    <i onClick={this.onExpandClicked} title='Show Repos' className={`material-icons expand-icon ${expanded ? 'expanded': '' }`}>expand_more</i>
                }
            </div>
            {expanded && <RepoContainer login={login}/>}
        </div>);
    }
}

export default UserCard;