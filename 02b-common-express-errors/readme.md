# Common Errors

## 1. Cannot find module:
```
Error: Cannot find module 'express' 
```

This means NodeJS cannot find a folder named `express` inside the `node_modules` folder.

Two causes:
1. We didn't `yarn add express` (i.e we never installed Express)
2. The `node_modules` folder is deleted or doesn't exist

Solutions:
1. Make sure `express` is installed
2. Run `yarn install` in terminal to recreate the `node_modules` folder

## 2. Don't have routes after `app.listen`

## 3. route paths are case sensitive
