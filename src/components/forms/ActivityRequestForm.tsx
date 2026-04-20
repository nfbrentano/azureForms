import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FileUploadZone } from './FileUploadZone';
import { useAuth } from '@/hooks/useAuth';
import { useCreateAzureActivity } from '@/hooks/useCreateAzureActivity';
import { Loader2, Plus, Send, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const activitySchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
});

type ActivityFormData = z.infer<typeof activitySchema>;

export const ActivityRequestForm = () => {
  const { user, isAuthenticated } = useAuth();
  const { createActivity, isSubmitting, progress } = useCreateAzureActivity();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema)
  });

  const onSubmit = async (data: ActivityFormData) => {
    if (!isAuthenticated || !user) return;

    const result = await createActivity({
      ...data,
      requesterName: user.name,
      requesterEmail: user.email,
      attachments: selectedFiles
    });

    if (result) {
      reset();
      setSelectedFiles([]);
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-xl border-primary/10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      <CardHeader className="bg-primary/[0.02]">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Plus className="h-6 w-6 text-primary" />
          Nova Solicitação
        </CardTitle>
        <CardDescription>
          Preencha os detalhes da atividade para abertura no Azure DevOps.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {!isAuthenticated && (
          <div className="flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="font-medium">Você precisa estar autenticado para enviar uma solicitação.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="requesterName">Solicitante</Label>
            <Input
              id="requesterName"
              value={user?.name || "Ninguém autenticado"}
              readOnly
              className="bg-muted text-muted-foreground cursor-not-allowed border-dashed"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requesterEmail">E-mail</Label>
            <Input
              id="requesterEmail"
              value={user?.email || "Ninguém autenticado"}
              readOnly
              className="bg-muted text-muted-foreground cursor-not-allowed border-dashed"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title" className={errors.title ? "text-destructive" : ""}>Título da Atividade *</Label>
          <Input
            id="title"
            placeholder="Ex: Corrigir erro de autenticação no portal"
            {...register('title')}
            disabled={!isAuthenticated || isSubmitting}
            className={cn(errors.title && "border-destructive focus-visible:ring-destructive")}
          />
          {errors.title && <p className="text-xs text-destructive font-medium">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className={errors.description ? "text-destructive" : ""}>Descrição Detalhada *</Label>
          <Textarea
            id="description"
            rows={5}
            placeholder="Descreva aqui o que precisa ser feito, passos para reproduzir ou requisitos..."
            {...register('description')}
            disabled={!isAuthenticated || isSubmitting}
            className={cn("resize-none", errors.description && "border-destructive focus-visible:ring-destructive")}
          />
          {errors.description && <p className="text-xs text-destructive font-medium">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Anexos</Label>
          <FileUploadZone 
            onFilesSelected={setSelectedFiles} 
          />
        </div>
      </CardContent>

      <CardFooter className="bg-primary/[0.02] border-t py-6">
        <Button 
          onClick={handleSubmit(onSubmit)} 
          disabled={!isAuthenticated || isSubmitting}
          className="w-full h-11 text-base font-semibold transition-all hover:shadow-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Criar Atividade no Azure
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
