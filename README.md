# Typescript Web Component Boilerplate

Template to build lazy loaded web components collections with Typescript and nothing(almost)else. Well, there're some other dependencies but are mainly for webpack.

### Installation

```
https://github.com/lucabro81/typescript-web-component-boilerplate.git
cd path/to/project/folder/typ
npm install
npm link
```

### How to use

```
create-new-component nameComponent
```
This command will create a component folder in ```/src```, named ```/name-component```, with three files inside: a Typescript class, the css file and the html template.

An import will be added to ```main.ts```

### Scripts

```
npm run start
```
Start a webpack dev server with hot reloading

---

```
npm run watch
```
Start a webpack watcher

---

```
npm run build
```
Guess what... yep.

---

```
npm run build:prod
```
Guess what production mode... yep.

---

```
npm run clean
```
Get rid of ```node_modules``` and ```package.json``` and reinstall all the (few) dependencies

---

```
npm run update
```
Update dependencies.

---

```
npm run lint
```
Linter and prettier that run on staged modifies, it seems the git hook on commit doesn't work with phpstorm, I've to understand why