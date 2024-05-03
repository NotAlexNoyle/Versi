# Versi
<p>
    <a href="https://github.com/NotAlexNoyle/Versi/releases">
    <a href="https://mastodon.gamedev.place/@trueog">
    <a href="https://store.trueog.net">
        <img alt="Sponsor TrueOG Network" src="https://raw.githubusercontent.com/true-og/website/06d89a86f2ab7e82cf54f8e37d0ab203322a8015/assets/images/logos/true-og-logo-transparent.png"></a>
</p>

An MIT-licensed fork of Cinny maintained for https://true-og.net/

Versi is named after Calotes versicolor, a predator of the Cinnyris asiaticus. It also means "an account or description from a particular point of view, especially as contrasted with another account.", which calls attention to the permissive vs copyleft licensing conflict.

- [Roadmap](https://true-og.net/todo-list)
- [Contributing](https://true-og.net/TrueOG-Contributor-Guide.pdf)

## Getting started
Web app is available at https://chat.true-og.net and gets updated on each new release.

You can also download our desktop app, TBA.

To host Versi on your own, download tarball of the app from [GitHub release](https://github.com/NotAlexNoyle/Versi/releases/latest).
You can serve the application with a webserver of your choice by simply copying `dist/` directory to the webroot. 
To set default Homeserver on login and register page, place a customized [`config.json`](config.json) in webroot of your choice.

<details>
<summary>PGP Public Key to verify tarball</summary>

```
TBA on first release
```
</details>

## Local development
> We recommend using a version manager as versions change very quickly. You will likely need to switch 
between multiple Node.js versions based on the needs of different projects you're working on. [NVM on windows](https://github.com/coreybutler/nvm-windows#installation--upgrades) on Windows and [nvm](https://github.com/nvm-sh/nvm) on Linux/macOS are pretty good choices. Also recommended nodejs version Hydrogen LTS (v18).

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
