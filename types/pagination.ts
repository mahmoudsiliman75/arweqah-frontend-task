export interface PaginatedResponse<T> {
  data: T[]
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
  links: [
    {
      url: string;
      label: string;
      active: boolean
    }
  ];
}