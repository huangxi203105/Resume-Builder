//全局接口返回结构
export const rspHandler = (res, data, code = 200, msg = 'success') => {
  res.status(code).json({
    code,
    msg,
    data,
  });
};