import React from "react"
import "./Radio.css"
interface RadioOption {
  value: any
  label: string
  background?: string
  boxShadow?: string
}

interface RadioProps {
  options: Array<RadioOption>
  value: any
  onChange: (value: any) => void
  name?: string // 可选的name属性，用于隔离不同的Radio组件实例
}
export const Radio: React.FC<RadioProps> = ({ options, value, onChange, name }) => {
  // 生成唯一的name，如果没有提供则使用随机ID
  const radioName = name || `radio-${Math.random().toString(36).substring(2, 11)}`;

  // 计算当前选中项的索引
  const selectedIndex = options.findIndex(option => option.value === value);

  // 计算glider的transform值
  const gliderTransform = selectedIndex >= 0 ? `translateX(${selectedIndex * 100}%)` : 'translateX(0%)';

  // 获取当前选中项的样式
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;
  const gliderStyle: React.CSSProperties = {
    transform: gliderTransform,
    background: selectedOption?.background,
    boxShadow: selectedOption?.boxShadow
  };

  return (
    <div
      className="glass-radio-group"
      style={{ '--option-count': options.length } as React.CSSProperties}
    >
      {options.map((option) => {
        const inputId = `${radioName}-${option.value}`;
        return (
          <div key={option.value}>
            <input
              type="radio"
              name={radioName}
              id={inputId}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <label htmlFor={inputId}>{option.label}</label>
          </div>
        );
      })}
      <div
        className="glass-glider"
        style={gliderStyle}
      ></div>
    </div>
  )
}