### Prerequisites

- Node.js 14.x or later
- npm/yarn
- MongoDB instance (local or cloud-based)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nextjs-react-tailwind-prisma-mongodb-nextauth-boilerplate.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nextjs-react-tailwind-prisma-mongodb-nextauth-boilerplate
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

4. Configure your environment variables:

   - Copy `.env.example` to `.env` and fill in your database URL and authentication provider details.

5. Migrate scheme to DB `npx prisma db push` for MingoDB or `npx prisma migrate dev` for MySQL.

6. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

For detailed instructions on how to use each component of this stack, please refer to the following documentation:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [NextAuth Documentation](https://next-auth.js.org/)
