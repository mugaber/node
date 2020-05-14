// const epxress = require('express')
// const app = epxress()

// simulates taking ms duration to execute

function doWork(duration) {
  const start = Date.now()
  while (Date.now() - start < duration) {}
}

/**
 * @blocking_event_loop
 * the evnet-loop will not be able to process any thing else
 * until the funtion doWork funishes executing
 * and also if another request have been made it will not process
 * it until it finishes the first one which is a lot of time
 */

// app.get('', (req, res) => {
//   const duration = 3000
//   doWork(duration)
//   res.send('hi there from blocked event loop for ' + duration + ' ms')
// })

/**
 * @clustering
 * to boost performance we can use multiple instances of the app
 * every one process incoming requests and that is clustering
 * the first instance that get created creates @cluster_manager
 * that runs @cluster_form that runs the app again and creates
 * another instance to handle requests and process processes
 */

const cluster = require('cluster')
const NumCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log(`Master ${process.pid} running`)

  for (let i = 0; i < NumCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log(`worker ${worker.process.pid} died`)
  })

  //
} else {
  const epxress = require('express')
  const app = epxress()

  app.get('', (req, res) => {
    doWork(3000)
    res.send('hi there')
  })

  app.listen(3000)

  console.log(`worker ${process.pid} started`)
}

/**
 * normal server
 */

// app.get('', (req, res) => {
//   res.send('hi there')
// })

// app.listen(3000, () => console.log('server is running'))
