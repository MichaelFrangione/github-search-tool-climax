import ApolloClient from 'apollo-boost';
import { GET_USERS, GET_USERS_WITH_PAGINATION, GET_USERS_REPOS, GET_ORGANIZATION_REPOS } from  './GraphQlSchemas';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
        }
      });
    },
  });
  
export default class graphQLActions {

    static getUsers(searchboxVal) {
        return client.query({ 
            query: GET_USERS, 
            variables: { 
                search_query: searchboxVal
            },
            fetchPolicy: 'no-cache'
        })
        .then(result => {
            console.log(result.data);
            return result.data;
        }).catch((e) => e);
    }
    
    static getUsersWithPagination(searchboxVal, endCursor) {
        return client.query({ 
            query: GET_USERS_WITH_PAGINATION, 
            variables: { 
                search_query: searchboxVal,
                end_cursor: endCursor
            },
            fetchPolicy: 'no-cache' 
          })
          .then(result => {
              console.log(result.data);
              return result.data;
          }).catch((e) => e);
    }

    static getReposForUser(login) {
      return client.query({ 
          query: GET_USERS_REPOS, 
          variables: { 
            login
          },
          fetchPolicy: 'no-cache'
      })
      .then(result => {
          console.log(result.data);
          return result.data.user.repositories.nodes;
      }).catch((e) => e);
  }

  static getReposForOrganization(login) {
    return client.query({ 
        query: GET_ORGANIZATION_REPOS, 
        variables: { 
          login
        },
        fetchPolicy: 'no-cache'
    })
    .then(result => {
        console.log(result.data);
        return result.data.organization.repositories.nodes;
    }).catch((e) => e);
  }
}


  
