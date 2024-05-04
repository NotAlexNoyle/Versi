# Versi
<p>
    <a href="https://github.com/NotAlexNoyle/Versi/releases">Download</a> | 
    <a href="https://mastodon.gamedev.place/@trueog">Follow</a> | 
    <a href="https://store.trueog.net">Donate</a> | 
</p>

Versi is a liberated MIT-licensed fork of Cinny 2.2.4 maintained by and for [TrueOG Network](https://true-og.net/).

Versi is named for Calotes versicolor, a predator of the Cinnyris asiaticus. It also means "an account or description from a particular point of view, especially as contrasted with another account.", which calls attention to the permissive vs copyleft licensing conflict between Versi and Cinny.

- [Roadmap](https://true-og.net/todo-list)
- [Contributing](https://true-og.net/TrueOG-Contributor-Guide.pdf)

## Getting started
Our web app is available at https://chat.true-og.net and gets updated upon each new release.

You can also download our desktop app, [Versi-Desktop](https://github.com/NotAlexNoyle/Versi-Desktop).

To host Versi on your own, download tarball of the app from the latest [GitHub release](https://github.com/NotAlexNoyle/Versi/releases/latest).

You can serve the application with a webserver of your choice by simply copying `dist/` directory to the webroot.

To set default Homeserver on login and register page, place a customized [`config.json`](config.json) in webroot of your choice.

<details>
<summary>PGP Public Key to verify tarball</summary>

```
TBA on first release.
```
</details>

## Local development
> We recommend using [nvm](https://github.com/nvm-sh/nvm) to create a dedicated node environment for each project you work on.

Execute the following commands to start a development server:
```sh
npm ci # Installs all dependencies
npm start # Serve a development version
```

To build the app:
```sh
npm run build # Compiles the app into the dist/ directory
```

## License

Copyright (c) 2021-present Ajay Bura (ajbura)

Code licensed under the MIT License: <[http://opensource.org/licenses/MIT](https://raw.githubusercontent.com/NotAlexNoyle/Versi/dev/LICENSE.md)>

Graphics licensed under CC-BY 4.0: <https://creativecommons.org/licenses/by/4.0/>
