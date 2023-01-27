- [Overview](#overview)
- [Features](#features)
  - [Live updates](#live-updates)
  - [Configuration section](#configuration-section)
  - [Internationalization](#internationalization)
  - [Visual Themes](#visual-themes)
  - [Mobile View](#mobile-view)
- [What's Next](#whats-next)
- [Known Issues](#known-issues)
- [Documentation](#documentation)
- [How To Use](#how-to-use)
  - [Servers](#servers)
  - [Download](#download)
  - [Host](#host)
  - [About](#about)
  - [Settings](#settings)
- [Credits](#credits)
  - [Development](#development)
  - [Translations](#translations)

# Overview
This is an unofficial open-source implementation of the [Kyber API](https://kyber.gg/) with the additional functionality such as live updates, configuration section, internationalization and support for dark/light themes.
The project is based on [React](https://reactjs.org/) + [Redux](https://redux.js.org/) + [TypeScript](https://www.typescriptlang.org/) stack.

# Features
Currently the original site is missing some crucial features I'd like to see and use for a regular basis.

## Live updates
Why do you need to refresh a page to get some new information when the service is based on calling REST API? Let's delegate it to the application itself, but won't forget to leave a manual switch. Remember, we're not an Apple. The application asks Kyber API each 5 seconds to get the most fresh state of available servers to play. I wish [WebSockets](http://tools.ietf.org/html/rfc6455) were here.

<img src="https://user-images.githubusercontent.com/16327320/215355160-fd73f68e-186f-49d9-8fcf-39b7551389ba.jpg" width="500" />

## Configuration section
Just created your own server? What was the password? Is team balancing enabled? Don't you worry. Open [Settings](https://kyber.pages.dev/settings) page and look again. There is a lot of useful information here.

<img src="https://user-images.githubusercontent.com/16327320/215355517-d0f3866f-f18b-4a8c-adf0-a2f13e37f410.jpg" width="500" />

## Internationalization
The site supports internationalization and already translated in some languages:
- 🇬🇧 English
- 🇷🇺 Russian
- 🇮🇹 Italian
- 🇫🇷 French

<img src="https://user-images.githubusercontent.com/16327320/215355673-3c378b44-57ea-4ce3-81f6-2a4c5f513fe3.jpg" width="500" />

Don't see your language? Please, [create a new issue](https://github.com/egorantonov/kyber/issues/new) and help this project with translations.

## Visual Themes
Let's bring the balance back. Introducing dark and light theme support. Choose your <strike>side of the force</strike> theme on [Settings](https://kyber.pages.dev/settings) page. Moreover, there's an option to use a system (your browser) theme.

<img src="https://user-images.githubusercontent.com/16327320/215355828-8286dcb2-80b3-4be7-9e98-db0c92f1b228.png" width="800" />

## Mobile View
For some (not obvious for me) reason original site doesn't support mobile view. So you have to `Alt`+`Enter` your active Kyber session to make it framed window, open the browser and share your server's data somewhere in chats. Let's fix this. Usually your phone is on the same local network with your gaming PC, so Kyber only can see your **public IP**. That's why there is no reason not to use your smartphone (tablet/other PC) for Kyber. 

<img src="https://user-images.githubusercontent.com/16327320/215356206-3d07aa73-0054-4515-85a4-789651c083de.png" width="800" />

# What's Next
To be honest current project's state is far from perfect. A lot of work should be done, for instance, I need to:
1. Implement default functionality such as proxy ping or server sharing. Now the list of available proxies just sorted in alphabetical order, so users have to decide by themselves which proxy is the best for them.
2. Implement server search and filtering. Nothing special, but really useful.
3. Rewrite `Configuration` component to match others.
4. Replace native alerts with application's modal windows.
5. Split state management logic.
6. Tune visuals.

So, don't hesitate to make your own contributions 🙂
   
# Known Issues
1. The modal window on Apple devices (tested on iPhone and iPad) doesn't prevent page scrolling even if `document.body.style.overflowY` set to `hidden`.
2. For some reason default font have several broken ligature-like  combinations of symbols like `fi` or `fl`. You may have already noticed that problem on the original site. Current workaround is to use capital letters where possible or ligatures (`ﬁ` and `ﬂ`) for lowercase.
3. Some visual bugs may occur on untested devices and with new translations. For example, when Kyber API is down `Status` message may be shown with a long text, which breaks its markup.
4. Horizontal mobile view (small height, but wide enough) for `Modal` window is pretty messed up.

# Documentation
Visit [Wiki](https://github.com/egorantonov/kyber/wiki/Kyber-API-Documentation) page to learn more about Kyber API - endpoints, payload, models, errors, etc.

# How To Use

## Servers
Main page with a servers list.

## Download
Download Kyber client.

## Host
Create your own Kyber server.

## About
Some information about this project.

## Settings
Settings page with theme switch and your Kyber configuration

# Credits

## Development
Kyber API: [@BattleDash](https://github.com/battledash)

## Translations
- 🇮🇹 Italian: Wall, [@SaraGiamb](https://github.com/SaraGiamb)
- 🇫🇷 French: KidRatMole
- 🇷🇺 Russian: [EYEMVX](https://github.com/egorantonov)
