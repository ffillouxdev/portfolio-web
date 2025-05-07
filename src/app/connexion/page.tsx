'use client';
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Échec de la connexion : ' + error.message)
    } else {
        console.log("connexion reussie !")
        router.push('/admin')  
    }
  }

  return (
    <main className="flex min-h-[85vh] h-auto flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
      <div className="w-full md:w-3xl my-44">
        <div className="flex flex-col h-full items-center justify-center space-y-5">      
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-6 text-center">Connexion administration</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mb-4 border rounded"
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <Button type="submit" className='w-full'>
              Se connecter
            </Button>
          </form> 
        </div>
      </div>
    </main>
  )
}
