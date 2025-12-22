# Strapi API Integration - Menu Page

## Overview
The Menu page has been successfully updated to fetch menu categories, items, drinks, and buffet data from the Strapi v5 backend API instead of using hardcoded data. Full image support, responsive design, and complete category management implemented.

## Latest Changes (2025-12-22)

### 1. Fixed Menu Item Images & API Endpoint Migration
**Issue**: Menu items were showing "No Image" because:
- Code was fetching from `/api/menu-categories` expecting nested items
- Actual API structure has items in `/api/menu-items` with related categories

**Solution**:
- Changed endpoint from `/api/menu-categories` to `/api/menu-items`
- Implemented client-side grouping of items by category
- Fixed image URL handling for Strapi v5 flat structure
- Prefers optimized `formats.medium.url` (750x750px)
- Uses absolute URLs from Strapi Cloud (no base URL prepending)

### 2. Updated Image Handling
```typescript
// Strapi v5 Image Type with format variants
interface StrapiImage {
  url: string;
  alternativeText?: string | null;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    thumbnail?: { url: string };
  };
}

// Image extraction in component
const image = item.image || item.attributes?.image;
const imageUrl = image?.formats?.medium?.url || image?.url || null;
const imageAlt = image?.alternativeText || title || 'Menu item image';
```

### 3. Menu Categories Layout Improvements
**Changes**:
- Changed from rigid `grid` layout to flexible `flexbox`
- All categories display in single line (`flex flex-wrap`)
- Centered with `justify-center` and `mx-auto`
- Proper responsive text sizing: `text-xs` → `sm:text-sm` → `md:text-base`
- Added `whitespace-nowrap` to prevent category name truncation
- Used `w-fit` to eliminate unnecessary empty space
- Removed empty space at the end of tab bar

### 4. Buffet Pricing Fallback Removal
**Issue**: Buffet was showing $35 default price when none provided from backend

**Solution**:
- Removed hardcoded `|| 35` fallback
- Now only displays price section if `buffetCategories[0]?.price` exists
- Cleaner UI without misleading default values

### 5. Navigation Route Fix
**Issue**: "Book Your Table" button showed 404 error

**Solution**:
- Changed button navigation from `/reservations` → `/walk-in`
- Matches actual route mapping in App.tsx

## Changes Made

### 1. **Updated TypeScript Interfaces**
```typescript
// Strapi v5 Image Type - Direct media object with formats
interface StrapiImage {
  url: string;
  alternativeText?: string | null;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    thumbnail?: { url: string };
  };
}

// Strapi v5 Menu Item - Flat structure
interface MenuItem {
  id: number;
  documentId?: string;
  title: string;
  shortDescription: string;
  price: number;
  priceLabel?: string;
  featured: boolean;
  displayOrder?: number;
  image?: StrapiImage | null;
  attributes?: { /* legacy support */ };
}

// Strapi v5 Menu Category - Flat structure
interface MenuCategory {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  displayOrder?: number;
  menu_items?: MenuItem[];
  attributes?: { /* legacy support */ };
}
```

### 2. **Updated API Fetch Logic**
```typescript
// Fetch menu items directly and group by category
useEffect(() => {
  const fetchMenuItems = async () => {
    const apiUrl = new URL('https://calm-actor-864a39d720.strapiapp.com/api/menu-items');
    apiUrl.searchParams.append('populate', '*'); // Includes image & menu_category
    apiUrl.searchParams.append('sort', 'displayOrder:asc');

    const response = await fetch(apiUrl.toString());
    const data = await response.json();
    const items = data.data || [];
    
    // Group items by category on client-side
    const categoryMap = new Map<number, any>();
    items.forEach((item: any) => {
      const category = item.menu_category;
      if (category && category.isActive) {
        if (!categoryMap.has(category.id)) {
          categoryMap.set(category.id, {
            id: category.id,
            documentId: category.documentId,
            title: category.title,
            slug: category.slug,
            displayOrder: category.displayOrder,
            menu_items: [],
          });
        }
        categoryMap.get(category.id)!.menu_items.push(item);
      }
    });

    // Sort and set
    const sortedCategories = Array.from(categoryMap.values()).sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
    setMenuCategories(sortedCategories);
  };
}, []);
```

### 3. **Menu UI Layout Changes**
```tsx
// Before: Grid layout (2 col mobile, 3 col tablet, 4 col desktop, 5 col large)
// <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5...">

// After: Flexible single-line layout
<TabsList className="flex flex-wrap justify-center gap-1 md:gap-2 mb-8 md:mb-12 bg-secondary/50 p-2 rounded-lg h-auto w-fit mx-auto">
  {/* All tabs in one line, wrapped on mobile */}
</TabsList>

// Tab triggers now have whitespace-nowrap to prevent text breaking
<TabsTrigger className="text-xs sm:text-sm md:text-base whitespace-nowrap ...">
```

