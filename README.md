# OmniMED v3 - Aplicação Clínica de Suporte para Medicina de Emergência

## Descrição

OmniMED é uma aplicação web progressiva (PWA) desenvolvida para profissionais de saúde, especialmente para médicos e paramédicos em situações de emergência. A aplicação fornece cálculos automáticos de doses de medicamentos (principalmente para sedação em intubação orotraqueal) baseado no peso do paciente, com recomendações clínicas e ajustes para diferentes cenários clínicos.

## Características Principais

- **Calculadora de Doses IOT**: Cálculos automáticos de doses de medicamentos para intubação orotraqueal
- **Tema Adaptável**: Modo claro e escuro para conforto visual em diferentes ambientes
- **Design Responsivo**: Interface otimizada para desktop, tablet e dispositivos móveis
- **Baseado em Evidências**: Protocolos fundamentados em diretrizes clínicas reconhecidas
- **Offline-First**: Funciona completamente offline após primeira carga
- **Segurança**: Sem armazenamento de dados sensíveis do paciente

## Tecnologia

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Design**: Sistema de design com tokens de cor e tipografia
- **Compatibilidade**: Navegadores modernos (Chrome, Firefox, Safari, Edge)
- **Performance**: Otimizado para carregamento rápido e execução eficiente

## Medicamentos Suportados

### Pré-medicação
- **Fentanil**: 3 mcg/kg (ou ajustes conforme contexto clínico)

### Indução/Sedação
- **Etomidato**: 0.3 mg/kg (0.15 mg/kg em casos de choque)
- **Cetamina**: 1-2 mg/kg (1 mg/kg em casos de choque)
- **Rocurônio**: Documentado com indicações clínicas específicas

## Instalação e Configuração para Produção

### Pré-requisitos
- Servidor web moderno (Nginx, Apache, ou qualquer servidor HTTP)
- Suporte a HTTPS (obrigatório para PWA)
- Navegadores modernos

### Deploy

1. **Clone o repositório**:
```bash
git clone https://github.com/phorde/OmniMED-v3.git
cd OmniMED-v3
```

2. **Configure o servidor web**:
   - Configure HTTPS com certificado válido
   - Configure cache headers para assets estáticos
   - Configure compressão gzip

3. **Ambiente de Produção**:
   - Use as variáveis em `config.production.js`
   - Minifique CSS e JavaScript
   - Implemente logging de erros

### Exemplo de Configuração Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name omnimed.example.com;

    ssl_certificate /etc/ssl/certs/omnimed.crt;
    ssl_certificate_key /etc/ssl/private/omnimed.key;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        root /var/www/omnimed;
        try_files $uri /index.html;
        add_header Cache-Control "public, max-age=86400";
    }

    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg)$ {
        root /var/www/omnimed;
        add_header Cache-Control "public, max-age=604800";
    }
}
```

## Uso

1. **Acesse a aplicação** via navegador web
2. **Insira o peso do paciente** em quilogramas
3. **Selecione o contexto clínico** (ex: choque, HIC, trauma)
4. **Visualize as doses recomendadas** para cada medicamento
5. **Consulte as notas clínicas** para cada fármaco

## Conformidade e Segurança

- ✓ Proteção XSS implementada
- ✓ Sem armazenamento de dados sensíveis
- ✓ HTTPS obrigatório em produção
- ✓ Content Security Policy configurada
- ✓ Validação de entrada de dados

## Performance

- Tempo de carregamento < 2s
- Tamanho inicial < 50KB gzipado
- Score Lighthouse > 90
- Funciona com conexão 3G

## Suporte e Contribuição

- Para relatar bugs: Abra uma issue no GitHub
- Para contribuir: Faça um fork e envie um pull request
- Documentação técnica: Consulte DEVELOPMENT.md

## Licença

MIT License - Veja LICENSE para detalhes

## Aviso Legal

Esta aplicação é fornecida como ferramenta de referência. Todo cálculo de dose deve ser verificado por profissional qualificado. O desenvolvedor não se responsabiliza por erros de medicação resultantes do uso desta aplicação.

## Contato

- GitHub: [@phorde](https://github.com/phorde)
- Issues: [OmniMED-v3 Issues](https://github.com/phorde/OmniMED-v3/issues)

---

**Versão**: 3.0.0  
**Última atualização**: Novembro 2025  
**Status**: Production Ready
