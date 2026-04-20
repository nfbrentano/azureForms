import { Button } from "../ui/button";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, LogIn } from "lucide-react";
// cn removed as it was unused

export const AppHeader = () => {
  const { user, login, logout, isAuthenticated, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
            <span className="text-xl font-bold">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">formsAzure</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">DevOps Integrator</span>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden flex-col items-end sm:flex">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 shadow-inner">
                <img src={user?.avatar} alt={user?.name} className="h-full w-full object-cover" />
              </div>
              <Button variant="ghost" size="icon" onClick={logout} title="Sair">
                <LogOut className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
              </Button>
            </div>
          ) : (
            <Button onClick={login} disabled={isLoading} className="gap-2">
              <LogIn className="h-4 w-4" />
              {isLoading ? "Entrando..." : "Entrar com Google"}
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
