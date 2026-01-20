import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Termos de Uso | Futuro Perfeito</title>
        <meta
          name="description"
          content="Conheca os termos de uso do Futuro Perfeito e como funciona o servico."
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </Link>

          <Card className="p-8 shadow-[var(--shadow-elevated)]">
            <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
            <p className="text-sm text-muted-foreground mb-8">Última atualização: Dezembro de 2025</p>

            <div className="prose prose-sm max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Aceitação dos Termos</h2>
                <p className="text-muted-foreground">
                  Ao acessar ou usar o Futuro Perfeito, você concorda com estes Termos de Uso. Se não concordar com qualquer
                  parte, não utilize o serviço.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. Quem somos e o que oferecemos</h2>
                <p className="text-muted-foreground">
                  Futuro Perfeito é um projeto independente, desenvolvido por uma pessoa, que ajuda você a identificar concursos
                  públicos aderentes ao seu perfil. Oferecemos:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Quiz gratuito para mapear perfil e contexto</li>
                  <li>Recomendações iniciais baseadas nas suas respostas</li>
                  <li>Relatório completo opcional por pagamento único de R$ 25 (ranking de concursos, estimativas e plano)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. Uso do serviço</h2>
                <p className="text-muted-foreground mb-2">Ao usar o Futuro Perfeito, você se compromete a:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Fornecer informações verdadeiras e atualizadas</li>
                  <li>Não tentar burlar, interromper ou explorar o sistema</li>
                  <li>Usar o serviço somente para fins pessoais e legais</li>
                  <li>Respeitar direitos autorais e marcas exibidas no site</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Produto pago e entrega</h2>
                <p className="text-muted-foreground">
                  O relatório completo tem pagamento único de R$ 25. O processamento é feito por provedores de pagamento
                  terceirizados e o acesso é entregue por e-mail (e, se você optar, também por WhatsApp). Não há assinatura
                  nem recorrência.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. Reembolso</h2>
                <p className="text-muted-foreground">
                  Se não ficar satisfeito com o relatório completo, você pode solicitar reembolso em até 7 dias pelo WhatsApp
                  (91) 98423-3672 ou pelo contato indicado no site. Reembolsos são integrais para pedidos dentro desse prazo.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Propriedade intelectual</h2>
                <p className="text-muted-foreground">
                  Todo o conteúdo, textos, layouts, ilustrações e marca Futuro Perfeito são de propriedade do projeto ou de seus
                  licenciantes. É proibido copiar, revender ou distribuir sem autorização por escrito.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Limitação de responsabilidade</h2>
                <p className="text-muted-foreground">
                  As recomendações são baseadas nas respostas fornecidas e em dados disponíveis no momento. Não garantimos
                  aprovação em concursos nem que informações de terceiros (editais, salários, datas) estejam sempre atualizadas.
                  Use seu julgamento e verifique fontes oficiais antes de decisões.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">8. Privacidade e dados</h2>
                <p className="text-muted-foreground">
                  O tratamento dos seus dados pessoais é regido pela nossa Política de Privacidade. Ao usar o serviço, você
                  concorda com ela.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">9. Alterações nos termos</h2>
                <p className="text-muted-foreground">
                  Podemos atualizar estes termos. Mudanças relevantes serão comunicadas pelos canais disponíveis no site. O uso
                  continuado após a atualização implica concordância com a versão vigente.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">10. Lei aplicável</h2>
                <p className="text-muted-foreground">
                  Estes termos são regidos pelas leis da República Federativa do Brasil. Eventuais disputas serão resolvidas em
                  foro competente no Brasil.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">11. Contato</h2>
                <p className="text-muted-foreground">
                  Dúvidas ou solicitações: WhatsApp (91) 98423-3672 ou mensagem via Instagram @luccaserrao.
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
