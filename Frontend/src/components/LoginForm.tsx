import { useContext, useState } from "react"
import Input from "./Input"
import http from "../utils/http"
import API_PATH from "../utils/apiPath"
import { UserContext } from "../context/UserContext"
interface LoginFormProps {
  onSwitchView: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const userContext = useContext(UserContext)
  const login = async () => {
    try {
      const res = await http.post(API_PATH.LOGIN, { email, password })
      console.log(res)
      localStorage.setItem('token', res.data.token)
      // 更新用户状态
      if (userContext && userContext.setUser) {
        userContext.setUser(res.data)
      }
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  return (
    <div>
      <div className='text-2xl font-bold flex justify-center'>Welcome Back</div>
      <div className="flex w-full justify-center text-normal text-[#878ca4]">
        sign in to continue building amazing resumes
      </div>
      <div className='mt-[20px]'>
        <Input value={email} onChange={onEmailChange} type='email' label='Email Address' />
        <Input value={password} onChange={onPasswordChange} type='password' label='Password' />
      </div>
      <div className="flex justify-center gap-2 mt-[10px]">
        <span className="text-[#878ca4] ">
          Do Not Have An Account?
        </span>
        <span onClick={props.onSwitchView} className="text-[#9358ff] hover:cursor-pointer">
          Sign Up
        </span>
      </div>
      <div className='w-full flex justify-center mt-[20px]'>
        <button onClick={login} className='w-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 px-4 rounded-[15px] shadow-md overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-violet-200'>
          <span className='text-white font-semibold'>Sign In</span>
        </button>
      </div>
    </div>
  )
}