# Title & Subtitle Overlap - Quick Fix Guide

## Problem
Text overlapping between page titles and subtitles on certain screen sizes or when using longer text.

## Quick Solutions

### Solution 1: Add to Global CSS (Recommended)
Add this to your `/src/index.css` file:

```css
/* Prevent title/subtitle overlap */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* 12px spacing */
}

.page-title {
  line-height: 1.3;
  margin-bottom: 0;
}

.page-subtitle {
  line-height: 1.6;
  margin-top: 0;
}

/* Responsive font sizes */
@media (max-width: 640px) {
  .page-title {
    font-size: 1.75rem; /* Smaller on mobile */
  }
  .page-subtitle {
    font-size: 0.875rem;
  }
}
```

### Solution 2: Component-Level Fix
Update any page component header like this:

```jsx
// Before (potential overlap)
<div className="mb-8">
  <h1 className="text-3xl font-bold">Title</h1>
  <p className="text-gray-600">Subtitle</p>
</div>

// After (no overlap)
<div className="mb-8 flex flex-col gap-3">
  <h1 className="text-3xl font-bold leading-tight">Title</h1>
  <p className="text-gray-600 leading-relaxed mt-2">Subtitle</p>
</div>
```

### Solution 3: Tailwind Utility Classes
Use these Tailwind classes for consistent spacing:

```jsx
<div className="space-y-2 mb-8">
  <h1 className="text-3xl font-bold leading-snug">Title</h1>
  <p className="text-base text-gray-600 leading-relaxed">Subtitle</p>
</div>
```

### Solution 4: Long Text Handling
For pages with potentially long titles:

```jsx
<div className="mb-8">
  <h1 className="text-3xl font-bold leading-tight mb-3 max-w-4xl break-words">
    {longTitle}
  </h1>
  <p className="text-gray-600 leading-relaxed max-w-3xl">
    {subtitle}
  </p>
</div>
```

## Implementation

### Apply to All Pages
Create a reusable component:

```jsx
// src/components/PageHeader.jsx
import React from 'react';

const PageHeader = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-8 space-y-2 ${className}`}>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
```

Usage:
```jsx
import PageHeader from '../components/PageHeader';

function MyPage() {
  return (
    <div>
      <PageHeader 
        title="Achievements" 
        subtitle="Track your progress and earn rewards"
      />
      {/* Rest of page content */}
    </div>
  );
}
```

## Why These Work

1. **Gap Property**: Creates consistent spacing that can't be overridden by other styles
2. **Line Height**: Proper line-height prevents text from crowding
3. **Margin Top**: Explicit spacing between elements
4. **Max Width**: Prevents text from stretching too wide
5. **Break Words**: Ensures long words don't overflow

## Current Pages Already Fixed

These pages already have proper spacing:
- ✅ Dashboard
- ✅ Achievements

Check these pages if you still see overlap:
- [ ] Meal Analyzer
- [ ] History
- [ ] Favourites
- [ ] Goals
- [ ] Meal Planner
- [ ] Account

## Testing

After applying fixes, test on:
- [ ] iPhone SE (small screen)
- [ ] Desktop (1920x1080)
- [ ] Tablet (iPad)
- [ ] Different zoom levels (80%, 100%, 125%)

## Quick Fix Script

Run this to update all page headers automatically:

```bash
# Add to package.json scripts
"fix-headers": "grep -rl 'class.*mb-8' src/pages/ | xargs sed -i 's/mb-8/mb-8 space-y-2/g'"
```

## Need More Help?

If overlap persists:
1. Check browser DevTools for conflicting CSS
2. Verify Tailwind is processing classes correctly
3. Look for custom CSS overriding default styles
4. Check if dark mode styles are causing issues
5. Inspect the computed line-height values

---

**Pro Tip**: Use browser DevTools to inspect the problematic text and see what styles are being applied. This helps identify the root cause quickly!
