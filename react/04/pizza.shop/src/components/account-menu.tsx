import { DialogTrigger } from '@radix-ui/react-dialog'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { GetManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'
import { SignOut } from '@/api/sign-out'

import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const navigate = useNavigate()
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })
  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: GetManagedRestaurant,
      staleTime: Infinity,
    })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: SignOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="flex items-center gap-2 select-none"
          >
            <ChevronDown className="w-4 h-4" />
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedRestaurant?.name
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div>
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-24 h-3" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs text-muted-foreground font-normal">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="w-4 h-4 mr-2" />
              <span>Perfil da Loja</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            asChild
            disabled={isSigningOut}
            className="text-rose-500 dark:text-rose-400"
          >
            <button className="w-full" onClick={() => signOutFn()}>
              <LogOut className="w-4 h-4 mr-2" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <StoreProfileDialog />
    </Dialog>
  )
}
