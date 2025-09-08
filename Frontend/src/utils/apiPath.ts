export const BASE_URL = "http://localhost:4000";

const API_PATH = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  GET_USER: "/api/auth/profile",
  CREATE_RESUME: "/api/resume",
  GET_ALL: "/api/resume",
  GET_BY_ID: (id: any) => `/api/resume/${id}/getResumeById`,
  UPDATE: (id: any) => `/api/resume/${id}/update`,
  DELETE: (id: any) => `/api/resume/${id}/delete`,
  UPLOAD_IMAGES: (id: any) => `/api/resume/${id}/upload-images`,
  UPLOAD_IMAGES_ALL: `/api/auth/upload-images`,
  // 证件照上传相关
  UPLOAD_PROFILE_PHOTO: "/api/auth/upload-profile-photo",
  DELETE_PROFILE_PHOTO: "/api/auth/delete-profile-photo",
  GET_UPLOAD_CONFIG: "/api/auth/upload-config",
}
export default API_PATH;