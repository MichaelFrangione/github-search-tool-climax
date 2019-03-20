import React, { Fragment } from 'react';
import { connect } from "react-redux";
import _throttle from 'lodash/throttle';
import GraphQLActions from '../graphQl/GraphQLActions';
import { onSearch, clearSearchResults, updateSearchTerm, updateLoadingState } from "../actions/index";
import UserCard from './UserCard';
import OrganizationCard from './OrganizationCard';
import Spinner from './Spinner';

class UserListContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.onScroll = _throttle(this.onScroll.bind(this), 200);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll(e) {
        if (Math.round(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight) {
            this.fetchUsers();
        }
    }


    fetchUsers() {
        const { searchboxVal, pageInfo, loading } = this.props;

        if (pageInfo.hasNextPage && !loading) {
            this.props.updateLoadingState(true);

            return GraphQLActions.getUsersWithPagination(searchboxVal, pageInfo.endCursor)
            .then(result => {
                this.props.onSearch(result.search);
            }).catch((e) => {
                console.warn('error:', e);
                this.props.onSearchError("An error has occured, please try again");
            });
        }
    }

    render() {
        const { searchResults, userCount, pageInfo, error, loading } = this.props;

        return (
            <Fragment>
                <div className="results-container">
                    {userCount > 0 && <h4>Showing {searchResults.length} of {userCount} Users</h4>}
                    {userCount < 1 && pageInfo && <h4>No Results Found</h4>}
                    {error && <h4>{error}</h4>}
                </div>
                <div className="user-card-container" ref={(n) => this.containerEl = n}>
                    {searchResults.map((user, i) => {
                    if (user.node.__typename === 'Organization') {
                        return <OrganizationCard user={user.node} key={i}/>
                    }
                    return <UserCard user={user.node} key={i}/>
                    })}
                </div>
                {loading && <Spinner/>}
          </Fragment>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSearch: users => dispatch(onSearch(users)),
        clearSearchResults: () => dispatch(clearSearchResults()),
        updateSearchTerm: (str) => dispatch(updateSearchTerm(str)),
        updateLoadingState: (state) => dispatch(updateLoadingState(state)),
    };
}

const mapStateToProps = state => {
    return { 
        searchResults: state.searchResults,
        userCount: state.userCount,
        searchboxVal: state.search,
        pageInfo: state.pageInfo,
        error: state.error,
        loading: state.loading,
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);