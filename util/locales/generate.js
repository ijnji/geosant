'use strict';

const fs = require('fs');
const fname = 'locales.js';
const withCountry = require('./withCountry.js');
const withCoordinates = require('./withCoordinates.js');

function coordsLookup(pat) {
    for (let i = 0; i < withCoordinates.length; i++) {
        if (withCoordinates[i].city_wiki.indexOf(pat) > -1) {
            return withCoordinates[i];
        }
    }
    return -1;
}

function coordsConvert(str) {
    let rDeg = new RegExp('-*[0-9]+°');
    let rMin = new RegExp('[0-9]+′');
    let deg = str.match(rDeg)[0];
    let min = str.match(rMin)[0];
    deg = Number(deg.slice(0, deg.length - 1));
    min = Number(min.slice(0, min.length - 1));
    if (deg < 0) {
        return deg - (min / 60);
    } else {
        return deg + (min / 60);
    }
}

withCountry.forEach(function(elem) {
    let str = elem.city.replace(/ /g, '_');
    str = encodeURI(str);
    str = str.replace(/'/g, '%27');
    let coordsEntry = coordsLookup(str);
    if (coordsEntry) {
        elem.lat = coordsConvert(coordsEntry.lat);
        elem.lng = coordsConvert(coordsEntry.lng);
    }
});

fs.writeFile(fname, '');
let str = '';
str += '\'use strict\';\r\n';
str += '\r\n';
str += 'const LOCALES = [{\r\n';
fs.appendFileSync(fname, str);

str = '';
withCountry.forEach(function(elem, idx) {
    str += '    id: ' + idx + ',\r\n';
    str += '    city: "' + elem.city + '",\r\n';
    str += '    country: "' + elem.country + '",\r\n';
    str += '    lat: "' + elem.lat.toFixed(3) + '",\r\n';
    str += '    lng: "' + elem.lng.toFixed(3) + '"\r\n';
    if (idx === (withCountry.length - 1)) {
        str += '}];\r\n';
    } else {
        str += '}, {\r\n';
    }
});
fs.appendFileSync(fname, str);

str = '';
str += '\r\n';
str += 'module.exports = LOCALES;';
fs.appendFileSync(fname, str);