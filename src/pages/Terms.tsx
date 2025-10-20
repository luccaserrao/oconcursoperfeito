import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </Link>
          
          <Card className="p-8 shadow-[var(--shadow-elevated)]">
            <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
            <p className="text-sm text-muted-foreground mb-8">Última atualização: Janeiro de 2025</p>
            
            <div className="prose prose-sm max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Aceitação dos Termos</h2>
                <p className="text-muted-foreground">
                  Ao acessar e usar o Career Quest AI, você concorda com estes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. Descrição do Serviço</h2>
                <p className="text-muted-foreground">
                  O Career Quest AI é uma plataforma que oferece:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Quiz gratuito para identificação de carreiras públicas compatíveis</li>
                  <li>Análise de perfil por inteligência artificial</li>
                  <li>Recomendações personalizadas de concursos públicos</li>
                  <li>Pacote completo de preparação (produto pago opcional)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. Uso do Serviço</h2>
                <p className="text-muted-foreground mb-2">Você concorda em:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Fornecer informações verdadeiras e precisas</li>
                  <li>Usar o serviço apenas para fins legais</li>
                  <li>Não tentar burlar ou manipular nossos sistemas</li>
                  <li>Não revender ou redistribuir o conteúdo sem autorização</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Produto Pago</h2>
                <p className="text-muted-foreground">
                  O Pacote Completo de Preparação é um produto digital com pagamento único de R$ 50,00. 
                  Após a confirmação do pagamento, você receberá acesso imediato ao conteúdo por e-mail.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. Política de Reembolso</h2>
                <p className="text-muted-foreground">
                  Oferecemos garantia incondicional de 7 dias. Se você não ficar satisfeito com o 
                  Pacote Completo, entre em contato através do WhatsApp (91) 98423-3672 para solicitar 
                  reembolso total, sem perguntas ou burocracia.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Propriedade Intelectual</h2>
                <p className="text-muted-foreground">
                  Todo o conteúdo, design, logotipos e materiais do Career Quest AI são de propriedade 
                  exclusiva e protegidos por leis de direitos autorais.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Limitação de Responsabilidade</h2>
                <p className="text-muted-foreground">
                  O Career Quest AI oferece recomendações baseadas em IA, mas não garante aprovação em 
                  concursos públicos. O sucesso depende de múltiplos fatores, incluindo seu esforço e dedicação.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">8. Alterações nos Termos</h2>
                <p className="text-muted-foreground">
                  Podemos atualizar estes termos periodicamente. Mudanças significativas serão comunicadas 
                  por e-mail aos usuários cadastrados.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">9. Lei Aplicável</h2>
                <p className="text-muted-foreground">
                  Estes termos são regidos pelas leis da República Federativa do Brasil.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">10. Contato</h2>
                <p className="text-muted-foreground">
                  Para dúvidas sobre estes termos, entre em contato:<br />
                  📱 WhatsApp: (91) 98423-3672
                </p>
              </section>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
