export const BASE_URL = "http://localhost:4000";

const API_PATH = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  GET_USER: "/api/auth/profile",
  CREATE_RESUME: "/api/resume",
  GET_ALL: "/api/resume",
  GET_BY_ID:(id:any)=> `/api/resume${id}`,
  UPDATE: (id: any) =>`/api/resume/${id}`,
  DELETE: (id: any) =>`/api/resume/${id}`,
  UPLOAD_IMAGES: (id: any) => `/api/resume/${id}/upload-images`,
  UPLOAD_IMAGES_ALL: `/api/auth/upload-images`,
}
export default API_PATH;