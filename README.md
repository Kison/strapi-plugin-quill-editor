# Quill Field for Strapi

A custom field plugin for Strapi that provides an advanced rich text editor with enhanced formatting options. This plugin replaces the default Strapi editor with a Quill-based editor that supports font families, font sizes, colors, and more.

## Features

- **Rich Text Formatting**: Full support for text styling including bold, italic, underline, and strikethrough
- **Font Controls**: Change font family and size
- **Color Options**: Apply text and background colors
- **Text Alignment**: Left, center, right, and justify alignment
- **Lists**: Ordered and bullet lists
- **Headers**: H1 through H6 heading styles
- **Media**: Insert links and images
- **Clean Formatting**: Remove all formatting with a single click
- **Seamless Integration**: Works within Strapi's content management interface

## Requirements

- Strapi v5.18.1 or higher
- Node.js 18.x or higher

## Installation

```bash
# Using npm
npm install strapi-plugin-quill-field

# Using yarn
yarn add strapi-plugin-quill-field
```

After installing the package, you need to enable the plugin in your Strapi configuration:

1. Open or create the file `./config/plugins.js` in your Strapi project
2. Add the following configuration:

```js
module.exports = () => ({
  'quill-field': {
    enabled: true,
    resolve: './src/plugins/quill-field',
  },
});
```

3. Restart your Strapi server

## Usage

Once installed and enabled, the Quill Field will be available as a custom field type in the Content-Type Builder:

1. Go to the Content-Type Builder in your Strapi admin panel
2. Create a new field or edit an existing one
3. In the field type selection, look for "Rich Text (Quill Field)" under the Custom section
4. Configure the field as needed (name, required status, etc.)
5. Save your changes

When editing content, the field will now use the Quill editor instead of the default Strapi editor, providing access to all the enhanced formatting options.

## Configuration

The Quill editor comes pre-configured with a comprehensive toolbar that includes all the formatting options. The editor is designed to work seamlessly with Strapi's form system, supporting:

- Required field validation
- Disabled state
- Error messages
- Field descriptions
- Internationalization (i18n)

## Development

If you want to contribute to this plugin or modify it for your own needs:

```bash
# Clone the repository
git clone https://github.com/denkison/strapi-plugin-quill-field.git

# Install dependencies
cd strapi-plugin-quill-field
npm install

# Build the plugin
npm run build

# Watch for changes during development
npm run watch
```

## License

MIT

## Author

Denys Oliinyk <denkison@gmail.com>
