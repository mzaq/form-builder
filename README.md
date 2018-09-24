## Form Builder

Simple React front-end project that mimics behaviour of a more robust app in which user could build complex forms including conditional subinputs, generate the form markup, take a look at a form preview etc.

#### In this app you are able to:

- create/edit/delete new 'form-building' instances,
- add/edit/delete various types of inputs and conditional subinputs

#### Functionalities:

- inputs dynamic offset
- focusing single input highlights it's parent and it's direct childs

#### How can I start the app?
- make sure you've got your [Node.js](https://nodejs.org/en/download/) installed
- install [Yarn](https://yarnpkg.com/en/docs/install) package manager as well
- download files from this repo
- open your terminal and change the directory to the project's folder
- run this two commands in terminal
```sh
yarn install
yarn start
```
And that should be it! You've just started local development server and should be able take a look at the project's end result at [localhost:3000](http://localhost:3000). Have fun!

---

I'm not really sure whether the data structure type I choosed for the inputs suits the purpose of it.  
There's a lot of:

```js
[...someArray].map();
[...anotherArray].filter();
[...yetAnotherOne].reduce();
```

So.. please feel free to file some issues. Thanks!
