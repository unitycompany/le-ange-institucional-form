# 🤖 Configuração Completa do Make (Integromat) - Sistema WhatsApp Popup

## 🎯 Visão Geral
Este guia detalha como criar uma automação completa no Make para capturar leads através do popup de WhatsApp do site da Pousada Le Ange e armazenar os dados automaticamente em uma planilha Google Sheets.

## 📋 Cenário Completo no Make

### **MÓDULO 1: Webhook (Gatilho)**
**Tipo**: HTTP > Watch for webhooks  
**Função**: Recebe os dados do formulário popup em tempo real

#### Configuração Detalhada:
1. **URL do Webhook**: `https://hook.us1.make.com/t8b8er7tynfc1gxx8y9ulf2z6gyaymcw`
2. **Método HTTP**: POST
3. **Content-Type**: application/json
4. **Estrutura de dados recebida**:
```json
{
  "telefone": "(24) 99999-9999",
  "timestamp": "2025-08-05T15:30:00.000Z",
  "fonte": "WhatsApp Popup",
  "url_origem": "https://form.pousadaleange.com.br/serra",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "utm_source": "facebook",
  "utm_medium": "cpc",
  "utm_campaign": "verao2025",
  "utm_term": "pousada serra",
  "utm_content": "banner-azul"
}
```

### **MÓDULO 2: Router (Opcional)**
**Tipo**: Router  
**Função**: Permite dividir o fluxo para diferentes ações (planilha + notificações)

### **MÓDULO 3: Google Sheets (Ação Principal)**
**Tipo**: Google Sheets > Add a row  
**Função**: Adiciona cada lead como nova linha na planilha

#### Configuração da Planilha:
**Nome**: "Leads WhatsApp Pousada Le Ange"  
**Aba**: "Leads"

**Estrutura das Colunas**:
| Coluna | Campo | Exemplo |
|--------|-------|---------|
| A | Telefone | (24) 99999-9999 |
| B | Data/Hora | 05/08/2025 15:30:00 |
| C | Fonte | WhatsApp Popup |
| D | Página de Origem | /serra |
| E | URL Completa | https://form.pousadaleange.com.br/serra |
| F | Navegador | Chrome 91.0 |
| G | UTM Source | facebook |
| H | UTM Medium | cpc |
| I | UTM Campaign | verao2025 |
| J | UTM Term | pousada serra |
| K | UTM Content | banner-azul |
| L | Status | Novo Lead |
| M | Observações | (vazio) |

#### Mapeamento dos Campos no Make:
- **A (Telefone)**: `{{1.telefone}}`
- **B (Data/Hora)**: `{{formatDate(1.timestamp; "DD/MM/YYYY HH:mm:ss"; "America/Sao_Paulo")}}`
- **C (Fonte)**: `{{1.fonte}}`
- **D (Página)**: `{{replace(1.url_origem; "https://form.pousadaleange.com.br"; "")}}`
- **E (URL Completa)**: `{{1.url_origem}}`
- **F (Navegador)**: `{{substring(1.user_agent; 1; 100)}}`
- **G (UTM Source)**: `{{1.utm_source}}`
- **H (UTM Medium)**: `{{1.utm_medium}}`
- **I (UTM Campaign)**: `{{1.utm_campaign}}`
- **J (UTM Term)**: `{{1.utm_term}}`
- **K (UTM Content)**: `{{1.utm_content}}`
- **L (Status)**: `Novo Lead`
- **M (Observações)**: `Lead capturado via popup automático`

### **MÓDULO 4: Slack/Discord (Notificação)**
**Tipo**: Slack > Send a message  
**Função**: Notifica equipe sobre novo lead em tempo real

#### Configuração da Mensagem:
```
🎯 *NOVO LEAD WHATSAPP*

📱 *Telefone:* {{1.telefone}}
⏰ *Data:* {{formatDate(1.timestamp; "DD/MM/YYYY HH:mm:ss")}}
🌐 *Origem:* {{1.url_origem}}
💻 *Dispositivo:* {{if(contains(1.user_agent; "Mobile"); "📱 Mobile"; "💻 Desktop")}}

---
*Ação necessária:* Entrar em contato em até 30 minutos
```

## 🚀 Tutorial Passo a Passo - Make

### **ETAPA 1: Preparando o Google Sheets**

1. **Criar Nova Planilha**:
   - Acesse https://sheets.google.com
   - Clique em "+" para nova planilha
   - Nomeie: "Leads WhatsApp Pousada Le Ange"

