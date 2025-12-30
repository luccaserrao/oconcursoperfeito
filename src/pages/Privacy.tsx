import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </Link>

          <Card className="p-8 shadow-[var(--shadow-elevated)]">
            <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
            <p className="text-sm text-muted-foreground mb-8">Última atualização: Dezembro de 2025</p>

            <div className="prose prose-sm max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Introdução</h2>
                <p className="text-muted-foreground">
                  O Futuro Perfeito é um projeto independente e se compromete a proteger sua privacidade, seguindo a Lei Geral de
                  Proteção de Dados (LGPD - Lei 13.709/2018). Esta política explica como coletamos, usamos e protegemos seus dados.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. Dados coletados</h2>
                <p className="text-muted-foreground mb-2">Coletamos apenas o necessário para entregar o serviço:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li><strong>Nome:</strong> para personalizar a comunicação e os resultados</li>
                  <li><strong>E-mail:</strong> para enviar o relatório e atualizações</li>
                  <li><strong>WhatsApp (opcional):</strong> para entrega do relatório e suporte, se você optar</li>
                  <li><strong>Respostas do quiz:</strong> para gerar recomendações personalizadas</li>
                  <li><strong>Dados técnicos de navegação:</strong> como IP, dispositivo e métricas de uso, via ferramentas de analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. Como usamos seus dados</h2>
                <p className="text-muted-foreground mb-2">Utilizamos seus dados para:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Gerar e entregar recomendações e relatórios personalizados</li>
                  <li>Enviar comunicações sobre o seu pedido ou sobre melhorias do serviço (você pode sair a qualquer momento)</li>
                  <li>Processar pagamento do relatório completo (pagamento único de R$ 25)</li>
                  <li>Melhorar o produto com análises agregadas e métricas de uso</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Bases legais</h2>
                <p className="text-muted-foreground mb-2">Tratamos seus dados com base em:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li><strong>Consentimento:</strong> para comunicações e uso do WhatsApp</li>
                  <li><strong>Execução de contrato:</strong> para gerar e entregar o relatório</li>
                  <li><strong>Legítimo interesse:</strong> para segurança, prevenção a fraudes e melhoria do serviço</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. Compartilhamento</h2>
                <p className="text-muted-foreground mb-2">Compartilhamos dados apenas com provedores necessários:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Processador de pagamentos para transações seguras</li>
                  <li>Serviços de e-mail para envio de relatórios e comunicações</li>
                  <li>Plataformas de analytics para métricas (dados agregados)</li>
                  <li>Plataforma de backend/armazenamento para guardar respostas do quiz e contato</li>
                </ul>
                <p className="text-muted-foreground mt-2"><strong>Não vendemos nem alugamos seus dados.</strong></p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Seus direitos (LGPD)</h2>
                <p className="text-muted-foreground mb-2">Você pode, a qualquer momento:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Confirmar se tratamos seus dados e acessar uma cópia</li>
                  <li>Corrigir dados incompletos ou desatualizados</li>
                  <li>Solicitar anonimização ou exclusão de dados</li>
                  <li>Revogar consentimento e cancelar comunicações</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Segurança</h2>
                <p className="text-muted-foreground">
                  Usamos criptografia (HTTPS), controles de acesso e armazenamento restrito. Apesar dos cuidados, nenhum sistema é
                  100% imune; mantenha seus dispositivos seguros.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">8. Retenção</h2>
                <p className="text-muted-foreground">
                  Mantemos seus dados enquanto necessário para entregar o serviço ou cumprir obrigações legais. Você pode pedir a
                  exclusão; isso pode limitar funcionalidades futuras.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">9. Cookies e métricas</h2>
                <p className="text-muted-foreground">
                  Utilizamos cookies/localStorage para manter sua sessão no quiz e analytics para métricas de uso. Você pode
                  desativar no navegador, mas algumas funções podem ser afetadas.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">10. Alterações nesta política</h2>
                <p className="text-muted-foreground">
                  Podemos atualizar esta política. Mudanças relevantes serão comunicadas pelos canais disponíveis. O uso contínuo
                  após a atualização significa que você concorda com a nova versão.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">11. Contato</h2>
                <p className="text-muted-foreground">
                  Para exercer seus direitos ou tirar dúvidas: WhatsApp (91) 98423-3672 ou mensagem via Instagram @luccaserrao.
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

export default Privacy;

