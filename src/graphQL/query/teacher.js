import { gql } from "@apollo/client"

import { graphQLClient } from "@/graphQL"

export const teacherQuerysGQL = {
    GET_TEACHERS_BY_ROBBO_GROUP_ID: gql`
    query GetTeachersByRobboGroupId($robboGroupId: String!){
        GetTeachersByRobboGroupId(robboGroupId: $robboGroupId){
            ... on TeacherHttpList {
                teachers {
                    userHttp{
                        id
                        lastname
                        firstname
                        middlename
                    }
                }
            }
            ... on Error {
                message
            }
        }
    }
    `,

    GET_TEACHER_BY_ID: gql`
    query GetTeacherById($teacherId: String!){
        GetTeacherById(teacherId: $teacherId){
            ... on TeacherHttp{
                userHttp{
                id
                lastname
                firstname
                middlename
                nickname
                email
                createdAt
                role
                }
            }
            ... on Error{
                message
            }
        }
    }
    `,

    GET_ALL_TEACHERS: gql`
        query{
            GetAllTeachers{
                userHttp{
                    id
                    lastname
                    firstname
                    middlename
                }
            }
        }
    `,
}

export const teacherQuerysGraphQL = {
    getAllTeachers() {
        return graphQLClient.query(
            {
                query: teacherQuerysGQL.GET_ALL_TEACHERS,
            },
        )
    },

    getTeacherById(teacherId) {
        return graphQLClient.query(
            {
                query: teacherQuerysGQL.GET_TEACHER_BY_ID,
                variables: teacherId,
            },
        )
    },

    getTeachersByRobboGroupId(robboGroupId) {
        return graphQLClient.query(
            {
                query: teacherQuerysGQL.GET_TEACHERS_BY_ROBBO_GROUP_ID,
                variables: robboGroupId,
            },
        )
    },
}