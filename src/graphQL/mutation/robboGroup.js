import { gql } from "@apollo/client"

export const robboGroupMutationGQL = {
    UPDATE_ROBBO_GROUP: gql`
        mutation  UpdateRobboGroup($input:  UpdateRobboGroup!) {
            UpdateRobboGroup(input: $input) {
                ... on RobboGroupHttp{
                    id
                    robboUnitId
                    name
                }
                ... on Error{
                message
                } 
            }
        }
    `,
}