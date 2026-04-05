import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
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

          <h1 class="text-4xl font-extrabold text-surface-900 tracking-tight mb-4">Termos de Uso</h1>
          <p class="text-lg text-surface-600 mb-10">
            Bem-vindo ao Symphonia Sheet. Ao acessar e utilizar nossa plataforma, você concorda com os termos e condições descritos abaixo.
          </p>

          <div class="space-y-8 text-surface-600 leading-relaxed">
            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao criar uma conta, acessar ou utilizar o Symphonia Sheet (doravante denominado "Plataforma" ou "Serviço"), você concorda em se vincular a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">2. Definições</h2>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Plataforma:</strong> O software como serviço (SaaS) Symphonia Sheet, incluindo seu site, aplicativos e recursos associados.</li>
                <li><strong>Usuário:</strong> Qualquer pessoa que se cadastre ou acesse a Plataforma.</li>
                <li><strong>Conteúdo:</strong> Partituras, cifras, materiais de ensaio, áudios, textos e demais materiais disponibilizados na Plataforma.</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">3. Cadastro do Usuário</h2>
              <p class="mb-4">
                Para acessar determinadas funcionalidades, você precisará criar uma conta. Você concorda em fornecer informações precisas, completas e atualizadas.
              </p>
              <p>
                Você é o único responsável por manter a confidencialidade de suas credenciais de acesso (login e senha) e por todas as atividades que ocorrerem sob sua conta.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">4. Responsabilidades do Usuário</h2>
              <p>Ao utilizar a Plataforma, você se compromete a:</p>
              <ul class="list-disc pl-5 mt-2 space-y-2">
                <li>Utilizar o Serviço de forma ética, legal e de acordo com estes Termos.</li>
                <li>Não compartilhar suas credenciais de acesso com terceiros.</li>
                <li>Não utilizar a Plataforma para fins ilícitos, fraudulentos ou que violem direitos de terceiros.</li>
                <li>Respeitar os direitos autorais e de propriedade intelectual dos conteúdos disponibilizados.</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">5. Uso Permitido e Proibido</h2>
              <p class="mb-4"><strong>Uso Permitido:</strong> Você pode acessar, visualizar, interagir e utilizar os conteúdos da Plataforma para fins de estudo, ensaio e performance musical, conforme as permissões do seu plano (Free ou Premium).</p>
              <p><strong>Uso Proibido:</strong> É estritamente proibido:</p>
              <ul class="list-disc pl-5 mt-2 space-y-2">
                <li>Copiar, distribuir, revender ou explorar comercialmente os conteúdos da Plataforma sem autorização expressa.</li>
                <li>Utilizar robôs, spiders ou outros meios automatizados para extrair dados da Plataforma (scraping).</li>
                <li>Tentar burlar sistemas de segurança, limitações de acesso ou o player de partituras.</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">6. Propriedade Intelectual</h2>
              <p>
                Todos os direitos de propriedade intelectual sobre a Plataforma (código, design, interface, marca) e sobre os conteúdos originais disponibilizados são de propriedade exclusiva do [Nome da empresa] ou de seus respectivos licenciadores. O uso da Plataforma não lhe concede nenhum direito de propriedade sobre esses elementos.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">7. Conteúdos Disponibilizados</h2>
              <p>
                A Plataforma disponibiliza partituras, cifras e materiais de ensaio. Esforçamo-nos para garantir a precisão e qualidade dos materiais, mas não garantimos que sejam isentos de erros. O uso dos materiais é de sua inteira responsabilidade.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">8. Assinaturas e Pagamentos</h2>
              <p class="mb-4">
                A Plataforma opera em um modelo freemium. O acesso a recursos avançados e conteúdos exclusivos pode exigir a assinatura de um plano Premium.
              </p>
              <ul class="list-disc pl-5 space-y-2">
                <li>Os valores, formas de pagamento e periodicidade das assinaturas serão informados no momento da contratação.</li>
                <li>As assinaturas podem ser renovadas automaticamente, a menos que canceladas antes do fim do ciclo de faturamento atual.</li>
                <li>Não oferecemos reembolsos para períodos parciais de assinatura já utilizados, exceto quando exigido por lei.</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">9. Cancelamento e Suspensão de Conta</h2>
              <p class="mb-4">
                Você pode cancelar sua conta a qualquer momento através das configurações do seu perfil.
              </p>
              <p>
                Reservamo-nos o direito de suspender ou encerrar sua conta, sem aviso prévio, caso seja identificada violação destes Termos de Uso, suspeita de fraude ou uso indevido da Plataforma.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">10. Limitação de Responsabilidade</h2>
              <p>
                A Plataforma é fornecida "no estado em que se encontra" (as is). Não garantimos que o Serviço será ininterrupto, livre de erros ou totalmente seguro. Em nenhuma hipótese o [Nome da empresa] será responsável por danos indiretos, lucros cessantes ou perda de dados decorrentes do uso ou da incapacidade de uso da Plataforma.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">11. Modificações no Serviço e nos Termos</h2>
              <p>
                Podemos atualizar ou modificar estes Termos de Uso a qualquer momento. Notificaremos os usuários sobre mudanças significativas através do e-mail cadastrado ou por aviso na Plataforma. O uso contínuo do Serviço após as alterações constitui aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">12. Encerramento da Plataforma</h2>
              <p>
                Reservamo-nos o direito de descontinuar a Plataforma ou parte dela a qualquer momento, com aviso prévio razoável aos usuários, não sendo devida qualquer indenização por tal encerramento, ressalvada a devolução proporcional de valores pagos por assinaturas ativas não usufruídas.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">13. Legislação Aplicável</h2>
              <p>
                Estes Termos de Uso são regidos e interpretados de acordo com as leis da República Federativa do Brasil, em especial a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e o Marco Civil da Internet (Lei nº 12.965/2014).
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">14. Foro</h2>
              <p>
                Fica eleito o foro da comarca da sede do [Nome da empresa] para dirimir quaisquer controvérsias oriundas destes Termos de Uso, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            <div class="mt-12 pt-8 border-t border-surface-200">
              <p>
                Em caso de dúvidas sobre estes Termos de Uso, entre em contato conosco através do e-mail: <a href="mailto:[E-mail de contato]" class="font-medium">[E-mail de contato]</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TermsComponent {}
