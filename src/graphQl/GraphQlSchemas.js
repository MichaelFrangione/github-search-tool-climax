import { gql } from 'apollo-boost';

export const GET_USERS = gql`
query ($search_query: String!) {
  search(query: $search_query, type: USER, first: 10) {
    userCount
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        ... on User {
          name
          id
          url
          bio
          email
          location
          company
          login
          followers {
            totalCount
          }
          following {
            totalCount
          }
          avatarUrl
          repositories(first: 1) {
            totalCount
          }
        }
      }
      node {
        ... on Organization {
          name
          avatarUrl
          description
          email
          id
          location
          login
          repositories(first: 1) {
            totalCount
          } 
        }
      }
      cursor
    }
  }
}   
`;

export const GET_USERS_WITH_PAGINATION = gql`
query ($search_query: String!, $end_cursor: String!) {
    search(query: $search_query, type: USER, first: 10, after: $end_cursor) {
      userCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on User {
            name
            id
            url
            email
            location
            company
            login
            followers {
              totalCount
            }
            following {
              totalCount
            }
            avatarUrl
            repositories(first: 100) {
              totalCount
            }
          }
        }
        node {
          ... on Organization {
            name
            avatarUrl
            description
            email
            id
            location
            login
            repositories(first: 100) {
              totalCount
            } 
          }
        }
        cursor
      }
    }
  }   
`;

export const GET_USERS_REPOS = gql`
query ($login: String!) {
  user(login: $login) {
    repositories(first: 100, isFork: false) {
      nodes {
        name
        url
        description
        resourcePath
        languages(first: 100) {
          edges {
            node {
              ... on Language {
                name
                color
              }
            }
          }
        }
        description
        stargazers {
          totalCount
        }
      }
    }
  }
}
`;

export const GET_ORGANIZATION_REPOS = gql`
query ($login: String!) {
  organization(login: $login) {
    repositories(first: 100, isFork: false) {
      nodes {
        name
        url
        description
        resourcePath
        languages(first: 100) {
          edges {
            node {
              ... on Language {
                name
                color
              }
            }
          }
        }
        description
        stargazers {
          totalCount
        }
      }
    }
  }
}
`;