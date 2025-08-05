import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import path from 'path';
import resumeRouter from './routes/resumeRoutes.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 4000;
app.use(cors());

connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/auth', userRouter);
app.use('/api/resume', resumeRouter);

// SSE 连接存储
const sseClients = new Set();

// SSE 路由 - 建立连接
app.get('/api/sse', (req, res) => {
  // 设置 SSE 响应头
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });

  // 发送初始连接消息
  res.write(`data: ${JSON.stringify({
    type: 'connection',
    message: 'SSE 连接已建立',
    timestamp: new Date().toISOString(),
    clientId: Date.now()
  })}\n\n`);

  // 将客户端添加到连接集合
  const client = {
    id: Date.now(),
    response: res,
    lastPing: Date.now()
  };
  sseClients.add(client);

  console.log(`新的 SSE 客户端连接，当前连接数: ${sseClients.size}`);

  // 客户端断开连接时清理
  req.on('close', () => {
    sseClients.delete(client);
    console.log(`SSE 客户端断开连接，当前连接数: ${sseClients.size}`);
  });

  // 发送心跳包
  const heartbeat = setInterval(() => {
    if (sseClients.has(client)) {
      try {
        res.write(`data: ${JSON.stringify({
          type: 'heartbeat',
          timestamp: new Date().toISOString()
        })}\n\n`);
        client.lastPing = Date.now();
      } catch (error) {
        console.log('心跳发送失败，清理客户端连接');
        clearInterval(heartbeat);
        sseClients.delete(client);
      }
    } else {
      clearInterval(heartbeat);
    }
  }, 30000); // 每30秒发送一次心跳
});

// SSE 广播消息的 API
app.post('/api/sse/broadcast', (req, res) => {
  const { message, type = 'broadcast' } = req.body;

  if (!message) {
    return res.status(400).json({ error: '消息内容不能为空' });
  }

  const data = {
    type,
    message,
    timestamp: new Date().toISOString(),
    clientCount: sseClients.size
  };

  // 向所有连接的客户端广播消息
  let successCount = 0;
  let failCount = 0;

  sseClients.forEach(client => {
    try {
      client.response.write(`data: ${JSON.stringify(data)}\n\n`);
      successCount++;
    } catch (error) {
      console.log('向客户端发送消息失败:', error.message);
      sseClients.delete(client);
      failCount++;
    }
  });

  res.json({
    success: true,
    message: '消息广播完成',
    stats: {
      totalClients: sseClients.size,
      successCount,
      failCount
    }
  });
});

// 获取当前 SSE 连接状态
app.get('/api/sse/status', (_req, res) => {
  res.json({
    connectedClients: sseClients.size,
    clients: Array.from(sseClients).map(client => ({
      id: client.id,
      lastPing: client.lastPing,
      connected: Date.now() - client.lastPing < 60000
    }))
  });
});

// 模拟实时数据推送 - 每10秒发送一次随机数据
setInterval(() => {
  if (sseClients.size > 0) {
    const randomData = {
      type: 'data',
      message: '实时数据更新',
      data: {
        temperature: (Math.random() * 40 + 10).toFixed(1) + '°C',
        humidity: (Math.random() * 100).toFixed(1) + '%',
        timestamp: new Date().toISOString(),
        randomValue: Math.floor(Math.random() * 1000)
      }
    };

    sseClients.forEach(client => {
      try {
        client.response.write(`data: ${JSON.stringify(randomData)}\n\n`);
      } catch (error) {
        console.log('发送实时数据失败:', error.message);
        sseClients.delete(client);
      }
    });
  }
}, 10000); // 每10秒发送一次

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, _path) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    }
  })
)

// 提供 SSE 测试页面
app.use('/test', express.static(path.join(__dirname, 'public')));

// SSE 测试页面路由
app.get('/', (_req, res) => {
  res.send(`
    <h1>Resume Builder API Server</h1>
    <p>服务器运行正常</p>
    <p><a href="/test/sse-test.html">SSE 功能测试页面</a></p>
    <h3>可用的 API 端点:</h3>
    <ul>
      <li><strong>GET /api/sse</strong> - SSE 连接端点</li>
      <li><strong>POST /api/sse/broadcast</strong> - 广播消息</li>
      <li><strong>GET /api/sse/status</strong> - 获取 SSE 连接状态</li>
      <li><strong>GET /test/sse-test.html</strong> - SSE 测试页面</li>
    </ul>
  `);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || PORT}`);
});