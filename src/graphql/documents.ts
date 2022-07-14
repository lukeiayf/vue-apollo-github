import { gql } from "@apollo/client/core";

const REPO_FRAGMENT = gql`
  fragment repo on Repository {
    id
    name
    url
    stargazers {
      totalCount
    }
    viewerHasStarred
    description
    licenseInfo {
      name
    }
    updatedAt
    owner {
      login
      avatarUrl
    }
    primaryLanguage {
      color
      name
    }
    repositoryTopics(first: 10) {
      edges {
        node {
          topic {
            name
          }
        }
      }
    }
  }
`;

const USER_FRAGMENT = gql`
  fragment user on User {
    id
    name
    login
    avatarUrl
    bio
    repositories(first: 10, ) {
      totalCount
      edges {
        cursor
        node {
          id
          name
          description
          updatedAt
          primaryLanguage {
            id
            name
          }
        }
      }
    }
  }
`;

export const ADD_STAR = gql`
  mutation($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const REMOVE_STAR = gql`
  mutation($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const SEARCH_REPOS = gql`
  ${REPO_FRAGMENT},

  query SearchRepoQuery($query: String!, $limit: Int!) {
    search(query: $query, type: REPOSITORY, first: $limit) {
      edges {
        node {
          ...repo
        }
      }
    }
  }
`;

export const SEARCH_USERS = gql`
  ${USER_FRAGMENT},

  query SearchUserQuery($query: String!, $limit: Int!) {
    search(query: $query, type: USER, first: $limit) {
      edges {
        node {
          ...user
        }
      }
    }
  }
`;
  
