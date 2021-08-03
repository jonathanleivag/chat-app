import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Mutation($loginInput: LoginInput) {
    login(input: $loginInput) {
      data {
        id
        updatedAt
        createdAt
        online
        email
        name
      }
      message
      token
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUserMutation($createUserInput: CreateUserInput) {
    createUser(input: $createUserInput) {
      data {
        id
        name
        email
        online
        createdAt
        updatedAt
      }
      message
      token
    }
  }
`

export const VERIFY_TOKEN = gql`
  query Query {
    isLogin
  }
`

export const RE_NEW_TOKEN = gql`
  query Query {
    reNewToken {
      token
      user {
        id
        name
        email
        online
        createdAt
        updatedAt
      }
    }
  }
`
