import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-12 py-8 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Futuro Perfeito</h4>
            <p className="text-sm text-muted-foreground">
              Projeto independente, feito por uma pessoa e em constante evolução para mostrar os concursos públicos disponíveis no Brasil e como você pode se preparar.
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
              <p>WhatsApp: (91) 98423-3672</p>
              <a
                href="https://www.instagram.com/luccaserrao/"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Instagram: @luccaserrao
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground pt-6 border-t border-border">
          © 2025 Futuro Perfeito. Todos os direitos reservados. Feito por{" "}
          <a
            href="https://www.instagram.com/luccaserrao/"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline font-semibold"
          >
            @luccaserrao
          </a>
          .
        </div>
      </div>
    </footer>
  );
};

