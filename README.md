# TO-DO Application
Simple React TO-DO application

### To run

* You'll need to have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed in your system.

```
git clone https://github.com/ArturW1998/ToDo.git
```

* Then install the dependencies:

```
npm install
```

* Run development server:

```
npm start
```

Open the web browser to `http://localhost:5000/`

### To build the production package

```
npm run build
```

### Eslint
To do the actual linting, run:

```
npm run lint
```

### Jest tests
To run tests using Jest:

```
npm test
```

### Notes on importing scss styles
* styles having /src/ in their absolute path are considered part of the application and exported as local scss modules.
* other styles are considered global styles used by many components and are included in the css bundle directly.

### Contribute
Please contribute to the project if you know how to make it better, including this README :)
