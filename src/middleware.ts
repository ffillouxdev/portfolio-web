import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = req.nextUrl.pathname
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/connexion' || pathname === '/login'

  // 🔒 Blocage des POST anonymes sur /admin/*
  if (!user && req.method === 'POST' && isAdminRoute) {
    console.log('Tentative de POST non autorisée vers admin')
    return new NextResponse('Non autorisé', { status: 401 })
  }

  // 🛡️ Redirection des visiteurs anonymes sur /admin/*
  if (!user && isAdminRoute) {
    console.log('Pas de user trouvé → redirection')
    return NextResponse.redirect(new URL('/', req.url))
  }

  // 🔁 Redirection des utilisateurs connectés essayant d'accéder à /connexion
  if (user && isLoginPage) {
    console.log('Utilisateur déjà connecté → redirection vers /admin')
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  console.log('Utilisateur connecté ou accès autorisé')
  return res
}

export const config = {
  matcher: ['/admin/:path*', '/connexion', '/login'],  
}
