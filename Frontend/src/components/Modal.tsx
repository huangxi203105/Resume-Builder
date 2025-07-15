import React, { useState, forwardRef, useImperativeHandle, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Input from './Input'
import "../assets/Modal.css"
interface ModalProps {
  isOpen: Boolean,
  onClose: () => void
  children?: React.ReactNode
  disableScroll?: Boolean,
}
const Modal = forwardRef(({ isOpen, onClose, disableScroll = true }: ModalProps, ref) => {
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
    console.log(e.target, e.currentTarget)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={handleOverlayClick}
      data-testid="modal-overlay">
      <div className='w-[400px] p-5 bg-[#fcfcfe] relative rounded-lg shadow-lg flex flex-col gap-3'>
        <div className='absolute top-[20px] right-[20px]'>
          <button onClick={onClose} className='bg-red-300 text-red-500 w-[30px] h-[30px] rounded-[5px] shadow-lg shadow'>X</button>
        </div>
        <div className='text-2xl font-bold flex justify-center'>Welcome Back</div>
        <div className="flex w-full justify-center text-normal text-[#878ca4]">
          sign in to continue building amazing resumes
        </div>
        <div className='mt-[20px]'>
          <Input type='email' label='Email Address' />
          <Input type='password' label='Password' />
        </div>
        <div className='w-full flex justify-center'>
          <button className='w-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 px-4 rounded-[15px] shadow-md overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-violet-200'>
            <span className='text-white font-semibold'>Sign In</span>
          </button>
        </div>
      </div>
    </div>
    ,
    document.body
  )
})
export default Modal