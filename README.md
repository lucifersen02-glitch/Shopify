# Shopify Demo Theme

A modern, responsive Shopify theme with a beautiful design and user-friendly interface.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized
- 🛍️ Product showcase section
- 📧 Contact form
- 📰 Newsletter subscription
- 🎯 SEO optimized
- ♿ Accessible design

## Theme Structure

```
.
├── assets/          # CSS, JavaScript, and image files
├── config/          # Theme settings and configuration
├── layout/          # Theme layout templates
├── locales/         # Translation files
├── sections/        # Reusable theme sections
├── snippets/        # Reusable code snippets
└── templates/       # Page templates
```

## Sections Included

1. **Header** - Navigation and cart icon
2. **Hero** - Eye-catching banner section
3. **Featured Products** - Product grid showcase
4. **About** - About us section
5. **Contact** - Contact form and information
6. **Footer** - Footer with links and newsletter

## Installation

### Using Shopify CLI

1. Install Shopify CLI:
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

2. Login to your Shopify store:
   ```bash
   shopify theme login
   ```

3. Push the theme to your store:
   ```bash
   shopify theme push
   ```

### Manual Installation

1. Zip all theme files
2. Go to your Shopify admin panel
3. Navigate to Online Store > Themes
4. Click "Add theme" > "Upload zip file"
5. Select your theme zip file

## Customization

### Colors

Edit colors in `config/settings_schema.json` or through the theme customizer in Shopify admin.

### Content

- Edit section content through the Shopify theme customizer
- Modify section settings in `sections/*.liquid` files
- Update text in `locales/en.default.json`

## Development

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   shopify theme dev
   ```

3. Preview your changes at the provided local URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This theme is provided as-is for demonstration purposes.

## Support

For issues or questions, please contact your development team.
