# 🚀 OmniMED v3 - Guia Rápido de Deploy

## VERÕES DISPONÍVEIS

1. **Opção 1: Vercel (MAIS RÁPIDO - 5 minutos)** ⚡
2. **Opção 2: GitHub Pages (GRÁTIS - 10 minutos)** 💰
3. **OpÇÃO 3: Servidor Próprio com Nginx (PRODUCTION - 30 minutos)** 🏢
4. **OpÇÃO 4: Docker + Compose (CONTAINERIZADO - 20 minutos)** 🐳

---

## ⚡ OPÇÃO 1: VERCEL (RECOMENDADO PARA INÍCIO)

### Passos Rápidos

**1. Acesse Vercel**
```
https://vercel.com
```

**2. Sign up com GitHub**
- Clique em "Sign up"
- Escolha "Continue with GitHub"
- Autorize Vercel

**3. Importe o Projeto**
```
- Clique em "New Project"
- Selecione "phorde/OmniMED-v3"
- Clique em "Import"
```

**4. Configurar Deployment**
```
- Framework: "Other" (Static Site)
- Build Command: deixe em branco (ou: echo 'No build needed')
- Output Directory: .
- Install Command: deixe em branco
```

**5. Deploy**
```
- Clique em "Deploy"
- Espere 2-3 minutos
- Seu site está no ar!
```

**URL gerada:** `https://omnimed-v3.vercel.app` (automaticamente)

### Vantagens
- ✅ SSL/HTTPS automático
- ✅ CDN global
- ✅ 100% grátis para estatíco
- ✅ Deploy automático a cada push no GitHub
- ✅ Analytics integrado

---

## 💰 OPÇÃO 2: GITHUB PAGES (GRÁTIS)

### Passos

**1. Ative GitHub Pages no Repositório**
```bash
# No seu repositório GitHub
Settings > Pages > Source
Selecione: "Deploy from a branch"
Branch: main
Folder: / (root)
```

**2. Espere Deploy Automático**
```
- GitHub automaticamente faz build
- Espere 2-3 minutos
```

**3. Acesse sua Página**
```
https://phorde.github.io/OmniMED-v3
```

### Vantagens
- ✅ Totalmente grátis
- ✅ URL personalizado com dominio próprio (opcional)
- ✅ Integrado com GitHub
- ✅ SSL/HTTPS automático

### Desvantagens
- ❌ Sem binário do Node.js
- ❌ Sem variáveis de ambiente
- ❌ Apenas conteudo estático

---

## 🏢 OPÇÃO 3: SERVIDOR LINUX COM NGINX (PRODUCTION)

### Setup em 30 Minutos

**Pré-requisitos:**
- Servidor Linux (VPS, AWS, DigitalOcean, Linode)
- SSH access
- Dominio (opcional, mas recomendado)

### Passo 1: SSH no Servidor
```bash
ssh root@seu-ip-ou-dominio
```

### Passo 2: Atualizar Sistema
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx curl wget git -y
```

### Passo 3: Clonar Repositório
```bash
cd /var/www
sudo git clone https://github.com/phorde/OmniMED-v3.git omnimed
cd omnimed
sudo chown -R www-data:www-data .
sudo chmod 755 .
```

### Passo 4: Configurar Nginx
```bash
sudo nano /etc/nginx/sites-available/omnimed
```

Cole este conteúdo:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name seu-dominio.com www.seu-dominio.com;

    root /var/www/omnimed;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

### Passo 5: Ativar Site
```bash
sudo ln -s /etc/nginx/sites-available/omnimed /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Passo 6: Verificar
```bash
curl http://seu-dominio.com
```

### Passo 7: SSL/HTTPS com Certbot (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot certonly --nginx -d seu-dominio.com -d www.seu-dominio.com
```

Atualizar Nginx com SSL:
```bash
sudo nano /etc/nginx/sites-available/omnimed
```

Adicionar após `listen [::]:80;`:
```nginx
listen 443 ssl http2;
listen [::]:443 ssl http2;

ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;

ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers HIGH:!aNULL:!MD5;
```

E adicionar redirecionação HTTP para HTTPS:
```bash
sudo systemctl reload nginx
```

---

## 🐳 OPÇÃO 4: DOCKER (PRODUCTION)

### Criar Dockerfile
```bash
# Na raiz do projeto
cat > Dockerfile << 'EOF'
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF
```

### Criar nginx.conf
```bash
cat > nginx.conf << 'EOF'
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg)$ {
        expires 7d;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
EOF
```

### Build e Run
```bash
# Build
docker build -t omnimed:latest .

# Run
docker run -p 80:80 omnimed:latest

# Acessar
curl http://localhost
```

### Usando Docker Compose
```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  omnimed:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - .:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
EOF
```

Executar:
```bash
docker-compose up -d
```

---

## 📋 CHECKLIST FINAL

Antes de colocar em produção:

- [ ] Dominio registrado (opcional mas recomendado)
- [ ] SSL/HTTPS configurado
- [ ] Testar em mobile (Chrome DevTools)
- [ ] Verificar modo offline (DevTools > Application > Service Worker)
- [ ] Testar em conexão 3G (DevTools > Network > Throttling)
- [ ] Verificar Lighthouse score (DevTools > Lighthouse)
- [ ] Testar todas as funcionalidades:
  - [ ] Cálculo de doses funciona
  - [ ] Toggle de tema funciona
  - [ ] Navegação entre seções funciona
- [ ] Verificar headers de segurança
- [ ] Monitorar performance
- [ ] Backup automático (se servidor próprio)

---

## 🎯 RECOMENDACAO FINAL

**Para Início Rápido:** Use **Vercel** (5 minutos, SSL automático, free tier)

**Para Produção Profissional:** Use **Servidor + Nginx** (30 minutos, controle total)

**Para Simplicidade Máxima:** Use **GitHub Pages** (10 minutos, totalmente grátis)

---

## 🆘 TROUBLESHOOTING

### "Vercel: Deploy failed"
```
✓ Verificar se .gitignore está correto
✓ Confirmar que index.html existe
✓ Verificar se não há erro no app.js
```

### "GitHub Pages: Página em branco"
```
✓ Verificar Settings > Pages > Source
✓ Verificar CNAME se usar domínio customizado
✓ Aguardar 5 minutos para build
```

### "Nginx: 404 Not Found"
```
✓ Verificar permissões: sudo chown -R www-data:www-data /var/www/omnimed
✓ Verificar nginx.conf: try_files $uri $uri/ /index.html;
✓ Restartar: sudo systemctl restart nginx
```

### "Docker: Container exits"
```
✓ Verificar logs: docker logs container-id
✓ Verificar port 80 disponível: sudo lsof -i :80
✓ Tentar: docker run -it --rm omnimed:latest
```

---

## 📚 PRÓXIMOS PASSOS

1. Escolher uma opção de deploy
2. Seguir passos acima
3. Compartilhar URL com profissionais de saúde
4. Coletar feedback
5. Iterar e melhorar

**Sua aplicação estará no ar em minutos!** 🌟

---

**Data**: Novembro 2025  
**Status**: Production Ready  
**Tempo médio de deployment**: 5-30 minutos (depende da opção)
