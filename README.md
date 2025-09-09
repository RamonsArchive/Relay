# Relay - Modern E-commerce Platform

Relay is a full-stack e-commerce platform built with modern web technologies, featuring a hybrid database architecture with Sanity CMS for content management and MySQL for transactional data.

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest UI library with hooks and context
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Styled Components** - CSS-in-JS styling

### Backend & Database
- **Sanity CMS** - Headless CMS for product catalog, reviews, and content
- **MySQL** - Relational database hosted on Oracle Cloud
- **Prisma ORM** - Type-safe database toolkit and ORM
- **Hybrid Architecture** - Syncing between Sanity and MySQL for optimal performance

### Authentication & Security
- **Auth.js (NextAuth) v5** - Authentication with Google OAuth
- **Rate Limiting** - Upstash Redis for API protection
- **Input Sanitization** - Security measures for user inputs
- **Middleware** - Route protection and authentication

### Payments & Commerce
- **Stripe** - Payment processing with tax calculations
- **EasyPost** - Shipping and logistics API
- **Google Maps API** - Geocoding for tax calculations
- **Advanced Promo System** - Flexible discount rules and usage tracking

### Infrastructure & Monitoring
- **Vercel** - Deployment and hosting
- **Oracle Cloud** - Virtual machine for MySQL database
- **Upstash Redis** - Rate limiting and caching
- **Sentry** - Error tracking and monitoring
- **Resend** - Transactional email service

## 🏗️ Architecture Overview

### Hybrid Database Strategy
Relay uses a sophisticated dual-database approach:

- **Sanity CMS**: Stores product information, categories, brands, reviews, and media assets
- **MySQL (Oracle Cloud)**: Handles transactional data like orders, carts, user sessions, and payment records
- **Sync Layer**: Custom synchronization between systems for data consistency

### Key Features

#### Product Management
- Dynamic product pages with image galleries
- Advanced variant support (colors, sizes) with inventory tracking
- Real-time inventory synchronization between Sanity and MySQL
- Product reviews and ratings system
- Recently viewed products
- Advanced product filtering and search

#### Shopping Experience
- Persistent cart management with guest and authenticated users
- Advanced promo code system with usage limits and constraints
- Real-time tax calculation based on location
- Multiple shipping options via EasyPost integration
- Mobile-responsive design with modern UI/UX
- Wishlist/favorites functionality

#### Order Management
- Complete order lifecycle tracking
- Stripe integration for secure payments
- Automated email notifications via Resend
- Refund processing and tracking
- Order history and detailed tracking
- Shipping label generation

#### User Features
- Google OAuth authentication
- Comprehensive user profile management
- Multiple shipping addresses
- Personalized recommendations
- Review system with flagging
- Rate-limited API access

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+
- MySQL database
- Sanity account
- Stripe account
- Google Cloud Console (for OAuth and Maps API)

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Environment
NODE_ENV="development"
EASYPOST_TEST_MODE="true"

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_WRITE_TOKEN="your_write_token"
SANITY_WEBHOOK_SECRET="your_webhook_secret"

# Authentication
AUTH_SECRET="your_auth_secret"
AUTH_GOOGLE_ID="your_google_oauth_id"
AUTH_GOOGLE_SECRET="your_google_oauth_secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_URL_INTERNAL="http://localhost:3000"

# Database
DATABASE_URL="mysql://user:password@host:port/database"

# Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL="your_redis_url"
UPSTASH_REDIS_REST_TOKEN="your_redis_token"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_public_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_webhook_secret"

# Shipping
EASYPOST_API_KEY="your_easypost_key"
EASYPOST_TRACKER_WEBHOOK_SECRET="your_tracker_secret"

# External APIs
GOOGLE_MAPS_API_KEY="your_google_maps_key"
RESEND_API_KEY="your_resend_key"

# URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
APP_URL="http://localhost:3000"

