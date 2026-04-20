import { useState, useCallback } from 'react';
import type { ActivityRequest, ActivityResponse } from '../types/activity';
import { azureDevopsService } from '../services/azureDevops';
import { toast } from 'sonner';

export const useCreateAzureActivity = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const createActivity = useCallback(async (data: ActivityRequest): Promise<ActivityResponse | null> => {
    setIsSubmitting(true);
    setProgress(10);
    
    try {
      // 1. Upload Attachments
      const attachmentUrls: string[] = [];
      if (data.attachments && data.attachments.length > 0) {
        toast.info(`Iniciando upload de ${data.attachments.length} anexo(s)...`);
        
        const uploadPromises = data.attachments.map(async (file, index) => {
          const result = await azureDevopsService.uploadAttachment(file);
          if (data.attachments) {
            setProgress(10 + ((index + 1) / data.attachments.length) * 40);
          }
          return result.url;
        });
        
        const urls = await Promise.all(uploadPromises);
        attachmentUrls.push(...urls);
      }

      setProgress(60);
      toast.info("Criando atividade no Azure DevOps...");

      // 2. Create Work Item and Link Attachments
      const response = await azureDevopsService.createWorkItem(data, attachmentUrls);
      
      setProgress(100);
      toast.success(response.message || "Atividade criada com sucesso!");
      
      return response;
    } catch {
      toast.error("Erro ao criar atividade. Verifique a conexão e tente novamente.");
      return null;
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setProgress(0), 1000);
    }
  }, []);

  return {
    createActivity,
    isSubmitting,
    progress
  };
};
