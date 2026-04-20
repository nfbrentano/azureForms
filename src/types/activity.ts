export interface ActivityRequest {
  title: string;
  description: string;
  requesterName: string;
  requesterEmail: string;
  attachments?: File[];
}

export interface ActivityResponse {
  id: string;
  url: string;
  status: 'success' | 'error';
  message?: string;
}

export interface AzureAttachment {
  filename: string;
  url: string;
}
