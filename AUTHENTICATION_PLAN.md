# BetterAuth Implementation Plan for Doneyt

## 📋 Overview

This document outlines the complete plan for implementing BetterAuth authentication in the Doneyt donation system.

---

## 🎯 Authentication Requirements

### Core Features Needed

1. **User Registration & Login**

   - Email/Password authentication
   - Social OAuth (Google - as shown in profile page)
   - Optional: GitHub OAuth

2. **User Profile Management**

   - User profile data (name, email, profile picture)
   - Update profile information
   - Change email functionality
   - Profile photo upload

3. **Session Management**

   - Secure session handling
   - Remember me functionality
   - Logout capability

4. **Protected Routes**

   - Profile page (requires authentication)
   - Donations page (requires authentication)
   - Donation submission (requires authentication)

5. **Donation Linking**
   - Link donations to authenticated users
   - Track user donation history
   - Display user-specific donations

---

## 🗄️ Database Schema Changes

### New Tables Required

#### 1. `users` Table

```sql
- id: UUID (primary key)
- email: TEXT (unique, not null)
- emailVerified: BOOLEAN (default false)
- name: TEXT
- image: TEXT (profile picture URL)
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

#### 2. `sessions` Table (BetterAuth)

```sql
- id: TEXT (primary key)
- userId: UUID (foreign key -> users.id)
- expiresAt: TIMESTAMP
- token: TEXT (unique)
- ipAddress: TEXT
- userAgent: TEXT
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

#### 3. `accounts` Table (OAuth providers)

```sql
- id: TEXT (primary key)
- userId: UUID (foreign key -> users.id)
- accountId: TEXT (provider user ID)
- providerId: TEXT (e.g., 'google', 'github')
- accessToken: TEXT
- refreshToken: TEXT
- expiresAt: TIMESTAMP
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

#### 4. `verifications` Table (Email verification)

```sql
- id: TEXT (primary key)
- identifier: TEXT (email)
- value: TEXT (verification code)
- expiresAt: TIMESTAMP
- createdAt: TIMESTAMP
```

#### 5. Update `donations` Table

```sql
- Add: userId: UUID (foreign key -> users.id, nullable for backward compatibility)
- This links donations to authenticated users
```

---

## 🏗️ Architecture Overview

### Frontend (Next.js 16)

- **Location**: `frontend/`
- **BetterAuth Client**: React hooks for authentication
- **Auth Provider**: Wrap app with BetterAuth provider
- **Protected Routes**: Middleware/route guards
- **Auth UI Components**: Login, Signup, Profile forms

### Backend (Cloudflare Workers + Hono)

- **Location**: `worker/`
- **BetterAuth Server**: Handle auth endpoints
- **JWT Validation**: Validate tokens in API routes
- **User Context**: Extract user from requests

### Database (PostgreSQL + Drizzle ORM)

- **Location**: `worker/src/db/schema.ts`
- **Schema Updates**: Add user/auth tables
- **Migrations**: Create migration files

---

## 📦 Dependencies to Install

### Frontend (`frontend/package.json`)

```json
{
  "better-auth": "^1.0.0",
  "@better-auth/react": "^1.0.0"
}
```

### Backend (`worker/package.json`)

```json
{
  "better-auth": "^1.0.0"
}
```

---

## 🔧 Implementation Steps

### Phase 1: Database Setup

1. ✅ Create Drizzle schema for BetterAuth tables
2. ✅ Update `donations` table to include `userId`
3. ✅ Generate and run database migrations
4. ✅ Verify schema in database

### Phase 2: Backend Configuration

1. ✅ Install BetterAuth in worker
2. ✅ Configure BetterAuth server in Hono
3. ✅ Set up database adapter (Drizzle)
4. ✅ Configure OAuth providers (Google)
5. ✅ Set up environment variables
6. ✅ Create auth endpoints in worker
7. ✅ Add JWT validation middleware for protected routes

### Phase 3: Frontend Configuration

1. ✅ Install BetterAuth client packages
2. ✅ Create BetterAuth client configuration
3. ✅ Set up auth provider in layout
4. ✅ Create environment variables
5. ✅ Configure API base URL

### Phase 4: Authentication UI

1. ✅ Create login page (`/login`)
2. ✅ Create signup page (`/signup`)
3. ✅ Update Header component with auth state
4. ✅ Add login/logout buttons
5. ✅ Create protected route wrapper
6. ✅ Add loading states

### Phase 5: Profile Integration

1. ✅ Update profile page to use real user data
2. ✅ Connect to BetterAuth user session
3. ✅ Implement profile update functionality
4. ✅ Add profile picture upload
5. ✅ Update email change functionality

### Phase 6: Donation Integration

1. ✅ Update donation submission to include userId
2. ✅ Modify API endpoint to require authentication
3. ✅ Update donations query to filter by userId
4. ✅ Connect profile/donations pages to real data
5. ✅ Remove mock data dependencies

### Phase 7: Protected Routes

1. ✅ Protect `/profile` route
2. ✅ Protect `/donations` route
3. ✅ Protect donation submission endpoint
4. ✅ Add redirect to login for unauthenticated users
5. ✅ Handle session expiration

### Phase 8: Testing & Polish

1. ✅ Test login/signup flows
2. ✅ Test OAuth (Google) flow
3. ✅ Test protected routes
4. ✅ Test donation linking
5. ✅ Test profile updates
6. ✅ Error handling and edge cases
7. ✅ UI/UX improvements

---

## 🔐 Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8787
NEXT_PUBLIC_BETTER_AUTH_URL=http://127.0.0.1:8787/api/auth
NEXT_PUBLIC_BETTER_AUTH_SECRET=<generate-secret>
```