2. **Configurar Cabeçalhos** (linha 1):
   ```
   A1: Telefone
   B1: Data/Hora  
   C1: Fonte
   D1: Página
   E1: URL Completa
   F1: Navegador
   G1: UTM Source
   H1: UTM Medium
   I1: UTM Campaign
   J1: UTM Term
   K1: UTM Content
   L1: Status
   M1: Observações
   ```

3. **Formatação Básica**:
   - Selecione linha 1 e aplique negrito
   - Congele a primeira linha (Visualizar > Congelar > 1 linha)
   - Ajuste largura das colunas

### **ETAPA 2: Configurando o Make**

#### **2.1 - Criando o Cenário**
1. Acesse https://www.make.com e faça login
2. Clique em **"Create a new scenario"**
3. Nome do cenário: "WhatsApp Leads - Pousada Le Ange"

#### **2.2 - Adicionando o Webhook**
1. Clique no **"+"** para adicionar módulo
2. Na busca, digite **"Webhooks"**
3. Selecione **"Webhooks"** da lista
4. **IMPORTANTE**: Na lista que aparecer, escolha **"Watch for webhooks"** (NÃO escolha "Make a request")
5. Clique em **"Add"** para criar novo webhook
6. **COPIE A URL GERADA** - você precisará dela!
7. Clique em **"OK"**

> ⚠️ **ATENÇÃO**: Você deve escolher **"Watch for webhooks"** que serve para RECEBER dados, não "Make a request" que serve para ENVIAR dados.

#### **2.3 - Configurando Google Sheets**
1. Clique no **"+"** ao lado do webhook para adicionar novo módulo
2. Na busca, digite **"Google Sheets"**
3. Selecione **"Google Sheets"** da lista
4. **IMPORTANTE**: Escolha **"Add a row"** (adicionar linha)
5. **Conectar conta**: Clique em "Create a connection" e faça login no Google
6. **Selecionar planilha**: 
   - Spreadsheet: Escolha "Leads WhatsApp Pousada Le Ange"
   - Sheet: Selecione "Sheet1" (ou "Leads" se renomeou)

#### **2.4 - Mapeando os Campos**
Na seção "Values", você verá campos para cada coluna. Preencha assim:

**Para cada campo, clique no quadrado vazio e depois no número "1" que aparecerá:**

```
Row 1 (Telefone): 
- Clique no campo vazio
- Clique em "1" 
- Selecione "telefone"

Row 2 (Data/Hora): 
- Clique no campo vazio
- Clique em "Functions" 
- Selecione "formatDate"
- Date: Clique em "1" → "timestamp"
- Format: Digite "DD/MM/YYYY HH:mm:ss"
- Timezone: Digite "America/Sao_Paulo"
   
Row 3 (Fonte): 
- Clique no campo vazio
- Clique em "1"
- Selecione "fonte"

Row 4 (Página): 
- Clique no campo vazio
- Clique em "Functions"
- Selecione "replace"
- Text: Clique em "1" → "url_origem"
- Search for: Digite "https://form.pousadaleange.com.br"
- Replace with: Deixe vazio
   
Row 5 (URL Completa): 
- Clique no campo vazio
- Clique em "1"
- Selecione "url_origem"

Row 6 (Navegador): 
- Clique no campo vazio
- Clique em "1"
- Selecione "user_agent"

Row 7 (UTM Source): 
- Clique no campo vazio
- Clique em "1"
- Selecione "utm_source"

Row 8 (UTM Medium): 
- Clique no campo vazio
- Clique em "1"
- Selecione "utm_medium"

Row 9 (UTM Campaign): 
- Clique no campo vazio
- Clique em "1"
- Selecione "utm_campaign"

Row 10 (UTM Term): 
- Clique no campo vazio
- Clique em "1"
- Selecione "utm_term"

Row 11 (UTM Content): 
- Clique no campo vazio
- Clique em "1"
- Selecione "utm_content"

Row 12 (Status): 
- Digite manualmente: "Novo Lead"

Row 13 (Observações): 
- Digite manualmente: "Lead via popup automático"
```

### **ETAPA 3: Testando o Sistema**

#### **3.1 - Ativando o Cenário**
1. Clique no botão **"ON"** no canto inferior esquerdo
2. O cenário ficará ativo e aguardando dados
3. Você verá "Waiting for data" no webhook

#### **3.2 - Teste Manual**
1. Vá no seu site
2. **Para testar UTMs**, acesse uma URL com parâmetros de teste:
   ```
   https://form.pousadaleange.com.br/serra?utm_source=facebook&utm_medium=cpc&utm_campaign=verao2025&utm_term=pousada%20serra&utm_content=banner-azul
   ```
