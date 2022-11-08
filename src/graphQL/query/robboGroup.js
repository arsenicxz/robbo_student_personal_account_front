import { gql } from "@apollo/client"

import { graphQLClient } from "@/graphQL"

export const robboGroupsQueryGraphQL = {
    searchRobboGroupsByName(name) {
        return graphQLClient.query(
            {
                query: gql`
                    query SearchGroupsByName($name: String!) {
                        SearchGroupsByName(name: $name) {
                            id
                            name
                        }
                    }
                `,
                variables: name,
            },
        )
    },

    getRobboGroupById(id) {
        return graphQLClient.query(
            {
                query: gql`
                    query GetRobboGroupById($id: String!) {
                        GetRobboGroupById(id: $id) {
                            id
                            name
                            robboUnitId
                        }
                    }
                `,
                variables: id,
            },
        )
    },

    getRobboGroupsByTeacherId(teacherId) {
        return graphQLClient.query(
            {
                query: gql`
                    query GetRobboGroupsByTeacherId($teacherId: String!) {
                        GetRobboGroupsByTeacherId(teacherId: $teacherId){
                            id
                            name
                            robboUnitId
                        }
                    }
                `,
                variables: teacherId,
            },
        )
    },

    getRobboGroupsByAccessToken() {
        return graphQLClient.query(
            {
                query: gql`
                    query {
                        GetRobboGroupsByAccessToken{
                            id
                            name
                            robboUnitId
                        }
                    }
                `,
            },
        )
    },
}