import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-12 py-8 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Career Quest AI</h4>
            <p className="text-sm text-muted-foreground">
              Sua carreira pública começa aqui
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold mb-3 text-sm">Legal</h5>
            <div className="space-y-2">
              <Link to="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold mb-3 text-sm">Contato</h5>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📱 (91) 98423-3672</p>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground pt-6 border-t border-border">
          © 2025 Career Quest AI. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