3. Clique em qualquer botão do WhatsApp
4. Preencha o popup com um telefone de teste: `(24) 99999-9999`
5. Aceite os termos e clique em "Continuar"
6. Volte ao Make e veja se apareceu "1" no webhook
7. Verifique na planilha se os dados apareceram **com as UTMs corretas**

#### **3.3 - Testes de UTM**

**Teste 1 - Com UTMs (Facebook)**:
```
URL: https://form.pousadaleange.com.br?utm_source=facebook&utm_medium=cpc&utm_campaign=teste
Resultado esperado: UTM Source = "facebook"
```

**Teste 2 - Sem UTMs (Orgânico)**:
```
URL: https://form.pousadaleange.com.br/serra
Resultado esperado: UTM Source = "organico"
```

**Teste 3 - UTMs Completas**:
```
URL: https://form.pousadaleange.com.br?utm_source=google&utm_medium=cpc&utm_campaign=verao2025&utm_term=hotel%20teresopolis&utm_content=anuncio-responsivo
Resultado esperado: Todas as UTMs preenchidas
```

#### **3.3 - Verificação de Erros**
Se não funcionar, verifique:

**❌ Webhook não recebe dados:**
- Cenário está ativo? (botão ON)
- URL do webhook está correta no código?
- Console do navegador mostra erros?

**❌ Google Sheets não funciona:**
- Conta Google está conectada?
- Planilha existe e tem permissão?
- Nomes das colunas estão corretos?

**❌ Dados não formatam corretamente:**
- Fórmulas de data estão corretas?
- Timezone está como "America/Sao_Paulo"?
- Campos estão mapeados na ordem certa?

## 📊 Visualizando os Dados

Após alguns testes, sua planilha deve ficar assim:

| Telefone | Data/Hora | Fonte | Página | URL Completa | Navegador | UTM Source | UTM Medium | UTM Campaign | UTM Term | UTM Content | Status | Observações |
|----------|-----------|-------|--------|--------------|-----------|------------|------------|--------------|----------|-------------|--------|-------------|
| (24) 99999-9999 | 05/08/2025 15:30:00 | WhatsApp Popup | /serra | https://form.pou... | Mozilla/5.0... | facebook | cpc | verao2025 | pousada serra | banner-azul | Novo Lead | Lead via popup... |

## 🔧 Adicionando Notificações (Opcional)

### **Slack/Discord**
1. Adicione novo módulo após Google Sheets
2. Escolha "Slack" → "Send a message"
3. Configure o canal e mensagem
4. Use os mesmos dados do webhook (clique em "1")

### **Email**
1. Adicione módulo "Email" → "Send an email"  
2. Configure destinatário: comercial@pousadaleange.com.br
3. Assunto: "Novo Lead WhatsApp - {{1.telefone}}"
4. Corpo: Use template com dados do lead

## ⚠️ Troubleshooting Detalhado

### **Problema: "Não consigo encontrar Webhooks"**
**Solução**: 
- Digite exatamente "Webhooks" na busca
- Procure pelo ícone de um gancho (hook)
- Se não aparecer, tente "HTTP" e depois "Watch for webhooks"

### **Problema: "Google Sheets não conecta"**
**Solução**:
- Verifique se tem conta Google ativa
- Tente desconectar e reconectar
- Certifique-se que a planilha está na mesma conta

### **Problema: "Dados chegam mas formatação está errada"**
**Solução**:
- Reconfigure o formatDate com timezone correto
- Verifique se os campos estão na ordem certa
- Teste com dados simples primeiro
- **A (Telefone)**: `{{1.telefone}}`
- **B (Data/Hora)**: `{{formatDate(1.timestamp; "DD/MM/YYYY HH:mm:ss")}}`
- **C (Fonte)**: `{{1.fonte}}`
- **D (URL Origem)**: `{{1.url_origem}}`
- **E (Navegador)**: `{{1.user_agent}}`
- **F (Status)**: `Novo Lead`

### 3. **Notificação Slack/Email (Opcional)**
- **Módulo**: Slack > Send a message OU Email > Send an email
- **Configuração**:
  - **Canal**: #leads-whatsapp
  - **Mensagem**: 
```
🎯 Novo Lead WhatsApp!
📱 Telefone: {{1.telefone}}
⏰ Data: {{formatDate(1.timestamp; "DD/MM/YYYY HH:mm:ss")}}
🌐 Origem: {{1.url_origem}}
```

## 🚀 Passos para Configuração

