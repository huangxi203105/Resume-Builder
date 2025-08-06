// 导航工具函数
// 用于在非组件环境中进行路由跳转

let navigateFunction: ((path: string) => void) | null = null;

// 设置导航函数（在应用启动时调用）
export const setNavigateFunction = (navigate: (path: string) => void) => {
  navigateFunction = navigate;
};

// 执行导航跳转
export const navigateTo = (path: string) => {
  if (navigateFunction) {
    navigateFunction(path);
  } else {
    // 如果 React Router 导航不可用，回退到原生方法
    console.warn('React Router navigate function not available, falling back to window.location');
    window.location.href = path;
  }
};

// 清除导航函数
export const clearNavigateFunction = () => {
  navigateFunction = null;
};
