# easy-number-formatter
 Simple Number format script (Convert 1000 - 1K)

## About
Using this NPM package you will be able to convert large numbers to a simple text format,
* 1000 - 1K
* 1,000,000 - 1M
* 1,000,000,000 - 1B
* 1,000,000,000,000 - 1T

## Installation 
``npm i easy-number-formatter``

## Usage
```javascript
const number = require('easy-number-formatter')

var newNum = number.formatNumber(1000)

console.log(newNum)
```
