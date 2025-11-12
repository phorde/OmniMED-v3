#!/bin/bash

# OmniMED v3 - Next.js Setup Script
# This script automates the remaining setup for Next.js migration

set -e

echo "=================================="
echo "OmniMED v3 - Next.js Setup"
echo "=================================="
echo ""

# Step 1: Install dependencies
echo "[Step 1] Installing dependencies..."
npm install

# Step 2: Install shadcn/ui
echo "[Step 2] Setting up Shadcn/UI..."
npx shadcn-ui@latest init -d << EOF
no
yes
yes
no
EOF

# Step 3: Add Shadcn/ui components
echo "[Step 3] Adding Shadcn/UI components..."
for component in button card input badge checkbox select tabs dialog label; do
  npx shadcn-ui@latest add $component -y
done

# Step 4: Build the project
echo "[Step 4] Building Next.js project..."
npm run build

# Step 5: Run tests
echo "[Step 5] Running development server for verification..."
echo "The application should be running at http://localhost:3000"
echo "Press Ctrl+C to stop"

# Step 6: Success message
echo ""
echo "=================================="
echo "✅ Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. npm run dev - Start development server"
echo "2. Visit http://localhost:3000"
echo "3. Test all features"
echo "4. Deploy to Vercel when ready"
echo ""
echo "For deployment:"
echo "1. Push to GitHub"
echo "2. Connect to Vercel dashboard"
echo "3. Deploy automatically"
echo ""
echo "Documentation: See NEXTJS_SETUP_COMPLETE.md"
echo "="*"
