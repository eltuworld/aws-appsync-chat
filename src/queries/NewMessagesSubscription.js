import gql from 'graphql-tag';
export default gql`
    subscription NewPostSub {
    onCreateMessages {
        __typename
        id
        username
        message
    }
}`;