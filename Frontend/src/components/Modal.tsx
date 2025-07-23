import React, { useState, forwardRef, useImperativeHandle, useCallback, useEffect, use } from 'react'
import ReactDOM from 'react-dom';
import Input from './Input'
import "../assets/Modal.css"
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
interface ModalProps {
  isOpen: Boolean,
  onClose: () => void
  children?: React.ReactNode
  disableScroll?: Boolean,
  initialView?: "login" | "register"
}
const Modal = forwardRef(({ isOpen, onClose, disableScroll = true,initialView="login" }: ModalProps, ref) => {
  const [view, setView] = useState(initialView)
  const switchView = (view:any) =>{
    setView(view)
  }
  const handleKeyDown = useCallback((e: any) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose])
  //禁用页面滚动
  useEffect(() => {
    if (isOpen) {
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
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  useImperativeHandle(ref, () => ({
    switchView: (view: any) =>setView(view)
  }))

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={handleOverlayClick}
      data-testid="modal-overlay">
      <div className='w-[400px] p-5 bg-[#fcfcfe] relative rounded-lg shadow-lg flex flex-col gap-3'>
        <div className='absolute top-[20px] right-[20px]'>
          <button onClick={onClose} className='bg-red-300 text-red-500 w-[30px] h-[30px] rounded-[5px] shadow-lg shadow'>X</button>
        </div>
        {view === 'login' ? (
          <LoginForm onSwitchView={() => switchView('register')} />
        ) : (
          <RegisterForm onSwitchView={() => switchView('login')} />
        )}
      </div>
    </div>
    ,
    document.body
  )
})
export default Modal