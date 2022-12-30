import { gql } from "@apollo/client"

import { graphQLClient, parentQuerysGQL } from "@/graphQL"
import { FREE_LISTENER, PARENT, STUDENT, SUPER_ADMIN, TEACHER, UNIT_ADMIN } from "@/constants"

export const userMutationsGQL = {
    CREATE_PARENT: gql`
        mutation CreateParent($input: NewParent!) {
            CreateParent(input: $input) {
            __typename
            ... on ParentHttp{
                userHttp{
                    firstname
                    lastname
                    middlename
                    id
                }
            }
            ... on Error{
                message
            }
        }
    }
    `,

    DELETE_PARENT: gql`
        mutation DeleteParent($parentId: String!){
            DeleteParent(parentId: $parentId) {
                ... on DeletedParent{
                parentId
                }
            } 
        }
    `,

    CREATE_STUDENT: gql`
    mutation CreateStudent($input: NewStudent!) {
        CreateStudent(input: $input) {
        __typename
        ... on StudentHttp{
            userHttp{
                firstname
                lastname
                middlename
                id
            }
        }
        ... on Error{
            message
        }
    }
    }
    `,

    UPDATE_STUDENT: gql`
        mutation UpdateStudent($input: UpdateProfileInput!) {
            UpdateStudent(input: $input) {
                ... on StudentHttp {
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

                ... on Error {
                    message
                }
            }
        }
    `,

    UPDATE_SUPER_ADMIN: gql`
    mutation UpdateSuperAdmin($input: UpdateProfileInput!) {
        UpdateSuperAdmin(input: $input) {
            ... on SuperAdminHttp {
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

            ... on Error {
                message
            }
        }
    }
    `,

    UPDATE_TEACHER: gql`
    mutation UpdateTeacher($input: UpdateProfileInput!) {
        UpdateTeacher(input: $input) {
            ... on TeacherHttp {
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

            ... on Error {
                message
            }
        }
    }
    `,

    UPDATE_UNIT_ADMIN: gql`
    mutation UpdateUnitAdmin($input: UpdateProfileInput!) {
        UpdateUnitAdmin(input: $input) {
            ... on UnitAdminHttp {
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

            ... on Error {
                message
            }
        }
    }
    `,

    UPDATE_FREE_LISTENER: gql`
    mutation UpdateStudent($input: UpdateProfileInput!) {
        UpdateStudent(input: $input) {
            ... on StudentHttp {
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

            ... on Error {
                message
            }
        }
    }
    `,

    UPDATE_PARENT: gql`
    mutation UpdateParent($input: UpdateProfileInput!) {
        UpdateParent(input: $input) {
            ... on ParentHttp {
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

            ... on Error {
                message
            }
        }
    }
    `,

    CREATE_STUDENT_PARENT_RELATION: gql`
    mutation AddChildToParent($parentId: String!, $childId: String!) {
        AddChildToParent(parentId: $parentId, childId: $childId) {
            ... on StudentHttpList{
                    students {
                        userHttp{
                            id
                            lastname
                            firstname
                            middlename
                        }
                    }
                }
                ... on Error{
                    message
                }
        }
    }
    `,

    DELETE_STUDENT: gql`
    mutation DeleteStudent($studentId: String!) {
        DeleteStudent(studentId: $studentId) {
            ... on DeletedStudent{
                    studentId
                }
        }
    }
    `,
}

export const usersMutationGraphQL = {
    createStudent(input) {
        return graphQLClient.mutate(
            {
                mutation: userMutationsGQL.CREATE_STUDENT,
                variables: input,
            },
        )
    },

    createParent(input) {
        return graphQLClient.mutate(
            {
                mutation: userMutationsGQL.CREATE_PARENT,
                variables: input,
                update(cache, { data: { CreateParent } }) {
                    cache.modify({
                        fields: {
                            GetAllParents(existingParents = []) {
                                return {
                                    ...existingParents,
                                    parents: [...existingParents.parents, CreateParent],
                                }
                            },
                        },
                    })
                },
            },
        )
    },

    deleteParent(parentId) {
        return graphQLClient.mutate(
            {
                mutation: userMutationsGQL.DELETE_PARENT,
                variables: parentId,
                update(cache, { data: { DeleteParent } }) {
                    cache.modify({
                        fields: {
                            GetAllParents(existingParents = []) {
                                const newParents = [...existingParents.parents]
                                    .filter(parent => parent.userHttp.id !== DeleteParent.parentId)
                                return { ...existingParents, parents: newParents }
                            },
                        },
                    })
                },
            },
        )
    },

    updateProfile(input, role) {
        let update = {}
        const refetchQueries = null
        let gqlString = null
        switch (role) {
            case STUDENT:
                gqlString = userMutationsGQL.UPDATE_STUDENT
                break
            case TEACHER:
                gqlString = userMutationsGQL.UPDATE_TEACHER
                break
            case PARENT:
                gqlString = userMutationsGQL.UPDATE_PARENT
                update = {
                    update(cache, { data: { UpdateParent } }) {
                        cache.modify({
                            fields: {
                                GetAllParents(existingParents = []) {
                                    console.log(existingParents)
                                    const newParents = [...existingParents.parents]
                                        .filter(parent => parent.userHttp.id !== UpdateParent.userHttp.id)
                                    newParents.push(UpdateParent)
                                    console.log(newParents)
                                    return { ...existingParents, parents: newParents }
                                },
                            },
                        })
                    },
                }
                // refetchQueries = [
                //     {
                //         query: parentQuerysGQL.GET_ALL_PARENTS,
                //         variables: {
                //             page: "1",
                //             pageSize: "10",
                //         }
                //     },
                // ]
                break
            case FREE_LISTENER:
                gqlString = userMutationsGQL.UPDATE_FREE_LISTENER
                break
            case UNIT_ADMIN:
                gqlString = userMutationsGQL.UPDATE_UNIT_ADMIN
                break
            case SUPER_ADMIN:
                gqlString = userMutationsGQL.UPDATE_SUPER_ADMIN
                break
            default:
                break
        }
        return graphQLClient.mutate(
            {
                mutation: gqlString,
                variables: input,
                ...update,
                refetchQueries: refetchQueries,
            },
        )
    },

    createStudentParentRelation(input) {
        return graphQLClient.mutate(
            {
                mutation: userMutationsGQL.CREATE_STUDENT_PARENT_RELATION,
                variables: input,
            },
        )
    },

    deleteStudent(studentId) {
        return graphQLClient.mutate(
            {
                mutation: userMutationsGQL.DELETE_STUDENT,
                variables: studentId,
            },
        )
    },
}
