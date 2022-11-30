import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import {
  HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE,
  PROJECT_PAGE_ROUTE, MY_PROJECTS_ROUTE,
  MY_COURSES_ROUTE, COURSE_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE, PEEK_PROFILE_PAGE,
  TEACHERS_PAGE_ROUTE, CLIENTS_ROUTE,
  UNIT_ADMINS_ROUTE, ROBBO_UNITS_ROUTE,
  ROBBO_UNIT_STUDENT_GROUPS_PAGE, STUDY_PAGE_ROUTE,
  ROBBO_GROUPS_ROUTE,
} from '@/constants'

import Loader from '@/components/Loader'

const HomePage = lazy(() => import('@/pages/Home'))
const LoginPage = lazy(() => import('@/pages/Login'))
const MyProjects = lazy(() => import('@/pages/MyProjects'))
const ProjectPage = lazy(() => import('@/pages/ProjectPage'))
const MyCourses = lazy(() => import('@/pages/MyCourses'))
const CoursePage = lazy(() => import('@/pages/CoursePage'))
const ProfilePage = lazy(() => import('@/pages/Profile'))
const PeekProfilePage = lazy(() => import('@/pages/PeekProfile'))
const TeachersPage = lazy(() => import('@/pages/Teachers'))
const ClientsPage = lazy(() => import('@/pages/Clients'))
const UnitAdminsPage = lazy(() => import('@/pages/UnitAdmins'))
const RobboUnitsPage = lazy(() => import('@/pages/RobboUnits'))
const RobboGroups = lazy(() => import('@/pages/RobboGroups'))
const Study = lazy(() => import('@/pages/Study'))

export default () => (
  <Suspense fallback={<Loader />}>
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
        path={CLIENTS_ROUTE}
        component={ClientsPage}
      />

      <Route
        exact
        path={TEACHERS_PAGE_ROUTE}
        component={TeachersPage}
      />
      <Route
        exact
        path={PROFILE_PAGE_ROUTE}
        component={ProfilePage}
      />
      <Route
        exact
        path={PEEK_PROFILE_PAGE}
        component={PeekProfilePage}
      />
      <Route
        exact
        path={UNIT_ADMINS_ROUTE}
        component={UnitAdminsPage}
      />
      <Route
        exact
        path={ROBBO_UNITS_ROUTE}
        component={RobboUnitsPage}
      />
      <Route
        exact
        path={ROBBO_UNIT_STUDENT_GROUPS_PAGE}
        component={RobboGroups}
      />
      <Route
        exact
        path={STUDY_PAGE_ROUTE}
        component={Study}
      />
      <Route
        exact
        path={ROBBO_GROUPS_ROUTE}
        component={RobboGroups}
      />
      <Redirect from='/' to={HOME_PAGE_ROUTE} />
    </Switch>
  </Suspense>
)