### 4. **Buffet Pricing Update**
```tsx
// Before: Shows $35 default if no price
// <p>${buffetCategories[0]?.price || 35} Per Person</p>

// After: Only shows price if it exists
{buffetCategories[0]?.price ? (
  <>
    <p className="text-4xl md:text-5xl font-playfair font-bold text-accent">
      ${buffetCategories[0].price} <span className="text-xl">Per Person</span>
    </p>
    <p className="text-sm text-muted-foreground mt-3">Available daily from 5:30 PM</p>
  </>
) : null}
```

### 5. **Navigation Fix**
```tsx
// Before: Non-existent route
// onClick={() => window.location.href = '/reservations'}

// After: Correct route
// onClick={() => window.location.href = '/walk-in'}
```

## API Endpoints Used

### Menu Items (Primary Data Source)
- **URL**: `https://calm-actor-864a39d720.strapiapp.com/api/menu-items`
- **Method**: GET with `populate=*`
- **Structure**: Returns flat items with related image and menu_category objects
- **Response**: `{ data: [{ id, title, shortDescription, price, featured, image, menu_category, ... }], meta: {...} }`

### Key Data Structure
```json
{
  "id": 2,
  "title": "Tandoori Chicken",
  "shortDescription": "Clay oven roasted chicken...",
  "price": 24,
  "featured": true,
  "displayOrder": 1,
  "image": {
    "url": "https://cdn.strapiapp.com/...",
    "alternativeText": null,
    "formats": {
      "medium": { "url": "https://cdn.strapiapp.com/medium_..." }
    }
  },
  "menu_category": {
    "id": 2,
    "title": "Starters",
    "slug": "starters",
    "displayOrder": 1,
    "isActive": true
  }
}
```

## Features

### Menu Items Display
- ✅ Dynamic tab-based category selection
- ✅ Featured item highlighting with "Chef's Special" badge
- ✅ Image display with format optimization (medium > original)
- ✅ Share buttons for social media
- ✅ Loading skeleton feedback
- ✅ Responsive image alt text for accessibility

### Category Management
- ✅ All categories in single flexible line
- ✅ Responsive text sizing across devices
- ✅ No truncation of category names
- ✅ Centered layout with no extra padding
- ✅ Clean mobile wrapping behavior

### Drink Management
- ✅ Automatic category grouping and sorting
- ✅ Alcoholic/non-alcoholic filtering
- ✅ Dynamic category button generation
- ✅ First category auto-selected on load

### Buffet Showcase
- ✅ Multi-category buffet display
- ✅ Vegetarian/spicy indicators
- ✅ Per-person pricing (only when available)
- ✅ Comprehensive item descriptions
- ✅ No misleading default prices

### Image Handling (Strapi v5)
- ✅ Optimized format selection (medium > original)
- ✅ Absolute URL support (Strapi Cloud returns complete URLs)
- ✅ Proper alt text from alternativeText field
- ✅ Graceful fallback for missing images
- ✅ Production-safe null checking

## Current Status (2025-12-22)

### ✅ Completed Today
- ✅ Fixed menu items API endpoint (now fetches from /api/menu-items)
- ✅ Implemented client-side category grouping
- ✅ Fixed all image rendering issues
- ✅ Optimized image URL handling with format preferences
- ✅ Restructured menu categories layout (single line, centered)
- ✅ Removed empty space from category tabs
- ✅ Fixed buffet pricing fallback
- ✅ Corrected navigation route for "Book Your Table" button
- ✅ Ensured responsive design across all screen sizes
- ✅ Maintained backward compatibility with legacy structures

### 🎯 Implementation Details
- **Data Flow**: API → Client Grouping → Categorized Display
- **Image Strategy**: Prefer medium format (750x750px) for performance
- **Layout Pattern**: Flexbox with intelligent wrapping
- **Error Handling**: Graceful fallbacks for missing data
- **Accessibility**: Proper alt text, semantic HTML, ARIA compliance

## Files Modified
- [src/pages/Menu.tsx](src/pages/Menu.tsx) - Complete API integration with Strapi v5
  shortDescription: string;
  price: number;
  priceLabel?: string;
  featured: boolean;
  displayOrder?: number;
  image?: StrapiImage | null;


// Strapi v5 Menu Category - Flat structure
interface MenuCategory {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  displayOrder?: number;
  menu_items?: MenuItem[];
}

