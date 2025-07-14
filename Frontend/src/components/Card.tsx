import { use, useCallback, useMemo } from "react"
import React from "react"
interface CardProps {
  title?: string;
  description?: string;
  iconColor?: string;
  bgColor?: string;
  color?: string;
}

const Card: React.FC<CardProps> = ({ title, description, iconColor, bgColor, color }) => {
  return (
    <div className="card">
      <div className={`flex flex-col gap-4 ${bgColor} h-[200px] w-[300px] rounded-[20px] p-4`}>
        <div className={`w-[70px] h-[70px] ${iconColor} rounded-[15px]`}></div>
        <div className={`text-2xl font-bold text-black`}>{title}</div>
        <div className="text-sm text-[#76787f]">{description}</div>
      </div>
    </div>
  )
}
export default Card