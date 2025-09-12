import React, { useState, useEffect } from 'react';
import { useRouteInfo, routeHistory, useRouteListener } from '../utils/routeDebug';

interface RouteDebuggerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showInProduction?: boolean;
}

const RouteDebugger: React.FC<RouteDebuggerProps> = ({ 
  position = 'bottom-right',
  showInProduction = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const routeInfo = useRouteInfo();
  
  // 监听路由变化
  useRouteListener();

  // 在生产环境中隐藏（除非明确指定显示）
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && !showInProduction) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [showInProduction]);

  // 键盘快捷键：Ctrl+Shift+R 切换显示
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        setIsExpanded(!isExpanded);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  if (!isVisible) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  const history = routeHistory.getHistory();

  return (
    <div className={`fixed ${positionClasses[position]} z-50 font-mono text-xs`}>
      {/* 切换按钮 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors mb-2"
        title="路由调试器 (Ctrl+Shift+R)"
      >
        🚀 Route Debug
      </button>

      {/* 调试面板 */}
      {isExpanded && (
        <div className="bg-black/90 text-green-400 p-4 rounded-lg shadow-xl max-w-md max-h-96 overflow-auto">
          {/* 当前路由信息 */}
          <div className="mb-4">
            <h3 className="text-yellow-400 font-bold mb-2">📍 当前路由</h3>
            <div className="space-y-1">
              <div><span className="text-gray-400">路径:</span> {routeInfo.pathname}</div>
              <div><span className="text-gray-400">查询:</span> {routeInfo.search || '无'}</div>
              <div><span className="text-gray-400">Hash:</span> {routeInfo.hash || '无'}</div>
              <div><span className="text-gray-400">参数:</span> {JSON.stringify(routeInfo.params)}</div>
              <div><span className="text-gray-400">历史长度:</span> {routeInfo.getHistoryLength()}</div>
            </div>
          </div>

          {/* 路由历史 */}
          <div className="mb-4">
            <h3 className="text-yellow-400 font-bold mb-2">📚 路由历史 (最近10条)</h3>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {history.slice(-10).reverse().map((route, index) => (
                <div key={index} className="text-xs">
                  <span className="text-gray-500">
                    {new Date(route.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="text-blue-400 ml-2">{route.action}</span>
                  <span className="ml-2">{route.pathname}{route.search}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => routeInfo.logRouteInfo()}
              className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
            >
              打印当前路由
            </button>
            <button
              onClick={() => routeHistory.logHistory()}
              className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
            >
              打印历史
            </button>
            <button
              onClick={() => routeHistory.clearHistory()}
              className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
            >
              清空历史
            </button>
            <button
              onClick={() => routeInfo.navigate(-1)}
              className="bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-700"
            >
              后退
            </button>
          </div>

          {/* 快捷键提示 */}
          <div className="mt-3 text-gray-500 text-xs">
            快捷键: Ctrl+Shift+R 切换显示
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteDebugger;
