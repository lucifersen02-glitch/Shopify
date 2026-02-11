# Setup Guide: All Products Page

## Quick Setup (2 minutes)

To make the "Products" link show all products in a beautiful grid layout:

### Step 1: Create the Page in Shopify Admin

1. **Go to Shopify Admin**
   - Navigate to: **Online Store** → **Pages**

2. **Create New Page**
   - Click **"Add page"** button
   - **Title**: Enter `All Products` (or any title you prefer)
   - **Content**: Leave blank (the template handles everything)
   - **Search engine listing preview**: 
     - Click "Edit website SEO"
     - **Page handle**: MUST be `all-products` (lowercase, with hyphen)
     - This creates the URL: `/pages/all-products`
   - Click **"Save"**

3. **Assign Template**
   - After saving, scroll down to **"Theme templates"** section
   - Select **"page.all-products"** from the dropdown
   - Click **"Save"**

### Step 2: Verify It Works

1. Visit your store homepage
2. Click **"Products"** in the navigation
3. You should now see all products displayed in a beautiful grid!

## What You'll See

- **Beautiful Product Grid**: All products displayed in a responsive grid
- **Gradient Title**: Eye-catching "All Products" heading with gradient text
- **Product Cards**: Each product shows:
  - Product image
  - Product title
  - Price (with discount if on sale)
  - Sale badge (if applicable)
  - Quick view button on hover
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Products fade in as you scroll

## Current Setup

- **Products Link**: `/pages/all-products`
- **Template**: `templates/page.all-products.json`
- **Section**: `sections/all-products.liquid`
- **Styling**: Enhanced with gradients and modern design

## Troubleshooting

**If you see a 404 error:**
- Make sure the page handle is exactly `all-products` (lowercase, with hyphen)
- Verify the template `page.all-products` is selected

**If no products show:**
- Make sure you have products added to your store
- Check that products are published and visible
- Products should be in at least one collection

**If you see collections instead of products:**
- The page template might not be assigned correctly
- Go back to the page settings and select `page.all-products` template

## Features

✅ Displays all products from all collections  
✅ Beautiful gradient design  
✅ Responsive grid layout  
✅ Product cards with images and prices  
✅ Sale badges for discounted items  
✅ Smooth animations  
✅ Mobile-friendly  

That's it! Your Products page is now ready! 🎉