interface DrinkCategory {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  order: number;
  drink_items: DrinkItem[];
}

interface DrinkItem {
  id: number;
  documentId: string;
  name: string;
  price: number;
  description: string | null;
  order: number;
  isAlcoholic: boolean | null;
  drink_category: {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    order: number;
  } | null;
}
```

### 2. **Updated Component State**
- `menuCategories`: Fetches with `populate=*` to include nested menu items
- `drinkCategories`: Fetched and grouped by category on client-side
- `buffetCategories`: Fetches with populated buffet items
- Dynamic category selection based on first item in each group

### 3. **API Fetch Logic**
```typescript
// Menu Categories with nested items
const apiUrl = new URL('https://calm-actor-864a39d720.strapiapp.com/api/menu-categories');
apiUrl.searchParams.append('filters[isActive][$eq]', 'true');
apiUrl.searchParams.append('populate', '*');
apiUrl.searchParams.append('sort', 'displayOrder:asc');

// Drink Items grouped by category
const apiUrl = new URL('https://calm-actor-864a39d720.strapiapp.com/api/drink-items');
apiUrl.searchParams.append('populate[drink_category][fields]', 'title,slug,order');
apiUrl.searchParams.append('sort', 'order:asc');

// Buffet Categories with items
const apiUrl = new URL('https://calm-actor-864a39d720.strapiapp.com/api/buffet-categories');
apiUrl.searchParams.append('populate[buffet_items]', '*');
apiUrl.searchParams.append('sort', 'order:asc');
```

### 4. **Image Rendering**
- Correctly extracts image from flat structure: `image.formats.medium.url || image.url`
- No URL prepending (Strapi Cloud returns absolute paths)
- Proper alt text: `image.alternativeText || title`
- Graceful fallback to "No Image" placeholder if missing

### 5. **Menu UI Features**
- **Tabs Interface**: Dynamic tab generation from categories
- **Menu Items**: Display with featured badge, price, description, and share buttons
- **Buffet Tab**: Shows all buffet categories with items, prices per person
- **Drinks Tab**: Categorized by type (soft drinks, alcoholic, etc.) with filtering
- **Loading States**: Skeleton loaders during data fetch

## API Endpoints Used

### Menu Categories & Items
- **URL**: `https://calm-actor-864a39d720.strapiapp.com/api/menu-categories`
- **Method**: GET with populate=* to include nested menu items
- **Filters**: `isActive=true`, sorted by `displayOrder`
- **Response Structure**: Flat structure with `title`, `slug`, `menu_items` array

### Drink Items & Categories
- **URL**: `https://calm-actor-864a39d720.strapiapp.com/api/drink-items`
- **Method**: GET with populated drink_category relation
- **Features**: Client-side grouping by category, sorting by order
- **Response Structure**: Items with drink_category relationship

### Buffet Categories & Items
- **URL**: `https://calm-actor-864a39d720.strapiapp.com/api/buffet-categories`
- **Method**: GET with populated buffet_items
- **Features**: All buffet categories with nested items
- **Response Structure**: Categories with title, price, buffet_items array

## Features

### Menu Items Display
- ✅ Dynamic tab-based category selection
- ✅ Featured item highlighting with "Chef's Special" badge
- ✅ Image display with format optimization (medium > original)
- ✅ Share buttons for social media
- ✅ Loading skeleton feedback

### Drink Management
- ✅ Automatic category grouping and sorting
- ✅ Alcoholic/non-alcoholic filtering
- ✅ Dynamic category button generation
- ✅ First category auto-selected on load

### Buffet Showcase
- ✅ Multi-category buffet display
- ✅ Vegetarian/spicy indicators
- ✅ Per-person pricing
- ✅ Comprehensive item descriptions

### Image Handling (Strapi v5)
- ✅ Optimized format selection (medium > original)
- ✅ Absolute URL support (no base URL prepending)
- ✅ Proper alt text from alternativeText field
- ✅ Graceful fallback for missing images
- ✅ Production-safe null checking

## Current Status (2025-12-22)

### ✅ Completed
- Menu items fetching with nested data (menu_items)
- Drink items grouping by category on client-side
- Buffet categories with items display
- Image rendering with Strapi v5 flat structure support
- Alt text accessibility implementation
- Loading states and skeleton feedback
- Error handling for API failures
- Share buttons for menu items
- Featured item highlighting

### 🔄 In Progress
- Menu items now display correctly with images
- All three menu sections (Food, Drinks, Buffet) functional

### Files Modified
- [src/pages/Menu.tsx](src/pages/Menu.tsx) - Menu component with Strapi v5 API integration
