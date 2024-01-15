import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import console from 'console'

const signInForm = z.object({
  email: z.string().email(),
})
type SignInForm = z.infer<typeof signInForm>
export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()
  async function handleSignIn(data: SignInForm) {
    console.log(data)
    toast.success('Enviamos um link de autenticacao para seu e-mail')
  }
  return (
    <>
      <Helmet title="Login" />
      <div>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col gap-4 "
          >
            <div>
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <Button disabled={isSubmitting} type="submit">
              ACESSAR PAINEL
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
