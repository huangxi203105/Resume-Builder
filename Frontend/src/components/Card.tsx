import React from "react"
interface CardProps {
  title?: string;
  description?: string;
  iconColor?: string;
  bgColor?: string;
}

const Card: React.FC<CardProps> = ({ title, description, iconColor, bgColor }) => {
  // 映射颜色到类名
  const shadowClass = {
    '#9358ff': 'hover-shadow-purple',
    '#f046e4': 'hover-shadow-pink',
    '#f76001': 'hover-shadow-orange'
  }[iconColor ?? ''] || '';

  return (
    <div className="">
      <div className={`flex flex-col gap-4 ${bgColor} h-[200px] w-[300px] rounded-[20px] p-4 hover:scale-105 transition-all duration-300 ease-in-out ${shadowClass}`}>
        <div
          className="w-[70px] h-[70px] rounded-[15px]"
          style={{ backgroundColor: iconColor }}
        ></div>
        <div className="text-2xl font-bold text-black">{title}</div>
        <div className="text-sm text-[#76787f]">{description}</div>
      </div>
    </div>
  )
}
export default Card