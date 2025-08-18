import React, { useState, forwardRef, useImperativeHandle, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom';
import "../assets/css/Modal.css"
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { X } from 'lucide-react';
interface ModalProps {
  isOpen: Boolean,
  onClose: () => void
  children?: React.ReactNode
  disableScroll?: Boolean,
  initialView?: "login" | "register"
  showCloseButton?: Boolean
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

const Modal = forwardRef(({ 
  isOpen, 
  onClose, 
  children, 
  disableScroll = true, 
  initialView = "login",
  showCloseButton = true,
  className = "",
  size = "md"
}: ModalProps, ref) => {
  const [view, setView] = useState(initialView)
  
  const switchView = (view: any) => {
    setView(view)
  }
  
  const handleKeyDown = useCallback((e: any) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose])

  // 禁用页面滚动
  useEffect(() => {
    if (isOpen && disableScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, disableScroll]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // 点击遮罩层关闭
  const handleOverlayClick = (e: any) => {
    console.log(e.target, e.currentTarget)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useImperativeHandle(ref, () => ({
    switchView: (view: any) => setView(view)
  }))

  // 尺寸映射
  const sizeClasses = {
    sm: 'w-[300px]',
    md: 'w-[500px]',
    lg: 'w-[600px]',
    xl: 'w-[800px]'
  }

  if (!isOpen) return null;

  // 渲染内容：优先使用 children，否则使用默认的登录/注册表单
  const renderContent = () => {
    if (children) {
      return children;
    }
    
    // 向后兼容：保持原有的登录/注册逻辑
    return view === 'login' ? (
      <LoginForm onSwitchView={() => switchView('register')} />
    ) : (
      <RegisterForm ref={ref} onSwitchView={() => switchView('login')} />
    );
  };

  return ReactDOM.createPortal(
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={handleOverlayClick}
      data-testid="modal-overlay">
      <div className={`${sizeClasses[size]} max-w-[90vw] mx-auto p-5 bg-[#fcfcfe] relative rounded-lg shadow-lg flex flex-col gap-3 ${className}`}>
        {showCloseButton && (
          <div className='absolute top-[20px] right-[20px] z-10'>
            <button 
              onClick={onClose} 
              className='flex items-center justify-center bg-red-300 text-red-500 w-[30px] h-[30px] rounded-[5px] shadow-lg hover:bg-red-400 transition-colors'
            >
              <X size={20} />
            </button>
          </div>
        )}
        {renderContent()}
      </div>
    </div>,
    document.body
  )
})

export default Modal
