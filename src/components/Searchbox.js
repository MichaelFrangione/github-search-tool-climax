import React from 'react';
import { connect } from 'react-redux';
import GraphQLActions from '../graphQl/GraphQLActions';
import { onSearch, clearSearchResults, updateSearchTerm, onSearchError, updateLoadingState } from "../actions/index";
  
class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleOnSearchBoxValChange = this.handleOnSearchBoxValChange.bind(this);
    }
    
    componentWillMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.fetchUsers();
        }
    }

    fetchUsers() {
        const { searchboxVal } = this.state;
        const { loading } = this.props;

        if (loading) { return; }
        
        this.props.clearSearchResults();
        this.props.updateLoadingState(true);

        return GraphQLActions.getUsers(searchboxVal)
            .then(result => {
                console.log(result);
                this.setState({ loading: false })
                this.props.onSearch(result.search);
            }).catch(e => {
                console.warn('error:', e);
                this.props.onSearchError("An error has occured, please try again");
                this.setState({ loading: false })
            })
    }

    handleOnSearchBoxValChange(e) {
        this.props.updateSearchTerm(e.target.value);
        this.setState({
            searchboxVal: e.target.value,
        });
    }
    
    render() {
        const { searchTerm, loading } = this.props;

        return (
            <div className="search-container">
                <input placeholder="Search for users and organizations" value={searchTerm} onChange={this.handleOnSearchBoxValChange}/>
                <button disabled={loading} onClick={this.fetchUsers}><i className="material-icons search-icon">search</i></button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      onSearch: users => dispatch(onSearch(users)),
      clearSearchResults: () => dispatch(clearSearchResults()),
      updateSearchTerm: (str) => dispatch(updateSearchTerm(str)),
      onSearchError: (err) => dispatch(onSearchError(err)),
      updateLoadingState: (state) => dispatch(updateLoadingState(state)),
    };
}
const mapStateToProps = state => {
  return { 
    pageInfo: state.pageInfo,
    searchTerm: state.search
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);