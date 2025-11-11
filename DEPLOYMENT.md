# OmniMED v3 - Guia de Deploy em Produção

## Índice

1. [Pré-requisitos](#pr%C3%A9-requisitos)
2. [Checklist de Segurança](#checklist-de-seguran%C3%A7a)
3. [Deploy Local](#deploy-local)
4. [Deploy em Servidor](#deploy-em-servidor)
5. [Configuração de SSL/HTTPS](#configura%C3%A7%C3%A3o-de-ssltls)
6. [Monitoramento e Logs](#monitoramento-e-logs)
7. [Troubleshooting](#troubleshooting)

## Pré-requisitos

### Sistema Operacional
- Linux (recomendado), macOS ou Windows com WSL2
- Acesso root ou sudo
- Espaço em disco: mínimo 1GB

### Software Obrigatório
- Nginx 1.18+ ou Apache 2.4+
- OpenSSL 1.1.1+
- Git 2.30+
- Node.js 14+ (opcional, se usar build pipeline)

### Certificados
- Certificado SSL/TLS válido (Let's Encrypt recomendado)
- Chave privada SSL

## Checklist de Segurança

### Antes do Deploy

- [ ] Verificar todas as variáveis de ambiente em `.env`
- [ ] Confirmar que `.env` está em `.gitignore`
- [ ] Revisar permissões de arquivo
- [ ] Ativar firewall e configurar regras
- [ ] Configurar certificado SSL/TLS
- [ ] Executar security audit do código
- [ ] Verificar Content Security Policy
- [ ] Testar HTTPS force redirect
- [ ] Configurar headers de segurança
- [ ] Executar testes de penetração básicos

### Após o Deploy

- [ ] Verificar que o site carrega
- [ ] Testar todas as funcionalidades
- [ ] Validar certificado SSL
- [ ] Confirmar compactação GZIP
- [ ] Testar modo offline
- [ ] Verificar logs de erro
- [ ] Fazer teste de desempenho
- [ ] Validar analytics (se ativado)

## Deploy Local

### 1. Clonar o Repositório

```bash
git clone https://github.com/phorde/OmniMED-v3.git
cd OmniMED-v3
```

### 2. Instalar Dependências

```bash
# Se houver package.json (para future implementations)
npm install
# ou
yarn install
```

### 3. Configurar Variáveis de Ambiente

```bash
cp .env.example .env
# Editar .env com valores reais
nano .env
```

### 4. Executar Localmente

```bash
# Usando Python
python3 -m http.server 8000

# Ou usando Node.js (se instalado)
node -e "require('http').createServer((q, s) => {
  const url = new URL(q.url, 'http://localhost');
  const path = '.' + (url.pathname === '/' ? '/index.html' : url.pathname);
  require('fs').readFile(path, (e, d) => {
    s.writeHead(e ? 404 : 200);
    s.end(e || d);
  });
}).listen(8000)"
```

## Deploy em Servidor

### 1. Preparar Servidor

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Nginx
sudo apt install nginx -y

# Instalar ferramentas essenciais
sudo apt install curl wget git -y
```

### 2. Clonar Repositório no Servidor

```bash
cd /var/www
sudo git clone https://github.com/phorde/OmniMED-v3.git omnimed
cd omnimed
sudo chown -R www-data:www-data .
```

### 3. Configurar Permissões

```bash
# Permissões de diretório
sudo chmod 755 /var/www/omnimed

# Permissões de arquivos
sudo chmod 644 /var/www/omnimed/*.js
sudo chmod 644 /var/www/omnimed/*.css
sudo chmod 644 /var/www/omnimed/*.html

# Arquivo .env (privado)
sudo chmod 600 /var/www/omnimed/.env
```

### 4. Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/omnimed
```

Adicione o conteúdo do arquivo de configuração (veja abaixo).

### 5. Habilitar Site

```bash
sudo ln -s /etc/nginx/sites-available/omnimed /etc/nginx/sites-enabled/
sudo nginx -t  # Testar configuração
sudo systemctl restart nginx
```

## Configuração de SSL/TLS

### Com Certbot (Recomendado)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obter certificado
sudo certbot certonly --nginx -d omnimed.example.com

# Renovar automaticamente
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Configuração Nginx com SSL

```nginx
server {
    listen 443 ssl http2;
    server_name omnimed.example.com;

    # Certificados SSL
    ssl_certificate /etc/letsencrypt/live/omnimed.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omnimed.example.com/privkey.pem;

    # Configuração SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Compressão
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    # Headers de Segurança
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # Raiz do site
    root /var/www/omnimed;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Redirecionar HTTP para HTTPS
server {
    listen 80;
    server_name omnimed.example.com;
    return 301 https://$server_name$request_uri;
}
```

## Monitoramento e Logs

### Acessar Logs

```bash
# Logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Ver erros recentes
sudo journalctl -u nginx -n 50 --no-pager
```

### Monitoramento de Performance

```bash
# Ver uso de recursos
free -h
df -h
ps aux | grep nginx

# Monitorar em tempo real
watch -n 1 'free -h && echo --- && df -h'
```

### Setup de Alertas

```bash
# Exemplo com monit
sudo apt install monit
# Configurar alertas para Nginx down, disk full, etc.
```

## Troubleshooting

### Site não carrega

```bash
# Verificar se Nginx está rodando
sudo systemctl status nginx

# Verificar erros de sintaxe
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### Erro 502 Bad Gateway

```bash
# Verificar permissões
ls -la /var/www/omnimed/

# Reconfigurar permissões
sudo chown -R www-data:www-data /var/www/omnimed
```

### HTTPS não funciona

```bash
# Verificar certificado
sudo certbot certificates

# Verificar porta 443
sudo netstat -tlnp | grep 443

# Firewall
sudo ufw allow 443/tcp
```

### Cache não funciona

```bash
# Limpar cache do navegador (Ctrl+Shift+Delete)
# Ou usar: curl -H "Cache-Control: no-cache" https://omnimed.example.com

# Verificar headers de cache
curl -I https://omnimed.example.com
```

## Rollback

Caso algo dê errado:

```bash
cd /var/www/omnimed

# Ver histórico
git log --oneline

# Reverter para versão anterior
git reset --hard <commit-hash>

# Ou usar tag
git checkout v3.0.0

# Reiniciar Nginx
sudo systemctl restart nginx
```

## Produção Checklist Final

- [ ] Certificado SSL válido
- [ ] HTTPS force redirect ativo
- [ ] Headers de segurança configurados
- [ ] Gzip compression ativa
- [ ] Cache estratégia implementada
- [ ] Logs configurados
- [ ] Monitoramento ativo
- [ ] Backup automático
- [ ] Plano de disaster recovery
- [ ] Contatos de suporte definidos

---

**Data de Atualização**: Novembro 2025  
**Versão**: 3.0.0  
**Status**: Production Ready
