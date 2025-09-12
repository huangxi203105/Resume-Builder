// 路由调试工具
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// Hook：获取当前路由信息
export const useRouteInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const routeInfo = {
    // 当前路径
    pathname: location.pathname,
    // 查询参数
    search: location.search,
    // hash
    hash: location.hash,
    // 路由状态
    state: location.state,
    // 路径参数
    params: params,
    // 完整URL
    fullUrl: window.location.href,
    // 来源页面
    referrer: document.referrer
  };

  // 打印路由信息到控制台
  const logRouteInfo = () => {
    console.group('🚀 当前路由信息');
    console.log('📍 路径:', routeInfo.pathname);
    console.log('🔍 查询参数:', routeInfo.search);
    console.log('🏷️ Hash:', routeInfo.hash);
    console.log('📦 状态:', routeInfo.state);
    console.log('🎯 参数:', routeInfo.params);
    console.log('🌐 完整URL:', routeInfo.fullUrl);
    console.log('👈 来源:', routeInfo.referrer);
    console.groupEnd();
  };

  // 获取浏览器历史记录长度
  const getHistoryLength = () => {
    return window.history.length;
  };

  return {
    ...routeInfo,
    logRouteInfo,
    getHistoryLength,
    navigate
  };
};

// 路由历史记录管理
class RouteHistory {
  private static instance: RouteHistory;
  private history: Array<{
    pathname: string;
    search: string;
    timestamp: number;
    action?: string;
  }> = [];

  static getInstance() {
    if (!RouteHistory.instance) {
      RouteHistory.instance = new RouteHistory();
    }
    return RouteHistory.instance;
  }

  // 添加路由记录
  addRoute(pathname: string, search: string = '', action: string = 'PUSH') {
    this.history.push({
      pathname,
      search,
      timestamp: Date.now(),
      action
    });

    // 限制历史记录数量
    if (this.history.length > 50) {
      this.history.shift();
    }
  }

  // 获取路由历史
  getHistory() {
    return [...this.history];
  }

  // 打印路由历史
  logHistory() {
    console.group('📚 路由历史记录');
    this.history.forEach((route, index) => {
      const time = new Date(route.timestamp).toLocaleTimeString();
      console.log(`${index + 1}. [${time}] ${route.action} → ${route.pathname}${route.search}`);
    });
    console.groupEnd();
  }

  // 清空历史记录
  clearHistory() {
    this.history = [];
  }
}

export const routeHistory = RouteHistory.getInstance();

// 路由监听器Hook
export const useRouteListener = () => {
  const location = useLocation();

  React.useEffect(() => {
    // 记录路由变化
    routeHistory.addRoute(location.pathname, location.search);

    // 可选：自动打印路由信息
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 路由变化: ${location.pathname}${location.search}`);
    }
  }, [location]);
};
