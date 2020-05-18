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
 *
 * when increasing the number of children over the number of
 * either physical or logical cores this will not give us
 * a boost in performance, infact this will make the processing
 * of the requests take much more time because it will make
 * the processor go back and forth between processes to process
 */

const cluster = require('cluster')
const crypto = require('crypto')
const NumCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log(`Master ${process.pid} running`)

  // increase the number of children by double

  for (let i = 0; i < NumCPUs * 2; i++) {
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
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('finished processing')
    })
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
