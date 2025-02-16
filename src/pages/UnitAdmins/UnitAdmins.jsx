import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import { WelcomeText } from "./components"

import { PageLayout, Card } from "@/layouts"
import SideBar from "@/components/SideBar"
import { ModalWindow, Button } from '@/components/UI'
import ListItem from '@/components/ListItem'
import Flex from '@/components/Flex'
import AddUnitAdmin from "@/components/AddUnitAdmin"

import { getUnitAdminsState } from "@/reducers/unitAdmins"
import Loader from "@/components/Loader"
import { useIsAuth } from "@/helpers"
import { useActions } from "@/helpers/useActions"
import UnitAdminContent from "@/components/UnitAdminContent"
import { getLoginState } from "@/reducers/login"

export default () => {

    useIsAuth()

    const token = localStorage.getItem('token')
    const [openAddUnitAdmin, setOpenAddUnitAdmin] = useState(false)
    const { loading, unitAdmins } = useSelector(({ unitAdmins }) => getUnitAdminsState(unitAdmins))
    const { userRole } = useSelector(({ login }) => getLoginState(login))

    if (userRole !== 5) {
        return <Redirect to='/home' />
    }
    const { deleteUnitAdmin, getUnitAdmins } = useActions()

    useEffect(() => {
        getUnitAdmins(token)
        return () => {
            // clearTeachersState
        }
    }, [])

    return (
        <PageLayout>
            <Card>
                <SideBar />
                <WelcomeText>Unit Админы</WelcomeText>
                <ModalWindow
                    open={openAddUnitAdmin} setOpen={setOpenAddUnitAdmin}
                    width='35%' height='60%'
                    content={() => (
                        <AddUnitAdmin />
                    )}
                />
                <Flex direction='row' justify='flex-end'
                    align='flex-start'>
                    <Button
                        background='green'
                        content='Добавить Unit Админа'
                        padding='0.5rem'
                        handleSubmit={() => { setOpenAddUnitAdmin(true) }}
                    />
                </Flex>
                {
                    loading ? <Loader />
                        : (
                            <Flex
                                widht='100%' direction='column'
                                justify=' center'
                            >
                                <Flex direction='column'>
                                    {
                                        unitAdmins?.map((unitAdmin, index) => {
                                            return (
                                                <ListItem
                                                    itemIndex={index}
                                                    key={index}
                                                    label={`${unitAdmin.userHttp.lastname} ${unitAdmin.userHttp.firstname} ${unitAdmin.userHttp.middlename}`}
                                                    handleDelete={unitAdminIndex => deleteUnitAdmin(token, unitAdmin.userHttp.id, unitAdminIndex)}
                                                    render={(open, setOpen) => (
                                                        <ModalWindow
                                                            open={open} setOpen={setOpen}
                                                            width='65%' height='80%'
                                                            content={() => (
                                                                <UnitAdminContent unitAdmin={unitAdmin.userHttp} />
                                                            )}
                                                        />
                                                    )}
                                                />
                                            )
                                        })
                                    }
                                </Flex>
                            </Flex>
                        )
                }
            </Card>
        </PageLayout>
    )
}