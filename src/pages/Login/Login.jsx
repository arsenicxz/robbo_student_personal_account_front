import React from 'react'
import { redirect } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'

import { useUserIdentity } from '@/helpers'
import { HOME_PAGE_ROUTE } from '@/constants'
import PageLayoutLogin from '@/components/PageLayoutLogin'

export default () => {
    const { isAuth, loginLoading } = useUserIdentity()

    if (isAuth) {
        return redirect(HOME_PAGE_ROUTE)
    }
    return (
        <React.Fragment>
            {
                loginLoading
                    ? <LoadingOutlined />
                    : <PageLayoutLogin />
            }
        </React.Fragment>

    )
}