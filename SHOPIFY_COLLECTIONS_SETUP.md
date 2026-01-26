# Shopify Products Page Setup Guide

## Fix 404 Error - Create "All Products" Page

The Products link now uses a **page-based route** (`/pages/all-products`) instead of requiring a collection. This is more reliable and doesn't require creating collections.

### Steps to Create "All Products" Page:

1. **Go to Shopify Admin**
   - Navigate to: **Online Store** → **Pages**

2. **Create New Page**
   - Click **"Add page"** button
   - **Title**: Enter `All Products` (or any title you prefer)
   - **Content**: Leave blank (the template handles the display)
   - **Search engine listing preview**: 
     - **Page handle**: MUST be `all-products` (lowercase, with hyphen)
     - This creates the URL: `/pages/all-products`
   - Click **"Save"**

3. **Assign Template**
   - After saving, scroll down to **"Theme templates"** section
   - Select **"page.all-products"** from the dropdown
   - Click **"Save"**

4. **Verify**
   - Visit your store and click "Products" in the navigation
   - It should now show all products without a 404 error

### Current Setup

- Products link in header: `/pages/all-products`
- Template: `templates/page.all-products.json`
- Section: `sections/all-products.liquid`
- Route: Page-based (doesn't require collections)

### Alternative: If You Still Want to Use Collections

If you prefer using `/collections/all`:
1. Create an "All" collection in **Products** → **Collections**
2. Set handle to `all`
3. Change header links back to `/collections/all`
4. Assign `collection.json` template to the collection

**The page-based approach is recommended** as it's simpler and doesn't require collection setup!