# Monitoring
SENTRY_AUTH_TOKEN="your_sentry_token"
```

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ecommercesite
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

4. **Configure Sanity**
```bash
npm run typegen
```

5. **Run the development server**
```bash
npm run dev
```

## 📁 Project Structure

```
ecommercesite/
├── app/                           # Next.js 15 App Router
│   ├── (src)/                    # Main application routes
│   │   ├── (auth)/              # Authentication pages
│   │   ├── (pages)/             # Main content pages
│   │   │   ├── cart/           # Shopping cart
│   │   │   ├── collections/    # Product collections
│   │   │   ├── gender/         # Gender-based routing
│   │   │   │   └── [gender]/   # Dynamic gender pages
│   │   │   ├── kids/           # Kids section
│   │   │   ├── product/        # Product pages
│   │   │   └── writeReview/    # Review submission
│   │   ├── layout.tsx          # Main layout
│   │   ├── loading.tsx         # Loading UI
│   │   ├── page.tsx           # Homepage
│   │   └── sale/              # Sale pages
│   ├── about/                  # About page
│   ├── api/                    # API routes
│   ├── checkout/               # Checkout flow
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── page.tsx
│   │   └── return/            # Post-checkout handling
│   ├── context/                # React contexts
│   ├── fonts/                  # Custom fonts
│   ├── orders/                 # Order management
│   ├── privacy/                # Privacy policy
│   ├── sentry-example-page/    # Sentry integration
│   ├── studio/                 # Sanity Studio
│   ├── terms/                  # Terms of service
│   ├── favicon.ico
│   ├── global-error.tsx        # Global error boundary
│   ├── globals.css             # Global styles
│   └── layout.tsx              # Root layout
├── components/                 # Reusable React components
├── lib/                        # Utility functions and configurations
├── prisma/                     # Database schema and migrations
├── public/                     # Static assets
├── sanity/                     # Sanity CMS configuration
├── types/                      # TypeScript type definitions
├── upstash/                    # Redis configuration
├── auth.ts                     # Authentication configuration
├── components.json             # Shadcn/ui configuration
├── globalTypes.ts              # Global TypeScript types
├── instrumentation.ts          # Performance monitoring
├── middleware.ts               # Next.js middleware
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── sanity.config.ts            # Sanity configuration
├── sanity.types.ts             # Generated Sanity types
├── schema.json                 # Sanity schema
├── sentry.*.config.ts          # Sentry configurations
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🔄 Data Flow

### Product Display Flow
1. **Sanity Query** → Fetch product data, images, and reviews
2. **MySQL Sync** → Get real-time inventory from Variant table
3. **User Context** → Check authentication and preferences
4. **Cart Integration** → Get user's cart and wishlist data
5. **Render** → Combine data for optimal user experience

### Checkout Flow
1. **Cart Validation** → Verify inventory and pricing from both databases
2. **Promo Code Application** → Validate and apply discounts
3. **Address Validation** → Verify shipping address
4. **Tax Calculation** → Use Google Maps + Stripe Tax API
5. **Payment Processing** → Stripe Checkout Session
6. **Order Creation** → Store in MySQL with Prisma
7. **Inventory Update** → Update stock quantities
8. **Fulfillment** → EasyPost shipping integration
9. **Notifications** → Resend email confirmations

### Review System
1. **Submission** → User submits review via server action
2. **Validation** → Rate limiting and content moderation
3. **Storage** → Store in Sanity with user reference
4. **Auto-flagging** → AI-powered content filtering
5. **Display** → Real-time updates with optimistic UI

## 🗄️ Database Schema

### MySQL Tables (Prisma)
- **User** - User accounts with Google OAuth integration
- **Cart/CartItem** - Shopping cart with promo code support
- **Order/OrderItem** - Complete order tracking with snapshots
- **Product/Variant** - Synced product data with inventory
- **Address** - User shipping addresses
- **PromoCode/PromoCodeUsage** - Advanced promotion system
- **CheckoutSession** - Stripe checkout tracking
- **SanitySync** - Webhook synchronization logs

### Sanity Schemas
- **Product** - Main product information with variants
- **Reviews** - User reviews and ratings
- **Categories/Collections** - Product organization
- **Colors/Materials/Brands** - Product attributes

## 🔐 Security Features

- **Rate Limiting**: Upstash Redis prevents API abuse
- **Input Sanitization**: All user inputs are validated and sanitized
- **Authentication**: Secure OAuth with session management
- **CSRF Protection**: Built-in Next.js security measures
- **Environment Isolation**: Separate test/production configurations
- **Webhook Security**: Signature verification for external webhooks

## 🚀 Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set up build commands:
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Development Command: `npm run dev`

### Database Setup (Oracle Cloud)
1. Create MySQL instance on Oracle Cloud
2. Configure networking and security groups
3. Update connection strings in environment variables
4. Run Prisma migrations: `npx prisma db push`

## 📈 Performance Optimizations

- **Image Optimization**: Next.js Image component with Sanity CDN
- **Caching**: Strategic use of React Suspense and data fetching
- **Code Splitting**: Automatic chunking with Next.js 15
- **Database Indexing**: Optimized queries with Prisma
- **CDN**: Sanity's global CDN for media assets
- **Hybrid Data Strategy**: Optimal data fetching from both databases

## 🧪 Testing & Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Generate Prisma client
npx prisma generate

# Database studio
npx prisma studio

# Sanity type generation
npm run typegen

# Linting
npm run lint
```

## 📊 Monitoring & Analytics

- **Sentry**: Error tracking and performance monitoring
- **Stripe Dashboard**: Payment and revenue analytics
- **Sanity Studio**: Content management and usage metrics
- **Vercel Analytics**: Web vitals and deployment metrics
- **Upstash Console**: Redis usage and rate limiting stats

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typegen` - Generate Sanity types
- `npm run postinstall` - Generate Prisma client

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Review environment variable setup
- Verify database connections
- Check API key configurations
- Ensure Sanity and MySQL are properly synced

---

Built with ❤️ using modern web technologies for optimal performance and user experience.