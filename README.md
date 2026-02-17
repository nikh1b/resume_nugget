# AI Resume Builder

![Vercel Deployment](https://therealsujitk-vercel-badge.vercel.app/?app=ai-resume-builder)

An intelligent, AI-powered resume builder designed to help you create ATS-optimized resumes with ease. Powered by **Minimax** and **NVIDIA NIM**, this project leverages advanced AI to assist in drafting, scoring, and refining your resume.

## 🚀 Features

- **AI-Powered Resume Generation**: Create professional resumes from scratch using AI assistance.
- **ATS Simulator**: Test your resume against an Applicant Tracking System simulator to ensure parseability.
- **Real-time Preview**: See changes instantly as you edit your resume.
- **Multiple Templates**: Choose from a variety of professional templates (Ivy, Tech, etc.) to suit your style.
- **AI Scoring**: Get instant feedback and a score on your resume quality.
- **PDF Export**: Download your resume as a high-quality PDF.
- **Interview Prep**: AI-driven mock interview questions based on your resume content.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Prisma](https://www.prisma.io/))
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **AI Provider**: Minimax / NVIDIA NIM

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-resume-builder.git
    cd ai-resume-builder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory based on `.env.example`.
    ```bash
    cp .env.example .env
    ```
    Fill in the required environment variables:
    ```env
    # Database
    DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public"

    # Auth
    AUTH_SECRET="your-auth-secret"

    # AI Provider (NVIDIA NIM / Minimax)
    NVIDIA_API_KEY="your-nvidia-api-key"
    NVIDIA_BASE_URL="https://integrate.api.nvidia.com/v1"
    NVIDIA_MODEL="minimaxai/minimax-m2.1"
     
    # Optional Legacy Providers
    GOOGLE_GENERATIVE_AI_API_KEY=""
    OPENAI_API_KEY=""
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

**Live Demo:** [https://resume-nugget.vercel.app/](https://resume-nugget.vercel.app/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
