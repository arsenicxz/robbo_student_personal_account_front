import React, { memo } from 'react'
import styled from 'styled-components'

import Flex from '@/components/Flex'
import SignUpForm from '@/components/SignUpForm'
import { useActions } from '@/helpers/useActions'

export default memo(({ parentId }) => {
    const { createChildren } = useActions()
    const token = localStorage.getItem('token')
    return (
        <Flex
            direction='column' width='100%'
            align='center'
        >
            <Text>Создание ребенка</Text>
            <SignUpForm
                margin='0 0 10px 0'
                handleSubmit={child => createChildren(token, child, parentId.toString())}
                buttonOption={{
                    content: 'Создать',
                    padding: '10px',
                }}
            />
        </Flex>
    )
})

const Text = styled.p`
  font-size: 1.5rem;
  margin-bottom: 10px;
`