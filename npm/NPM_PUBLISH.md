# Publishing to NPM

### Steps to publish the package to NPM

1. Build the application `/src` to `/dist`, **npm run build**.
2. Copy *.npmignore*, *package.json* and *README.md* files from `/npm` to `/dist`.
3. Ensure package.json versioning matches with npm publishing version.
4. Login to your npm account, **npm login**.
5. After login, **npm publish**.
6. After publishing to npm registry, create git tag having the npm version say `vx.x.x` on `master:@latest` commit.
(*You can do it from git prompt or visual studio*).
7. Push the tag (*git push origin tag_name*) to github repo.

That's it!
