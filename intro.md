# Node

it's a JavaScript run-time that makes js runs on servers\
it's built on top of the chrome JS engine V8

## Features

1. **Single threaded**\
   it runs on only one thread handling and manages the operatoins using\
   the `event loop`
1. **Non-blocking I/O**\
   if a process will take time to be finished will take be handled by\
   the event loop later so the I/O will not be blocked and can process ops
1. **Fast**\
   because of it's non blocking nature expensive operations that takes time\
   can be handled by call back or probmises
