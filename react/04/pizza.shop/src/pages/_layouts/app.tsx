import { Header } from '@/components/header'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
export function AppLayout() {
  return (
    <div className='flex min-h-screen flex-col antialiased '>
      <Helmet title="Dashboard" />
      <Header />
      <div className='flex flex-1 flex-col gap-4 p-8 pt-6'>
        <Outlet />
      </div>
    </div>
  )
}
