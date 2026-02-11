# Quick Fix: Products Page Showing Collections Instead of Products

## The Problem
When clicking "Products", you're seeing a list of collections instead of all products in a grid.

## Solution: Create the Page in Shopify Admin

The `/collections` route is showing Shopify's default collections listing. We need to create a custom page.

### Step-by-Step Instructions:

1. **Go to Shopify Admin**
   - Navigate to: **Online Store** → **Pages**

2. **Create New Page**
   - Click **"Add page"** button
   - **Title**: `All Products`
   - **Content**: Leave completely blank
   - **Search engine listing preview**: 
     - Click **"Edit website SEO"**
     - **Page handle**: Type `all-products` (lowercase, with hyphen)
     - This creates URL: `/pages/all-products`
   - Click **"Save"** at the top right

3. **Assign Template** (CRITICAL STEP)
   - After saving, scroll down to find **"Theme templates"** section
   - Click the dropdown that says "Default page" or "page"
   - Select **"page.all-products"** from the list
   - Click **"Save"** again

4. **Update Navigation Link**
   - Go to: **Online Store** → **Navigation**
   - Find your main menu
   - Edit the "Products" link
   - Change URL to: `/pages/all-products`
   - Save

## Alternative: Use Collections Route

If you prefer to keep `/collections`:

1. Go to **Online Store** → **Themes** → **Customize**
2. Navigate to `/collections` in the preview
3. At the top, check which template is being used
4. If it's not using `list-collections`, you may need to:
   - Go to **Online Store** → **Navigation**
   - Create a new menu item pointing to a page instead

## Verify It Works

After creating the page:
1. Visit your store
2. Click "Products" in navigation
3. You should see all products in a beautiful grid!

## Still Not Working?

If you still see collections:
- Make sure the page handle is exactly `all-products`
- Verify template `page.all-products` is selected
- Clear your browser cache
- Try accessing `/pages/all-products` directly in the URL
