import { AppHeader } from "../components/layout/AppHeader";
import { ActivityRequestForm } from "../components/forms/ActivityRequestForm";
import { useAuth } from "../hooks/useAuth";
import { CheckCircle2, ChevronRight, FileText, Layout, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  // User auth state
  useAuth();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <AppHeader />
      
      <main className="container py-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-4 animate-pulse">
                <ShieldCheck className="mr-1 h-3 w-3" />
                Interno e Seguro
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Gerencie solicitações no <span className="text-primary italic">Azure DevOps</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                Abra chamados, tarefas ou bugs de forma simplificada. 
                Autentique-se com sua conta Google e deixe o resto conosco.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Identificação Automática</h3>
                  <p className="text-muted-foreground">Nome e e-mail preenchidos via login Google Identity.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Suporte a Anexos</h3>
                  <p className="text-muted-foreground">Envie evidências, documentos e imagens diretamente pelo formulário.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Layout className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Totalmente Integrado</h3>
                  <p className="text-muted-foreground">Sincronização imediata com os boards do seu time no DevOps.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-2 text-sm text-muted-foreground font-medium">
              Saiba mais sobre a integração
              <ChevronRight className="h-4 w-4" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <ActivityRequestForm />
          </motion.div>
        </div>
      </main>

      <footer className="border-t bg-muted/30 py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 formsAzure - Ferramenta interna de produtividade</p>
      </footer>
    </div>
  );
};

export default Index;
