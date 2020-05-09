const path = require('path')

/**
 * @Loose_Typing
 * every thing in node is either one of the follwoing perimitives
 * @String @Boolean @Null @Undefined
 * or an @Object like @Function @Regex @Object @Array
 * permitives are passed by value but objects passed by reference
 *
 * there are also objects for permitive types that contain helpers
 */

// console.log('a' === new Object('a')) // false
// console.log('a' === new Object('a').toString()) // true

/**
 * @Buffer
 * is the perimitive data type in node and it's so efficint
 */

const stringBuffer = Buffer.from('¿Cómo está?')
// console.log(stringBuffer.toString()) // utf-8 by default
// console.log(stringBuffer.toString('utf-8'))
// console.log(stringBuffer.toString('ascii'))

/**
 * @Function
 * there are different ways of defining functions
 * functions are objects so we can add data attrs
 */

// with hoisting
function canBeHoisted() {
  console.log('hi there')
}

// no hoisting
const noHoisting = function () {
  console.log('hi there too')
}

// preserve the root this
const preserveThis = () => {
  console.log('oh mine')
}

preserveThis.hiThere = 'hi there'
// console.log(preserveThis.hiThere)

/**
 * @Array
 */

const handsomArray = ['1', 2, () => console.log('mine from handsom array element')]
// handsomArray[2]()

/**
 * @Class
 * before ES6 there was protypal inheritance which ment object inhirint directly
 * from other objects, however after ES6 things are much easier
 */

class BaseMoel {
  constructor(options = {}, data = []) {
    this.options = options
    this.data = data
    this.name = 'BaseModel'
  }

  getName() {
    return this.name
  }
}

class ExtendedModel extends BaseMoel {
  constructor(options, data) {
    super(options, data)
    this.name += ' extended'
  }

  get extendedModelData() {
    return this.data
  }
}

// const extendedModelInstance = new ExtendedModel()
// console.log(extendedModelInstance.name)

/**
 * @Global - @Process
 * global variable resembles the env process
 */

//  console.log(global.process)

// console.log(process.uptime())
// console.log(process.memoryUsage())

// console.log(process.pid)
// console.log(process.env)

/**
 * @path
 */

const randomStuf = path.join(__dirname, 'model', 'user')
// console.log(randomStuf)

/**
 * @__dirname vs @process_cwd
 * __diranme : absolute path to the source code
 * cwd : absolute path to the running folder
 */

// console.log(__dirname)
// console.log(process.cwd())
