import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  query Query($getChatInput: getChatInput) {
    getChat(input: $getChatInput) {
      from
      to
      message
      id
    }
  }
`
