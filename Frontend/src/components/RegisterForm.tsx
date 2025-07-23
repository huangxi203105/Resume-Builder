import { useState } from "react"
import Input from "./Input"
import http from "../utils/http"
import API_PATH from "../utils/apiPath"
interface RegisterFormProps {
  onSwitchView: () => void
}
export const RegisterForm = (props: RegisterFormProps) => {
  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const register = async () => {
    try {
      const res = await http.post(API_PATH.REGISTER, { fullName, email, password })
      console.log(res)
      localStorage.setItem('token', res.data.token)
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <div className='text-2xl font-bold flex justify-center'>Sign UP</div>
      <div className="flex w-full justify-center text-normal text-[#878ca4]">
          By signing up, you agree to our
      </div>
      <div className='mt-[20px]'>
        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} type='text' label='Full Name' />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type='email' label='Email Address' />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} type='password' label='Password' />
      </div>
      <div className="flex justify-center gap-2 mt-[10px]">
        <span className="text-[#878ca4] ">
          Already have an account?
        </span>
        <span onClick={props.onSwitchView} className="text-[#9358ff] hover:cursor-pointer">
          Sign In
        </span>
      </div>
      <div className='w-full flex justify-center mt-[20px]'>
        <button onClick={register} className='w-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 px-4 rounded-[15px] shadow-md overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-violet-200'>
          <span className='text-white font-semibold'>Sign UP</span>
        </button>
      </div>
    </div>
  )
}