### Backend (Worker - `wrangler.jsonc` or secrets)

```env
DATABASE_URL=<your-neon-database-url>
BETTER_AUTH_SECRET=<same-secret-as-frontend>
BETTER_AUTH_URL=http://127.0.0.1:8787/api/auth

# OAuth Providers
GOOGLE_CLIENT_ID=<google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<google-oauth-client-secret>
```

---

## 🛣️ API Endpoints Structure

### BetterAuth Endpoints (Auto-generated)

- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/session` - Get current session
- `POST /api/auth/forget-password` - Password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/oauth/google` - Google OAuth
- `GET /api/auth/callback/google` - Google OAuth callback

### Custom Endpoints (Existing + Updates)

- `GET /drives` - Public (no auth required)
- `GET /drives/:id` - Public (no auth required)
- `POST /donations` - **Protected** (requires auth)
- `GET /donations` - **Protected** (requires auth, filtered by user)
- `GET /donations?userId=xxx` - **Protected** (admin only, optional)

---

## 🔄 Data Flow

### User Registration Flow

1. User fills signup form
2. Frontend calls `/api/auth/sign-up`
3. BetterAuth creates user in database
4. Session created and returned
5. User redirected to profile/home

### User Login Flow

1. User fills login form
2. Frontend calls `/api/auth/sign-in`
3. BetterAuth validates credentials
4. Session created and returned
5. User redirected to intended page

### OAuth (Google) Flow

1. User clicks "Sign in with Google"
2. Redirected to Google OAuth
3. User authorizes
4. Google redirects to `/api/auth/callback/google`
5. BetterAuth creates/updates user
6. Session created
7. User redirected to app

### Donation Submission Flow

1. Authenticated user submits donation
2. Frontend includes auth token in request
3. Worker validates token
4. Extract userId from token
5. Create donation with userId
6. Return donation data

---

## 🎨 UI/UX Considerations

### Header Updates

- Show user avatar/name when logged in
- Show "Login" button when logged out
- Show "Logout" button when logged in
- Dropdown menu for profile/settings

### Protected Route Behavior

- Show loading state while checking auth
- Redirect to login if not authenticated
- Preserve intended destination after login
- Show friendly error messages

### Profile Page Updates

- Load real user data from session
- Pre-fill form with user information
- Show actual donation history
- Display real total donations

---

## 🚨 Security Considerations

1. **JWT Tokens**

   - Secure secret key
   - Token expiration
   - Refresh token rotation

2. **Password Security**

   - Hashing with bcrypt/argon2
   - Password strength requirements
   - Rate limiting on login attempts

3. **OAuth Security**

   - Secure callback URLs
   - State parameter validation
   - CSRF protection

4. **API Security**

   - Validate all user inputs
   - Rate limiting on endpoints
   - CORS configuration
   - SQL injection prevention (Drizzle handles this)

5. **Session Security**
   - Secure cookie settings
   - HttpOnly cookies
   - SameSite protection
   - Secure flag in production

---

## 📝 Migration Strategy

### Backward Compatibility

- Keep `donations.userId` nullable initially
- Allow anonymous donations (optional)
- Migrate existing donations (if needed)
- Gradual rollout

### Data Migration (if needed)

- Link existing donations to users (if email matches)
- Preserve donation history
- Handle orphaned donations

---

## ✅ Success Criteria

1. ✅ Users can register with email/password
2. ✅ Users can login with email/password
3. ✅ Users can login with Google OAuth
4. ✅ Users can view their profile
5. ✅ Users can update their profile
6. ✅ Users can submit donations (linked to account)
7. ✅ Users can view their donation history
8. ✅ Protected routes require authentication
9. ✅ Sessions persist across page refreshes
10. ✅ Logout works correctly

---

## 📚 Resources

- [BetterAuth Documentation](https://www.better-auth.com/docs)
- [BetterAuth Next.js Integration](https://www.better-auth.com/docs/integrations/next)
- [BetterAuth Cloudflare Workers](https://github.com/zpg6/better-auth-cloudflare)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)

---

## 🎯 Next Steps

1. Review and approve this plan
2. Set up OAuth credentials (Google)
3. Begin Phase 1: Database Setup
4. Proceed through phases sequentially
5. Test thoroughly at each phase

---

**Last Updated**: 2025-01-27
**Status**: Planning Phase
