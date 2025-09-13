// 登录状态管理工具
import { navigateTo } from './navigation';
import Toast from './toast';

interface LoginSession {
  token: string;
  expiresAt: string;
  user: any;
  rememberMe: boolean;
}

class AuthManager {
  private static instance: AuthManager;
  private checkInterval : number | null = null;
  private warningShown = false;

  static getInstance() {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  // 保存登录会话
  saveSession(sessionData: {
    token: string;
    expiresAt: string;
    user: any;
    rememberMe: boolean;
  }) {
    const session: LoginSession = {
      token: sessionData.token,
      expiresAt: sessionData.expiresAt,
      user: sessionData.user,
      rememberMe: sessionData.rememberMe
    };

    localStorage.setItem('token', sessionData.token);
    localStorage.setItem('authSession', JSON.stringify(session));
    
    // 启动过期检查
    this.startExpirationCheck();
  }

  // 获取当前会话
  getSession(): LoginSession | null {
    try {
      const sessionStr = localStorage.getItem('authSession');
      if (!sessionStr) return null;
      
      const session: LoginSession = JSON.parse(sessionStr);
      
      // 检查是否过期
      if (this.isExpired(session.expiresAt)) {
        this.clearSession();
        return null;
      }
      
      return session;
    } catch (error) {
      console.error('获取会话失败:', error);
      this.clearSession();
      return null;
    }
  }

  // 检查token是否过期
  isExpired(expiresAt: string): boolean {
    return new Date() >= new Date(expiresAt);
  }

  // 获取剩余时间（毫秒）
  getTimeRemaining(): number {
    const session = this.getSession();
    if (!session) return 0;
    
    const now = new Date().getTime();
    const expires = new Date(session.expiresAt).getTime();
    return Math.max(0, expires - now);
  }


  // 清除会话
  clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('authSession');
    this.stopExpirationCheck();
    this.warningShown = false;
  }

  // 启动过期检查
  startExpirationCheck() {
    this.stopExpirationCheck();
    
    this.checkInterval = setInterval(() => {
      const remaining = this.getTimeRemaining();
      
      // 如果已过期，自动登出
      if (remaining <= 0) {
        this.handleExpiration();
        return;
      }
    }, 60000); // 每分钟检查一次
  }

  // 停止过期检查
  stopExpirationCheck() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  // 处理过期
  private handleExpiration() {
    this.clearSession();
    Toast.error("登录已过期，请重新登录");
    navigateTo('/');
  }


  // 刷新token（需要后端支持）
  // private async refreshToken() {
  //   try {
  //     // 这里可以调用刷新token的API
  //     console.log('刷新token功能待实现');
  //     // const response = await request.post('/api/auth/refresh');
  //     // this.saveSession(response.data);
  //   } catch (error) {
  //     console.error('刷新token失败:', error);
  //   }
  // }

  // // 延长登录时间
  // extendSession(hours: number = 24) {
  //   const session = this.getSession();
  //   if (!session) return false;
    
  //   const newExpiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
  //   session.expiresAt = newExpiresAt;
    
  //   localStorage.setItem('authSession', JSON.stringify(session));
  //   this.warningShown = false;
    
  //   console.log(`登录时间已延长 ${hours} 小时`);
  //   return true;
  // }

  // // 获取登录状态信息
  // getLoginStatus() {
  //   const session = this.getSession();
  //   if (!session) {
  //     return {
  //       isLoggedIn: false,
  //       timeRemaining: 0,
  //       timeRemainingFormatted: '未登录',
  //       expiresAt: null,
  //       rememberMe: false
  //     };
  //   }
    
  //   return {
  //     isLoggedIn: true,
  //     timeRemaining: this.getTimeRemaining(),
  //     timeRemainingFormatted: this.getTimeRemainingFormatted(),
  //     expiresAt: session.expiresAt,
  //     rememberMe: session.rememberMe
  //   };
  // }
  // 获取剩余时间（格式化字符串）
  // getTimeRemainingFormatted(): string {
  //   const remaining = this.getTimeRemaining();
  //   if (remaining <= 0) return '已过期';
    
  //   const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  //   const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
  //   if (days > 0) return `${days}天${hours}小时`;
  //   if (hours > 0) return `${hours}小时${minutes}分钟`;
  //   return `${minutes}分钟`;
  // }
}

export const authManager = AuthManager.getInstance();
export default authManager;
