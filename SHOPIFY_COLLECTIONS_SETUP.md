# Shopify Collections Setup Guide

## Fix 404 Error on /collections/all

If you're getting a 404 error when clicking "Products", you need to create the "All" collection in Shopify:

### Steps to Create "All" Collection:

1. **Go to Shopify Admin**
   - Navigate to: **Products** → **Collections**

2. **Create New Collection**
   - Click **"Create collection"** button
   - **Title**: Enter `All` (exactly as shown)
   - **Collection type**: Select **"Automated"**
   - **Conditions**: 
     - Product price is greater than $0
     - OR Product status is Active
   - Click **"Save"**

3. **Verify Collection Handle**
   - After saving, check the collection URL
   - It should be: `/collections/all`
   - If it's different, edit the collection and check "Search engine listing preview"
   - The handle MUST be `all` (lowercase)

4. **Assign Template**
   - Go to **Online Store** → **Themes** → **Customize**
   - Navigate to `/collections/all` in the preview
   - At the top, select **"collection"** template
   - Save

### Alternative: Use Collections Index

If you prefer, you can also:
- Keep the Products link pointing to `/collections` (collections index)
- This will show all collections, and users can click to see products

### Current Setup

- Products link in header: `/collections/all`
- Template: `templates/collection.json`
- Section: `sections/collection-products.liquid`

The code is ready - you just need to create the "All" collection in Shopify admin!
