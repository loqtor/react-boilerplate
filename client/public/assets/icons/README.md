######Updated 10th Feb 2016 by James Bosworth
#Using IcoMoon to create SVG icons


##Always import latest settings

**Important: Do this every time you need to add or modify icons.**

You can import `selection.json` back to the IcoMoon app using the **Import Icons** button or simply dragging it into the app window to retrieve your icon selection.

This will import all the *latest* icons in the project, names, size settings, colours, metadata, etc.

##Always replace selection.json after export
**Important: Do this every time you export new icons.**

When you have downloaded the latest export from IcoMoon you will get a file containing a few important files:

```
html
font-name/
	├── demo-files/
	│	└── ...
	│
	├── fonts/
	│	├── font-name.svg
	│	├── font-name.ttf
	│	└── font-name.woff
	│
	├── selection.json
	├── style.css
	├── Read Me.txt
	└── demo.html
```

The only files you need to pay attention to are `selection.json`, `style.css` and the files inside the `/fonts/` folder.

1. Download your font files from IcoMoon.
2. Unzip the download and disgard any demo files you don't need.
3. Move the font files into `public/assets/icons/` in your project.
4. Also move `selection.json` into `public/assets/icons/` make sure you replace the old one.
5. Copy the CSS code from `style.css` and paste it into `styles/base/elements/icons.scss` in your project. Make sure the URLs to the font files are correct.