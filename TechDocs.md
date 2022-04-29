'Deploy' branch pushes to github pages
Can link directly to how-we-gaze folder index, because index file in root re-directs to public build folder
Command 'npm run deploy' to push to gh-pages branch and deploy
https://svelteland.github.io/svelte-kit-blog-demo/deply-to-github/
in package.json
"scripts": {
"build": "rollup -c",
"dev": "rollup -c -w",
"start": "sirv public --no-clear",
"deploy": "npm run build && npx gh-pages -d build"
},
