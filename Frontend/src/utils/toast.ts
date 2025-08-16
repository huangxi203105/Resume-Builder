import { toast, type ToastOptions } from 'react-toastify';

// 默认配置
const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

// Toast 工具类
export const Toast = {
  // 成功提示
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, { ...defaultOptions, ...options });
  },

  // 错误提示
  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, { ...defaultOptions, ...options });
  },

  // 警告提示
  warning: (message: string, options?: ToastOptions) => {
    return toast.warning(message, { ...defaultOptions, ...options });
  },

  // 信息提示
  info: (message: string, options?: ToastOptions) => {
    return toast.info(message, { ...defaultOptions, ...options });
  },

  // 自定义提示
  custom: (message: string, options?: ToastOptions) => {
    return toast(message, { ...defaultOptions, ...options });
  },

  // 加载提示
  loading: (message: string = "加载中...", options?: ToastOptions) => {
    return toast.loading(message, { ...defaultOptions, ...options });
  },

  // 更新Toast
  update: (toastId: any, options: ToastOptions & { render?: string }) => {
    return toast.update(toastId, options);
  },

  // 关闭指定Toast
  dismiss: (toastId?: any) => {
    return toast.dismiss(toastId);
  },

  // 关闭所有Toast
  dismissAll: () => {
    return toast.dismiss();
  }
};

export default Toast;