### Passo 1: Criar Cenário no Make
1. Acesse https://www.make.com
2. Crie um novo cenário
3. Adicione o módulo "HTTP > Watch for webhooks"
4. Copie a URL do webhook gerada

### Passo 2: Configurar Google Sheets
1. Crie uma nova planilha Google Sheets
2. Nomeie como "Leads WhatsApp Pousada Le Ange"
3. Adicione os cabeçalhos na primeira linha:
   - A1: "Telefone"
   - B1: "Data/Hora"
   - C1: "Fonte"
   - D1: "URL Origem"
   - E1: "Navegador"
   - F1: "Status"

### Passo 3: Conectar Módulos
1. Adicione módulo "Google Sheets > Add a row"
2. Conecte sua conta Google
3. Selecione a planilha criada
4. Mapeie os campos conforme indicado acima

### Passo 4: Testar
1. Ative o cenário
2. Faça um teste no site clicando em um botão WhatsApp
3. Preencha o popup com um telefone de teste
4. Verifique se os dados chegaram na planilha

## 📊 Estrutura de Dados Recebidos

```json
{
  "telefone": "(24) 99999-9999",
  "timestamp": "2025-08-05T15:30:00.000Z",
  "fonte": "WhatsApp Popup",
  "url_origem": "https://form.pousadaleange.com.br/serra",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "utm_source": "facebook",
  "utm_medium": "cpc", 
  "utm_campaign": "verao2025",
  "utm_term": "pousada serra",
  "utm_content": "banner-azul"
}
```

### **📈 UTM Parameters**

**UTM Source (utm_source)**:
- `organico` - Tráfego direto/orgânico (padrão quando não há UTMs)
- `google` - Google Ads
- `facebook` - Facebook Ads
- `instagram` - Instagram Ads
- `email` - E-mail marketing
- `whatsapp` - WhatsApp Business

**UTM Medium (utm_medium)**:
- `cpc` - Cost Per Click (pago)
- `social` - Redes sociais orgânicas
- `email` - E-mail
- `referral` - Sites parceiros
- `organic` - Busca orgânica

**UTM Campaign (utm_campaign)**:
- `verao2025` - Campanha de verão
- `feriado-prolongado` - Feriados
- `promocao-antecipada` - Promoções
- `retargeting` - Remarketing

**UTM Term (utm_term)**:
- Palavras-chave específicas do Google Ads
- Ex: `pousada serra`, `hotel teresopolis`, `fim de semana romantico`

**UTM Content (utm_content)**:
- Versões de anúncios/criativos
- Ex: `banner-azul`, `video-drone`, `carrossel-quartos`

## 🔧 Configurações Avançadas

### **Filtros e Condições**

#### **Filtro por Horário Comercial**:
1. Adicione filtro entre webhook e Google Sheets
2. Condição: `{{formatDate(now; "H")}} >= 8 AND {{formatDate(now; "H")}} <= 18`
3. Para leads fora do horário: direcione para email ou notificação especial

#### **Prevenção de Duplicatas**:
1. Adicione módulo Google Sheets > Search rows
2. Busque por telefone igual ao recebido
3. Se encontrar: pare o cenário ou marque como "Lead Repetido"

#### **Segmentação por Página**:
- Serra: leads da página `/serra`
- Mar: leads da página `/mar`  
- Pacotes: leads da página `/pacotes`
- Home: leads da página principal

### **Notificações Inteligentes**

#### **WhatsApp Business API** (Avançado):
```
Módulo: HTTP > Make a request
URL: https://graph.facebook.com/v17.0/{phone-number-id}/messages
Método: POST
Headers: 
  Authorization: Bearer {access-token}
  Content-Type: application/json
Body:
{
  "messaging_product": "whatsapp",
  "to": "{{replace(1.telefone; regex; numbers-only)}}",
  "type": "template",
  "template": {
    "name": "welcome_lead",
    "language": { "code": "pt_BR" }
  }
}
```

#### **Email Automático**:
```
Para: comercial@pousadaleange.com.br
Assunto: 🎯 Novo Lead WhatsApp - {{1.telefone}}
Corpo:
Olá equipe!

Novo lead capturado:
📱 Telefone: {{1.telefone}}
⏰ Horário: {{formatDate(1.timestamp; "DD/MM/YYYY HH:mm:ss")}}
🌐 Página: {{1.url_origem}}
📈 UTM Source: {{1.utm_source}}
🎯 Campanha: {{1.utm_campaign}}

Ação: Entrar em contato em até 30 minutos.

---
Sistema automático - Pousada Le Ange
```

## � Dashboard e Relatórios

