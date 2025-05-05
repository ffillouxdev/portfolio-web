// types/next.d.ts
import { User } from '@supabase/supabase-js';

declare global {
  namespace NodeJS {
    interface Global {
      user: User | null;
    }
  }

  interface Request {
    user?: User;
  }
}
