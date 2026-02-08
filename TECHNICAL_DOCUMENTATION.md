# Talentium.io - Technical Documentation

## Project Overview

Talentium.io is a modern AI-powered talent acquisition platform built with Next.js 14, featuring intelligent candidate search, analysis workflows, and comprehensive talent pool management.

## Architecture

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React
- **State Management**: React Context API
- **TypeScript**: Full type safety

## Page Structure

### 1. Homepage (`/`)
**Purpose**: Landing page with login functionality
**Components**: 
- `LoginForm` - User authentication interface
- Clean, minimal design with gradient background

### 2. Dashboard (`/dashboard`)
**Purpose**: Main dashboard with AI search interface and job listings
**Components**:
- `AISearchInterface` - AI-powered candidate search
- Jobs section with filterable job cards
- Recent searches and search tips

**Features**:
- AI-powered search prompts
- Job filtering by location, type, salary
- Recent search history
- Search tips and suggestions

### 3. Dashboard1 (`/dashboard1`)
**Purpose**: Modernized dashboard variant
**Components**:
- `AISearchInterface` with compact variant
- Hidden recent searches and tips
- Streamlined UI with modern design

**Features**:
- Compact search interface
- Grid-based prompt builder
- Right-aligned CTA buttons
- Simplified color palette

### 4. Search (`/search`)
**Purpose**: Advanced candidate search and results
**Components**:
- `AISearchInterface` - Search interface
- `CandidateResultsTable` - Results display
- AI chat panel

**Features**:
- Two-column layout
- Real-time search results
- AI chat integration
- Candidate filtering and sorting

### 5. Analysis1 (`/analysis1`)
**Purpose**: AI-powered analysis workflow with animated scanning system
**Components**:
- Left panel: AI chat interface with Muffin branding
- Right panel: Animated analysis pipeline
- `FlowConnector` - Visual flow indicators

**Features**:
- **Animated Analysis Pipeline**:
  - EXTERNAL SOURCES: Scrolling company logos (LinkedIn, GitHub, etc.)
  - INTERNAL SOURCES: Network and applied candidates
  - PEOPLE FOUND: Scrolling candidate avatars
  - COMPETITORS: Company search platforms (G2, Crunchbase, etc.)
  - BEST MATCHES: Top candidate matches

- **Animations**:
  - Marquee scrolling for logos and avatars
  - Pulse glow effects
  - Shimmer backgrounds
  - Float animations
  - Breath effects for logos

- **Interactive Features**:
  - Sequential analysis (3-second intervals)
  - Auto-scroll to current analyzing section
  - Analysis complete modal
  - Sticky left panel

**Technical Implementation**:
```typescript
// Analysis sequence
const sections = ['external', 'internal', 'people', 'competitors', 'matches']
const interval = setInterval(() => {
  if (currentIndex < sections.length) {
    setCurrentAnalyzing(sections[currentIndex])
    // Auto-scroll to current section
    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    currentIndex++
  } else {
    setAnalysisComplete(true)
  }
}, 3000)
```

### 6. Source (`/source`)
**Purpose**: Comprehensive talent pool management and candidate listing
**Components**:
- Header with search and filters
- Colorful stats cards
- Advanced data table

**Features**:
- **Header Section**:
  - "Talent insights" title with search
  - AI search and previous search buttons
  - Active filter badges (Engineer, JS, Salary, EMEA)

- **Stats Dashboard**:
  - COUNTRY: Finland 🇫🇮 (Blue theme)
  - TALENT POOL: Healthy supply (Green theme)
  - TERMINATION COMPLEXITY: High (Red theme)
  - ESTIMATED COST TO HIRE: 52,000 GBP (Purple theme)
  - EMPLOYER CONTRIBUTION: 20% (Orange theme)
  - AVERAGE SALARY & RANGE: 48,000 GBP (Emerald theme)

- **Talent Pool Table**:
  - 9 columns: Name, Role, Experience, Location, Salary, Skills, Match, Status, Actions
  - 8 sample candidates with detailed profiles
  - Sort and filter functionality
  - Status badges (Available, Interviewing, Contacted)
  - Skills displayed as badges
  - Match percentages with color coding

**Technical Implementation**:
```typescript
// Table structure
const candidates = [
  {
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    experience: "5 years",
    location: "Helsinki, Finland",
    salary: "€65,000 - €75,000",
    skills: ["React", "TypeScript", "Node.js"],
    match: 95,
    status: "Available",
    avatar: "/professional-woman-developer.png"
  }
  // ... more candidates
]
```

## Custom Animations

### CSS Animations (globals.css)
```css
@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes breath {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
```

### Animation Classes
- `animate-pulse-glow`: Pulsing glow effect
- `animate-marquee`: Horizontal scrolling
- `animate-float`: Subtle floating motion
- `animate-breath`: Gentle scaling effect
- `bg-shimmer`: Shimmering background

## Component Architecture

### AISearchInterface
**Props**:
- `hideRecent?: boolean` - Hide recent searches
- `hideTips?: boolean` - Hide search tips
- `variant?: "default" | "compact"` - UI variant

**Features**:
- Dynamic prompt building
- Search history management
- Context-aware suggestions
- Responsive design

### FlowConnector
**Purpose**: Visual connection between analysis steps
**Features**:
- Gradient shimmer effect
- Pulsing central node
- Responsive scaling
- Sticky positioning

## Data Flow

1. **Search Initiation**: User enters search criteria
2. **AI Processing**: System analyzes requirements
3. **Source Analysis**: External and internal sources scanned
4. **Candidate Discovery**: People found and matched
5. **Results Display**: Comprehensive talent pool table
6. **Interaction**: Filtering, sorting, and candidate management

## Responsive Design

- **Mobile**: Single column layout, stacked components
- **Tablet**: Two-column layout with sidebar
- **Desktop**: Full three-column layout with optimal spacing

## Performance Optimizations

- Lazy loading for large datasets
- Optimized animations with CSS transforms
- Efficient state management
- Image optimization with Next.js Image component

## Future Enhancements

- Real-time collaboration features
- Advanced AI recommendations
- Integration with external APIs
- Enhanced analytics dashboard
- Mobile app development

## Development Guidelines

### Code Structure
- Components in `/components` directory
- Pages in `/app` directory
- Shared utilities in `/lib`
- Type definitions in TypeScript

### Styling Conventions
- Tailwind CSS for styling
- Custom CSS for complex animations
- Consistent spacing and color schemes
- Mobile-first responsive design

### State Management
- React Context for global state
- Local state for component-specific data
- Efficient re-rendering patterns

This documentation provides a comprehensive overview of the Talentium.io platform's technical implementation, focusing on the sophisticated analysis workflow and talent management capabilities.