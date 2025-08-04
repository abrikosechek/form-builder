import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/app/layouts/RootLayout'
import { HomePage } from '@/pages/Home'
import { FormPage } from '@/pages/Form'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: '/form/:formName',
        Component: FormPage,
      },
    ],
  },
])
