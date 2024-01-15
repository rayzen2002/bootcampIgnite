import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
export function AppLayout() {
  return (
    <div>
      <Helmet title="Dashboard" />
      <Toaster />
      <h1>App</h1>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