### **Métricas Importantes**:
1. **Total de leads por dia/semana/mês**
2. **Taxa de conversão por página**
3. **Horários de maior captação**
4. **Origem dos leads (Serra vs Mar vs Pacotes)**
5. **Performance por UTM Source**
6. **ROI por UTM Campaign**
7. **Tempo médio de resposta**

### **Fórmulas Google Sheets**:

#### **Contadores por Período**:
```
=COUNTIFS(B:B;">="&TODAY()-7;B:B;"<="&TODAY()) // Leads últimos 7 dias
=COUNTIFS(D:D;"*serra*") // Leads da página Serra
=COUNTIFS(G:G;"facebook") // Leads do Facebook
=COUNTIFS(G:G;"organico") // Tráfego orgânico
=COUNTIFS(I:I;"verao2025") // Campanha específica
=COUNTIFS(L:L;"Novo Lead") // Leads não contatados
```

#### **Análise de UTMs**:
```
// Top 5 UTM Sources
=QUERY(G:G;"SELECT G, COUNT(G) WHERE G IS NOT NULL GROUP BY G ORDER BY COUNT(G) DESC LIMIT 5")

// Performance por campanha
=QUERY(I:I;"SELECT I, COUNT(I) WHERE I IS NOT NULL GROUP BY I ORDER BY COUNT(I) DESC")

// ROI por fonte (se tiver dados de custo)
=SUMIFS(CustoAds, FonteAds, "facebook") / COUNTIFS(G:G;"facebook")
```

#### **Gráficos Recomendados**:
- Leads por dia (gráfico de linha)
- Leads por página de origem (gráfico de pizza)  
- Leads por UTM Source (gráfico de barras)
- Performance de campanhas (gráfico de barras)
- Leads por horário (gráfico de barras)
- Comparativo orgânico vs pago (gráfico de pizza)

## 🎯 URLs de Webhook

### **Produção (Atual)**:
```
https://hook.us1.make.com/t8b8er7tynfc1gxx8y9ulf2z6gyaymcw
```

### **Como Gerar Nova URL**:
1. No Make, vá em Webhooks > Watch for webhooks
2. Clique em "Add" 
3. Copie a nova URL
4. Atualize no código do popup (arquivo WhatsAppPopup.jsx)

## 🔍 Troubleshooting Completo

### **❌ Problema: "Dados não chegam na planilha"**
**Diagnóstico**:
1. Verifique se o cenário está ATIVO (botão ON)
2. Teste a URL do webhook diretamente:
   ```bash
   curl -X POST https://hook.us1.make.com/t8b8er7tynfc1gxx8y9ulf2z6gyaymcw \
   -H "Content-Type: application/json" \  
   -d '{"telefone":"(24) 99999-9999","fonte":"teste","utm_source":"organico"}'
   ```
3. Verifique logs do cenário em "History"

**Soluções**:
- Reative o cenário
- Verifique conexão Google Sheets
- Confirme permissões da planilha

### **❌ Problema: "Formatação incorreta dos dados"**
**Sintomas**: Data aparece como número, telefone sem formato
**Soluções**:
- Verifique fórmulas de formatação
- Confirme timezone (America/Sao_Paulo)
- Teste mapeamento dos campos

### **❌ Problema: "Muitas duplicatas"**
**Implementar**:
1. Filtro por timestamp (últimos 5 minutos)
2. Busca por telefone existente
3. Cookie de controle no frontend

### **❌ Problema: "Webhook não responde"**
**Verificar**:
- Status do Make (status.make.com)
- Limite de operações atingido
- Erro na estrutura JSON enviada

## 🔒 Segurança e Privacidade

### **Proteção de Dados**:
- Webhook URL deve ser mantida privada
- Implementar rate limiting (máximo 10 requests/minuto por IP)
- Logs de auditoria ativados
- Backup automático da planilha

### **LGPD Compliance**:
- Consentimento explícito capturado ✅
- Política de privacidade linkada ✅  
- Direito ao esquecimento (deletar dados)
- Relatório de dados pessoais coletados

## 💡 Próximos Passos

1. **Implementar CRM**: Integração com RD Station, HubSpot
2. **Score de Leads**: Classificação automática por comportamento
3. **Follow-up Automático**: Sequência de emails/WhatsApp
4. **A/B Testing**: Diferentes versões do popup
5. **Analytics**: Google Analytics events tracking

## 📞 Suporte

Para dúvidas técnicas:
- Email: dev@pousadaleange.com.br
- WhatsApp: +55 (21) 99999-9999
- Documentação Make: https://www.make.com/en/help
