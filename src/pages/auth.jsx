import { useState } from 'react'
import { Header } from '../components/text'
import { SignInOrUpForm } from '../features/form'
import { supabase } from '../supabase-client'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  function onClickHandle() {setIsSignUp(!isSignUp)}

  return (
    <div className='flex flex-col gap-3'>
      <Header heading={isSignUp ? "Sign Up" : "Sign In"} nodivider />
      <SignInOrUpForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      <button className='text-right text-xs cursor-pointer text-sky-400' onClick={onClickHandle} >{ isSignUp ? "Already have an account!!! Sign In" : "Don't have an account!!! Create one"}</button>
    </div>
  )
}

export function Logout({ user }) {
  async function SignOut() {
    await supabase.auth.signOut()
  }
  return (
    <div className='w-full flex flex-col justify-end items-end'>
      <span>{user?.email}</span>
      <button className='px-2 rounded-xs text-sm hover:cursor-pointer bg-red-500' onClick={SignOut}>Logout</button>
    </div>
  )
}