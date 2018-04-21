'use strict';
const clear = require('clear'); clear();console.log('');
const people = require('./people');

const {
    filter, reject
    , groupBy
    , maxBy, minBy
    , uniq , uniqBy
    , compact, map
    , flatten, flattenDeep, flattenDepth
    , orderBy
    , countBy
    , partition
    ,sampleSize,sample
    , keyBy
    , last, add
    , chain
    , zip, zipWith
    ,identity
} = require('lodash');
const {take} = require('lodash/fp');

let res;
//res = filter(people, {job: 'Engineer'} );
res = groupBy(people.slice(0,10), (p) => p.likings.color );
// El mayor de todos
// res = maxBy(people, 'age')
// El primero que entró en la empresa
// res = minBy(people, 'startedAt')
// Un ejemplo básico de obtener el máximo
// res = maxBy([90,234,324,234,123,231])
// Obtener todos los valores únicos
// res = uniq([1,2,45,56,99,0,1,2,33,4,45])
// res = uniqBy(people,'name')
// Eliminar valores vacíos o nulos de un array
// res = compact(map(people,'age'))
// Aplanar un array de arrays 
// res = flattenDeep([1,4,[32323],[2323232,434343, [1221],[[232323]]],[3232]],2)
// Ordenamos por edad
// res = orderBy(people,'age')
// Ordenamos por ocupación ascendente y por edad descendnete
// res = orderBy( filter(people,'age'), ['job', 'age'], ['asc', 'desc'] );
// Ejemplo de combinación de funciones
// res = uniq(map(people, 'likings.color'));
// res = countBy(people,'likings.programmingLanguage');
// contamos apariciones de cada elemento
// res = countBy(['hola','pepito','que','pepito','hola']) 
// dividimos el mundo en dos
// res = partition(people,{likings: {programmingLanguage: 'Java'}}) 
// obtenemos 3 aleatorios
// res = sampleSize(people, 3) 
// indexamos por nombre
// res = keyBy(people, 'name'); 
// const take2 = take(2);
// const take4 = take(4);
// res = take4(people)
// res = chain(people) .filter('age') .orderBy('age') .take(5) .last() .value();

// res = (map({a: 1, b: 2, c: 3}, (v,k) => [k,v] ));
console.log( res );
// console.log(zipWith(...res, (a,b,c) => a+b+c));
// console.log( people.length );
console.log('Res lenght:', res.length );








console.log('\n\n\n\n');