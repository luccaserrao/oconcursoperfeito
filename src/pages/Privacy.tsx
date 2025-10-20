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
            <p className="text-sm text-muted-foreground mb-8">Última atualização: Janeiro de 2025</p>
            
            <div className="prose prose-sm max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Introdução</h2>
                <p className="text-muted-foreground">
                  O Career Quest AI ("nós", "nosso") está comprometido em proteger sua privacidade. 
                  Esta política descreve como coletamos, usamos e protegemos seus dados pessoais, 
                  em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. Dados Coletados</h2>
                <p className="text-muted-foreground mb-2">Coletamos os seguintes dados:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li><strong>Nome completo:</strong> Para personalizar sua experiência</li>
                  <li><strong>E-mail:</strong> Para enviar resultados e comunicações</li>
                  <li><strong>WhatsApp (opcional):</strong> Para envio de resultados e suporte</li>
                  <li><strong>Respostas do quiz:</strong> Para gerar recomendações personalizadas</li>
                  <li><strong>Dados de navegação:</strong> Via Google Analytics (cookies)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. Como Usamos Seus Dados</h2>
                <p className="text-muted-foreground mb-2">Utilizamos seus dados para:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Gerar recomendações de carreira personalizadas via IA</li>
                  <li>Enviar por e-mail seus resultados e conteúdos relacionados</li>
                  <li>Processar pagamentos (via Mercado Pago)</li>
                  <li>Fornecer suporte via WhatsApp</li>
                  <li>Melhorar nosso serviço através de análises agregadas</li>
                  <li>Enviar comunicações sobre o Pacote Completo (você pode cancelar a qualquer momento)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Compartilhamento de Dados</h2>
                <p className="text-muted-foreground mb-2">Compartilhamos dados apenas com:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li><strong>Mercado Pago:</strong> Para processar pagamentos (dados criptografados)</li>
                  <li><strong>Google Analytics:</strong> Para análise de tráfego (dados anonimizados)</li>
                  <li><strong>Lovable Cloud/Supabase:</strong> Para armazenamento seguro de dados</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  <strong>Nunca vendemos ou alugamos seus dados a terceiros.</strong>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. Seus Direitos (LGPD)</h2>
                <p className="text-muted-foreground mb-2">Você tem direito a:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Confirmar se tratamos seus dados</li>
                  <li>Acessar seus dados</li>
                  <li>Corrigir dados incompletos ou desatualizados</li>
                  <li>Solicitar anonimização ou exclusão de dados</li>
                  <li>Revogar consentimento a qualquer momento</li>
                  <li>Cancelar recebimento de e-mails</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Como Exercer Seus Direitos</h2>
                <p className="text-muted-foreground">
                  Para exercer qualquer direito acima, entre em contato:<br />
                  📱 WhatsApp: (91) 98423-3672
                </p>
                <p className="text-muted-foreground mt-2">
                  Responderemos sua solicitação em até 15 dias úteis.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Cookies</h2>
                <p className="text-muted-foreground">
                  Utilizamos cookies para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Melhorar a experiência do usuário</li>
                  <li>Analisar tráfego via Google Analytics</li>
                  <li>Salvar progresso do quiz (localStorage)</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  Você pode desativar cookies nas configurações do seu navegador, mas isso pode 
                  afetar funcionalidades do site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">8. Segurança</h2>
                <p className="text-muted-foreground">
                  Implementamos medidas técnicas e organizacionais para proteger seus dados:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Criptografia SSL/TLS em toda comunicação</li>
                  <li>Banco de dados com acesso restrito</li>
                  <li>Backups regulares</li>
                  <li>Conformidade com padrões de segurança do Mercado Pago</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">9. Retenção de Dados</h2>
                <p className="text-muted-foreground">
                  Mantemos seus dados enquanto você usar nosso serviço ou conforme exigido por lei. 
                  Você pode solicitar exclusão a qualquer momento.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">10. Alterações nesta Política</h2>
                <p className="text-muted-foreground">
                  Podemos atualizar esta política periodicamente. Mudanças significativas serão 
                  comunicadas por e-mail com 30 dias de antecedência.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">11. Contato</h2>
                <p className="text-muted-foreground">
                  Para dúvidas sobre privacidade ou proteção de dados:<br />
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

export default Privacy;
