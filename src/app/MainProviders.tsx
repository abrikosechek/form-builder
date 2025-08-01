import { RouterProvider } from 'react-router'
import { router } from '@/app/router'

export const MainProviders = () => {
  return <RouterProvider router={router} />
}
