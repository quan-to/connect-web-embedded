# Connect Web Embedded

This web client will help you as a partner to initialize Quanto Connect embedded in your application.

* [Demo](#demo)
* [Installing](#installing)
* [Creating an instance](#creating-an-instance)
* [How to use](#how-to-use)
* [Callbacks](#callbacks)
* [Run and Build](#run-and-build)
* [About](#about)
    * [Stack](#stack)
    * [Contributing](#contributing)
    * [Support](#support)

# Demo

https://mystifying-nobel-49ca54.netlify.com/

# Installing

Using npm:

```
$ npm install connect-web-embedded
```

Using yarn:

```
$ yarn add connect-web-embedded
```

Using cdn:

```
<script src="https://stupefied-archimedes-52d3b4.netlify.com/index.js"></script>
```

# Creating an instance

How you can create a new instance of Connect.

**new Connect([config])**

```javascript
const connect =  new Connect({    
    // Connect Session link
    session: 'c889f8e9-8c58-456d-8f35-3840a292a574',
    
    // Connect Session environment
    env:'sandbox' 
});
```

# How to use

```javascript
const connect = new Connect({
    session: 'c889f8e9-8c58-456d-8f35-3840a292a574',
    env: 'sandbox'
});

connect.onLoad(() => {
    console.log('Do something')
})

connect.onSuccess(() => {
    console.log('Do something')
})
```

# Callbacks

method | params | return | description
-------|--------|--------|------------
onLoad | function | void | This callback will be call when Connect is ready
onExit | function | void | This callback will be call when the user leaves the application
onSuccess | function | void | This callback will be call when user finished the flow with success
onAuthSuccess | function | data | This callback will be call after user login 
onAuthFail | function | void | This callback will be call after user login fail
onGrantedPermission | function | data | This callback will be call when user granted the permission and return the permission
onSelectBank | function | data | This callback will be call after user select a bank
onAddAccountSuccess | function | data | This callback will be call after user add a new account

# Run and Build

Run(watch):

```
$ yarn start
```

Build:

```
$ yarn build
```

# About

## Stack

* [Typescript](https://www.typescriptlang.org/)
* [Parcel](https://parceljs.org/)

## Contributing

[Link](https://github.com/quan-to/connect-web-embedded/blob/master/CONTRIBUTING.md)

## Support

[suporte@quan.to](mailto:suporte@quan.to)

