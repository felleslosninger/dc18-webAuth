#Id-porten redesign

### How to build

Prerequisites
- NPM
- Ruby
- SASS

1. `npm install`
2. `npm build`


### How to develop

1. `npm start`
This will automatically build the project in the `dev` folder as you edit them.


### Designing Webauthn for MinId

Work in the `demo` folder. You can test stuff there and edit the source files later.

### Using localStorage for demo purposes

For the sake of the demo, we're just storing the data the user enters using
localStorage. In order to automatically populate fields with values from
localStorage, mark the elements with `class='...'` attributes depending on the
content you want them to have.

#### Currently supported class attributes:

- securitykey-name (the user defined name of the security key)
- securitykey-time (the time the security key was registered)
- auth-type (the type of second factor authorization the user has selected,
  in human readable format)

#### Currently used localStorage fields:

- webauthn-device (contains device data such as key name and creation time)
- auth-type (contains one of 'letter', 'sms' or 'webauthn')

#### Example usage:

```html
<!-- gets currently selected auth type and puts it in inner html -->
<span class='auth-type'></span>

<!-- gets current security key device name and puts it in value attr -->
<input type='text' class='securitykey-name' />

<!-- include this file in the "include scripts" section of your html file -->
<script type="text/javascript" src="../../js/update-localstorage-fields.js"></script>
```

**NOTE:** The input tag also receives the data in the inner html - this is not a
problem, precisely, but it's not ideal and is a point of improvement in the
code.
