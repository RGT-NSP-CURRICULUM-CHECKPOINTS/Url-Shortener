import api from "../api/axios";

export const createShortUrl = async (longUrl: string) => {
  const response = await api.post("/shorten", { originalUrl: longUrl });
  return response.data;
};
