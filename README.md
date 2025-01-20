# Ruby Home Services Project Documentation

## Project Overview
Ruby Home Services is a professional window cleaning service website with a comprehensive quote form system. The project uses React, TypeScript, Tailwind CSS, and Shadcn UI for the frontend, with Supabase handling the backend functionality.

## Key Features

### 1. Multi-Step Quote Form
The quote form is implemented as a dialog with multiple steps:
- Welcome Page
- Personal Information Collection
- Address Information
- Quote Calculator
- Contract Selection
- Additional Services Selection
- Scheduling
- Review Offer
- Payment Method Selection
- Summary
- Thank You Page

### 2. Form Data Management
- All form data is managed through the `useQuoteForm` hook
- Form submissions are stored in Supabase's `form_submissions` table
- Includes validation and error handling

### 3. Database Structure
The Supabase database includes the following tables:
- `form_submissions`: Stores all quote form submissions
- `user_roles`: Manages user roles (admin/user)
- `admin_invitations`: Handles admin invitation system
- `app_settings`: Stores application configuration

### 4. Admin Features
- Admin dashboard for managing form submissions
- User role management system
- Settings management
- Analytics dashboard

## Technical Implementation Details

### Frontend Architecture
- Built with React + TypeScript
- Uses Tailwind CSS for styling
- Implements Shadcn UI components
- Responsive design throughout

### Backend (Supabase)
- Authentication system
- Row Level Security (RLS) policies implemented
- Real-time updates for form submissions
- Secure data management

### Form Steps Implementation
1. **Welcome Page**: Simple introduction with logo
2. **Personal Info**: Collects name, phone, email
3. **Address**: Validates service area (Utah and Salt Lake counties)
4. **Quote Calculator**: Instant quote generation
5. **Contract Selection**: Service plan options
6. **Additional Services**: Optional add-ons like screen cleaning
7. **Scheduling**: Appointment selection
8. **Review Offer**: $20 discount for review option
9. **Payment Method**: Multiple payment options
10. **Summary**: Final review of all selections
11. **Thank You**: Confirmation and next steps

### Key Components
- `QuoteFormDialog.tsx`: Main form container
- `FormSteps.tsx`: Step management
- `FormProgress.tsx`: Progress indicator
- Various step components in `/steps` directory

### State Management
- Form state managed through custom hooks
- Real-time validation
- Progress tracking
- Data persistence

## Design System
- Primary color: Ruby Red (#FF3B4E)
- Font families: Rubik, Nunito Sans
- Responsive breakpoints
- Consistent spacing and component styling

## Important Implementation Notes
1. Address validation focuses on Utah and Salt Lake counties
2. Payment processing happens after service completion
3. Review discount ($20) offered for post-service reviews
4. Appointment scheduling includes buffer times
5. Form data is preserved until final submission

## Future Enhancements Planned
1. Calendar integration for scheduling
2. Enhanced quote calculator
3. SMS notifications
4. Customer portal
5. Service history tracking

## Development Guidelines
1. Maintain responsive design
2. Follow TypeScript type definitions
3. Use Tailwind classes for styling
4. Implement proper error handling
5. Follow established component structure

## Deployment
The project can be deployed through:
1. Lovable's built-in deployment
2. Manual deployment to custom domains via Netlify
3. GitHub repository integration

## Project Structure
```
src/
  ├── components/
  │   ├── QuoteForm/
  │   │   ├── steps/
  │   │   └── components/
  │   ├── Admin/
  │   └── ui/
  ├── hooks/
  ├── pages/
  └── integrations/
      └── supabase/
```

## Getting Started
1. Clone the repository
2. Install dependencies with `npm install`
3. Set up Supabase connection
4. Configure environment variables
5. Run development server with `npm run dev`

## Important Links
- Supabase Dashboard: https://supabase.com/dashboard/project/jcxdjwfkvzweiuyoxuyx
- GitHub Repository: https://github.com/1WHIT4KER/ruby-home-services
- Lovable Documentation: https://docs.lovable.dev/

## Contact & Support
For support or questions, please reach out through the appropriate channels:
- GitHub Issues
- Lovable Support
- Project maintainers

---

This documentation will be continuously updated as the project evolves.