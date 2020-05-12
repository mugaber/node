/**
 * @execution & @event_loop
 * when we execute a node file it goes through line by line and
 * execute them, however there are three processes that get exe
 * later and the @event_loop is what schedule their execution
 * based on the time that they will take to finish inorder for
 * the event_loop that handles processes not to be blocked
 * and keep cary executing other functions that will exe with
 * out delay
 *
 * thses processes are : @timers , @OS_tasks , @thread_pool
 *
 * after finishing all executions the program will get back to
 * the terminal but after making sure that there is not other
 * tasks that are delayed or scheduled to run later
 */

/**
 * @single_threaded & @thread_pool
 * even though Node is single threaded however the core module @libuv
 * provides a thread pool that can run computations in all available
 * threads so the main event-loop will not be blocked while those
 * processes are occuring
 */

/**
 * In this example because this the first 4 processes will take up
 * the 4 threads and will take roughly twice as long to   complete
 * because there is only 2 cores, the 5th one will take only   one
 * sec becasue now all threads are empty
 */

function testThreadPool() {
  const crypto = require('crypto')

  const start = Date.now()

  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('1:', Date.now() - start)
  })

  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('2:', Date.now() - start)
  })

  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('3:', Date.now() - start)
  })

  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('4:', Date.now() - start)
  })

  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('5:', Date.now() - start)
  })
}

// testThreadPool()

/**
 * @uvlib_delegation
 * for making https requests the uvlib delegates these requests
 * to the OS so there will be no block for the event-loop and
 * at the same time the OS will take care of finishing all of
 * them at the same time, using multi-threading and distibution
 * of processes to the cpu cores (!)
 *
 * this is one of the os taks and they mostly related with network
 * stuff and processes
 */

const https = require('https')

const startTime = Date.now()

const makeRequest = () => {
  https
    .request('https://google.com', res => {
      res.on('data', () => {})
      res.on('end', () => console.log(Date.now() - startTime))
    })
    .end()
}

function makeRequests() {
  for (let i = 0; i < 5; i++) {
    makeRequest()
  }
}

// makeRequests()

/**
 * @hard_drive & @thread_pool & @os_tasks
 *
 * here in this example if we are having like normal 4 threads
 * the file system function will not be called the first one
 * as it should be but it will take roughly the time to do hash
 * plus to read the file, that's because the file system oper.
 * it devided into two parts by calling the hard_drive gettings
 * stats then another process actually reading the file stream
 *
 * however if we increase the @thread_pool size as shown below
 * we now have room for more processes then the file system
 * operations will not going to take that much time 60 ms
 * and the rest will take roughly the same amount of time
 * based on the cpu distributing the work between all threads
 */

// process.env.UV_THREADPOOL_SIZE = 6

const fs = require('fs')

const startTimeFS = Date.now()

function readThisFile() {
  fs.readFile('handling.js', () => {
    console.log('FS:', Date.now() - startTimeFS)
  })
}

// readThisFile()
// testThreadPool()
