cat > README.md <<EOF
# AI Background Remover

An AI-powered web application that automatically removes image backgrounds using ClipDrop API. Users can upload images, remove backgrounds instantly, download transparent images, and purchase credits using Razorpay.

## Live Demo
Frontend: https://bg-remover-frontend-sigma.vercel.app  
Backend: https://bg-remover-be.vercel.app  

## Features
- User authentication with Clerk
- Upload images for background removal
- AI-powered background removal using ClipDrop API
- Download transparent PNG images
- Credit-based usage system
- Razorpay payment integration
- Secure backend APIs
- Responsive UI with Tailwind CSS
- MongoDB transaction storage
- Deployed on Vercel

## Tech Stack
### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Third Party Services
- Clerk Authentication
- Razorpay Payment Gateway
- ClipDrop API
- Vercel Deployment

## Project Workflow
1. User signs up/login using Clerk  
2. Uploads image  
3. Image sent to backend  
4. ClipDrop API removes background  
5. User downloads processed image  
6. Credits deducted after usage  
7. Users can buy additional credits via Razorpay  

## Installation

### Clone Repository
\`\`\`bash
git clone <your-repo-link>
cd bg-remover
\`\`\`

### Frontend Setup
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

### Backend Setup
\`\`\`bash
cd server
npm install
npm run server
\`\`\`

## Environment Variables

Create a .env file inside server folder:

\`\`\`env
MONGODB_URI=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLIPDROP_API=
CURRENCY=INR
\`\`\`

Create a .env file inside client folder:

\`\`\`env
VITE_BACKEND_URL=
VITE_CLERK_PUBLISHABLE_KEY=
VITE_RAZORPAY_KEY_ID=
\`\`\`

## Challenges Faced
- Razorpay payment verification issues
- Credit synchronization after successful payments
- Vercel deployment case-sensitive import issues
- Handling large image rendering on result page

## Future Improvements
- Image history dashboard
- Multiple image formats support
- Faster AI processing
- Admin analytics panel

## Author
Sandeep Jha
EOF