#!/bin/bash

# Build the project with the correct base URL
echo "Building project..."
VITE_BASE_URL="/goal-crusher/" npm run build

# Ensure docs directory exists and is clean
echo "Creating docs directory..."
rm -rf docs
mkdir -p docs

# Copy all build files to docs
echo "Copying build files to docs..."
cp -r dist/public/* docs/

# Create .nojekyll to bypass Jekyll processing
touch docs/.nojekyll

# Find the actual JS filename
JS_FILENAME=$(ls docs/assets/index-*.js | xargs basename)
CSS_FILENAME=$(ls docs/assets/index-*.css | xargs basename)

# Create index.html with dynamic asset filenames
cat > docs/index.html << EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <base href="/goal-crusher/" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#EF4444" />
    <meta name="description" content="Your personal motivational goal tracking companion" />
    <link rel="manifest" href="manifest.json" />
    <link rel="icon" type="image/png" href="assets/icon-192.png" />
    <link rel="apple-touch-icon" href="assets/icon-192.png" />
    <title>Wake Up! Goal Tracker</title>
    <script type="module" crossorigin src="assets/${JS_FILENAME}"></script>
    <link rel="stylesheet" href="assets/${CSS_FILENAME}">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
EOF

# Generate app icons if they don't exist
echo "Ensuring icons exist..."
if [ ! -f "docs/assets/icon-192.png" ]; then
  cp generated-icon.png docs/assets/icon-192.png
fi
if [ ! -f "docs/assets/icon-512.png" ]; then
  cp generated-icon.png docs/assets/icon-512.png
fi

# Copy and update manifest.json
echo "Updating manifest.json..."
cat > docs/manifest.json << EOF
{
  "name": "Goal Crusher",
  "short_name": "Goals",
  "description": "Your Personal Goal Tracking App",
  "start_url": "/goal-crusher/",
  "display": "standalone",
  "background_color": "#1a1a1a",
  "theme_color": "#ef4444",
  "icons": [
    {
      "src": "/goal-crusher/assets/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/goal-crusher/assets/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
EOF

echo "Build complete! The contents of the 'docs' folder are ready for GitHub Pages."
echo "Remember to commit and push the changes to GitHub."