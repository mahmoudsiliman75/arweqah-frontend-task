import type { PaginatedResponse } from './pagination';

export type PostBase = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type FetchPostListResponse = PaginatedResponse<PostBase>