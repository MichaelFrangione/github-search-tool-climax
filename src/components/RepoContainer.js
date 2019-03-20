import React from 'react';
import RepoBox from './RepoBox';
import Spinner from './Spinner';
import GraphQLActions from '../graphQl/GraphQLActions';

class RepoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            repos: []
        }
    }

    componentDidMount() {
        this.fetchRepos();
    }

    fetchRepos() {
        const { login, organization } = this.props;

        if (organization) {
            return GraphQLActions.getReposForOrganization(login)
                .then(result => {
                    this.setState({
                        repos: result,
                        loading: false
                    })
                }).catch((e) => {
                    console.warn('error:', e);
                    this.setState({
                        loading: false
                    })
                });
        }
        
        return GraphQLActions.getReposForUser(login)
            .then(result => {
                this.setState({
                    repos: result,
                    loading: false
                })
            }).catch((e) => {
                console.warn('error:', e);
                this.setState({
                    loading: false
                })
            });
    }

        
    render() {
        const { loading, repos } = this.state;

        return (
            <div className="repos-container">
                {loading && <Spinner/>}
                {repos.map((repo, i) => {
                    return <RepoBox repo={repo} key={i}/>
                })}
            </div>)
        }
}

export default RepoContainer;