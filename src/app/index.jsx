import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { notification } from 'antd'

import {
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  PROJECT_PAGE_ROUTE,
  MY_PROJECTS_ROUTE,
  MY_COURSES_ROUTE,
  COURSE_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
} from '@/constants'

import Loader from '@/components/Loader'

const HomePage = lazy(() => import('@/pages/Home'))
const LoginPage = lazy(() => import('@/pages/Login'))
const MyProjects = lazy(() => import('@/pages/MyProjects'))
const ProjectPage = lazy(() => import('@/pages/ProjectPage'))
const MyCourses = lazy(() => import('@/pages/MyCourses'))
const CoursePage = lazy(() => import('@/pages/CoursePage'))
const ProfilePage = lazy(() => import('@/pages/Profile'))

export default () => {
  const [, contextHolder] = notification.useNotification()
  return (
    <Suspense fallback={<Loader />}>
      {contextHolder}
      <Switch>
        <Route
          exact
          path={HOME_PAGE_ROUTE}
          component={HomePage}
        />
        <Route
          exact
          path={LOGIN_PAGE_ROUTE}
          component={LoginPage}
        />
        <Route
          exact
          path={MY_PROJECTS_ROUTE}
          component={MyProjects}
        />
        <Route
          exact
          path={PROJECT_PAGE_ROUTE}
          component={ProjectPage}
        />
        <Route
          exact
          path={MY_COURSES_ROUTE}
          component={MyCourses}
        />
        <Route
          exact
          path={COURSE_PAGE_ROUTE}
          component={CoursePage}
        />
        <Route
          exact
          path={PROFILE_PAGE_ROUTE}
          component={ProfilePage}
        />
        <Redirect from='/' to={HOME_PAGE_ROUTE} />
      </Switch>
    </Suspense>
  )
}
