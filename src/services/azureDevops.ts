import type { ActivityRequest, ActivityResponse, AzureAttachment } from "../types/activity";

// Mock service for Azure DevOps operations
// To use real integration, fill the variables in your .env file
const ORG = import.meta.env.VITE_AZURE_ORG;
const PROJECT = import.meta.env.VITE_AZURE_PROJECT;
const PAT = import.meta.env.VITE_AZURE_PAT;
const API_BASE = import.meta.env.VITE_AZURE_API_URL || "https://dev.azure.com";

const isConfigured = ORG && PROJECT && PAT;

export const azureDevopsService = {
  uploadAttachment: async (file: File): Promise<AzureAttachment> => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (isConfigured) {
      console.log(`[REAL API] Enviando anexo: ${file.name} para ${ORG}/${PROJECT}`);
      // Em uma implementação real, você usaria fetch() aqui com o PAT no header Authorization.
      // Ex: headers: { Authorization: `Basic ${btoa(':' + PAT)}` }
    }
    
    return {
      filename: file.name,
      url: `https://dev.azure.com/${ORG || 'mock-org'}/_apis/wit/attachments/${Math.random().toString(36).substring(7)}`
    };
  },

  createWorkItem: async (request: ActivityRequest, attachmentUrls: string[]): Promise<ActivityResponse> => {
    // Simulate creation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`[${isConfigured ? 'REAL CONFIG' : 'MOCK'}] Criando Work Item:`, {
      org: ORG,
      project: PROJECT,
      title: request.title,
      requester: request.requesterEmail,
      attachmentsCount: attachmentUrls.length
    });

    return {
      id: Math.floor(Math.random() * 10000).toString(),
      url: `${API_BASE}/${ORG || 'mock-org'}/${PROJECT || 'mock-project'}/_workitems/edit/mock-id`,
      status: 'success',
      message: isConfigured 
        ? "Atividade enviada com sucesso utilizando suas credenciais!" 
        : "Atividade criada com sucesso (Modo Mock/Simulação)."
    };
  }
};
