'use strict';
// require('clear').clear(); console.log('');

const {
    upperFirst,
    upperCase,
    truncate,
    startCase,
    lowerFirst,
    snakeCase,
    camelCase,
    kebabCase,
    capitalize,
    escape,
    unescape,
    repeat,
} = require('lodash');

const frase = 'Hola amigazo que tal';
const nombre = 'manolo'
const regex = '/[0-9]+\w+/i'
const variable = 'unaVariable'
const larga = 'este es un torozo de texto potencialmente largo, pero tampoco me quiero enrollar demasiado'
const upper = 'TODO MAYÚSCULAS'
const html = '<span>Some html text<b> in a string</b></span>'
const snake = 'this_is_snake_case'
const kebab = 'this-is-kebab-case'
const camel = 'thisIsCamelCase'

