import { useEffect, useState } from "react";
import { Page } from "./components/page";
import Auth from "./pages/auth";
import TaskManager from "./pages/task_manager";
import { supabase } from "./supabase-client";

function App() {
  const [session, setSession] = useState(null)
  const fetchSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (!error) setSession(data.session)
  }

  useEffect(() => {
    fetchSession()
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <Page>
      {!session && <Auth />}
      {session && <TaskManager user={session?.user} />}
    </Page>
  );
}

export default App;