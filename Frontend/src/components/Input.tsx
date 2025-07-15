import React,{ useState } from "react"
interface InputProps {
  type: string
  placeholder?: string
  label: string
} 
const Input: React.FC<InputProps> = ({ type, placeholder, label }) => {
  const [isFocused, setIsFocused] = useState(false)
  const onFocus = () => {
    setIsFocused(true)
    console.log("focus")
  }
  return (
    <div className="flex flex-col gap-3">
      <div className={`transition-colors duration-200 ${isFocused ? 'text-purple-500 font-medium' : 'text-gray-600'
        }`}>
        <label htmlFor="input">{label}</label>
      </div>
      <div>
        <input placeholder={placeholder} onFocus={onFocus} onBlur={() => setIsFocused(false)} className="w-full p-2 border border-gray-300 rounded-md 
            transition-all duration-300 ease-in-out
            focus:border-purple-600
            focus:border-2
            focus:outline-none
            focus:ring-4 focus:ring-purple-500/20
            focus:shadow-lg focus:shadow-violet-500/10"  type={type} />
      </div>
    </div>
  )
}
export default Input