import gql from 'graphql-tag';
export default gql`
mutation AddMessage($id: ID!, $username: String!, $message: String!, $createdAt: String!){
	createMessages(input: {
    id: $id
    username: $username
    message: $message
    createdAt: $createdAt
  }) 
  {
    id
    username
    message
    createdAt
  }
}
`;