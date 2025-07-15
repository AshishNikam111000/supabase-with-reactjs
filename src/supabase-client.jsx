import { createClient } from "@supabase/supabase-js";
import { createClient as createClientV1 } from "supabase-js-v1"

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const supabaseV1 = createClientV1(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);