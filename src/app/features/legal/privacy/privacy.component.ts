import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-surface-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-surface-200 overflow-hidden">
        <div class="px-6 py-8 sm:p-10">
          <div class="mb-8 flex items-center justify-between">
            <a routerLink="/" class="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              Voltar
            </a>
            <span class="text-sm text-surface-500">Última atualização: 27 de março de 2026</span>
          </div>

          <h1 class="text-4xl font-extrabold text-surface-900 tracking-tight mb-4">Política de Privacidade</h1>
          <p class="text-lg text-surface-600 mb-10">
            Sua privacidade é importante para nós. Esta política explica como coletamos, usamos e protegemos suas informações pessoais.
          </p>

          <div class="space-y-8 text-surface-600 leading-relaxed">
            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">1. Introdução</h2>
              <p>
                O Symphonia Sheet ("nós", "nosso" ou "Plataforma") valoriza a privacidade dos seus usuários. Esta Política de Privacidade descreve as práticas de coleta, uso, armazenamento e compartilhamento de dados pessoais quando você acessa e utiliza nossos serviços, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">2. Dados Coletados</h2>
              <p class="mb-4">Para fornecer nossos serviços, coletamos as seguintes informações:</p>
              <ul class="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Dados de Cadastro:</strong> Nome completo, endereço de e-mail e senha criptografada.</li>
                <li><strong>Dados de Uso:</strong> Informações sobre como você interage com a Plataforma, como partituras visualizadas, tempo de uso do player, favoritos, comentários e avaliações.</li>
                <li><strong>Preferências:</strong> Configurações de visualização, temas, instrumentos preferidos e histórico de navegação na Plataforma.</li>
                <li><strong>Dados Técnicos:</strong> Endereço IP, tipo de navegador, sistema operacional e informações do dispositivo utilizado para acessar o Serviço.</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">3. Como os Dados São Usados</h2>
              <p class="mb-4">Utilizamos seus dados pessoais para as seguintes finalidades:</p>
              <ul class="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Autenticação e Segurança:</strong> Criar e gerenciar sua conta, verificar sua identidade e proteger a Plataforma contra fraudes e acessos não autorizados.</li>
                <li><strong>Prestação do Serviço:</strong> Fornecer acesso às partituras, cifras, player interativo e demais funcionalidades contratadas.</li>
                <li><strong>Melhoria da Plataforma:</strong> Analisar o uso do Serviço para corrigir erros, desenvolver novos recursos e otimizar a experiência do usuário.</li>
                <li><strong>Personalização:</strong> Recomendar conteúdos relevantes com base em suas preferências e histórico de uso.</li>
                <li><strong>Comunicação:</strong> Enviar atualizações sobre o Serviço, notificações de segurança e informações sobre sua conta ou assinatura.</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">4. Compartilhamento de Dados</h2>
              <p class="mb-4">Não vendemos ou alugamos seus dados pessoais. Podemos compartilhar suas informações apenas nas seguintes situações:</p>
              <ul class="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Provedores de Serviço:</strong> Com empresas terceirizadas que nos auxiliam na operação da Plataforma (ex: hospedagem em nuvem, processamento de pagamentos, envio de e-mails), sob rigorosos acordos de confidencialidade.</li>
                <li><strong>Obrigação Legal:</strong> Quando exigido por lei, ordem judicial ou solicitação de autoridades governamentais competentes.</li>
                <li><strong>Proteção de Direitos:</strong> Para investigar fraudes, violações dos Termos de Uso ou proteger os direitos, propriedade ou segurança do [Nome da empresa], de nossos usuários ou do público.</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">5. Cookies e Tecnologias Similares</h2>
              <p>
                Utilizamos cookies e tecnologias de rastreamento semelhantes para manter sua sessão ativa, lembrar suas preferências e analisar o tráfego da Plataforma. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar o funcionamento de alguns recursos do Serviço.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">6. Segurança dos Dados</h2>
              <p>
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda, destruição ou alteração. Isso inclui o uso de criptografia (HTTPS/TLS) na transmissão de dados e armazenamento seguro em servidores de provedores reconhecidos. No entanto, nenhum sistema é 100% seguro, e não podemos garantir segurança absoluta.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">7. Retenção de Dados</h2>
              <p>
                Manteremos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta Política, manter sua conta ativa ou cumprir obrigações legais e regulatórias. Quando os dados não forem mais necessários, eles serão excluídos ou anonimizados de forma segura.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">8. Direitos do Usuário (LGPD)</h2>
              <p class="mb-4">De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:</p>
              <ul class="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Acesso:</strong> Solicitar a confirmação da existência de tratamento e o acesso aos seus dados.</li>
                <li><strong>Correção:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
                <li><strong>Exclusão:</strong> Solicitar a exclusão dos seus dados pessoais, exceto quando a retenção for necessária por motivos legais.</li>
                <li><strong>Portabilidade:</strong> Solicitar a transferência dos seus dados para outro fornecedor de serviço.</li>
                <li><strong>Revogação do Consentimento:</strong> Retirar seu consentimento para o tratamento de dados, quando aplicável.</li>
              </ul>
              <p class="mt-4">Para exercer seus direitos, entre em contato conosco através dos canais informados ao final desta Política.</p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">9. Transferência Internacional</h2>
              <p>
                Como utilizamos serviços de infraestrutura em nuvem globais, seus dados podem ser transferidos e armazenados em servidores localizados fora do Brasil. Garantimos que tais transferências ocorram apenas para países ou empresas que proporcionem grau de proteção de dados adequado, conforme exigido pela LGPD.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">10. Alterações na Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou exigências legais. Notificaremos você sobre alterações significativas através da Plataforma ou por e-mail. A data da última atualização estará sempre indicada no topo deste documento.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">11. Contato</h2>
              <p>
                Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou ao tratamento de seus dados pessoais, entre em contato com nosso Encarregado de Proteção de Dados (DPO) através do e-mail: <a href="mailto:[E-mail de contato]" class="font-medium text-primary-600 hover:text-primary-700">[E-mail de contato]</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PrivacyComponent {}
