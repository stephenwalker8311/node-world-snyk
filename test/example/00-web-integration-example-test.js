let test = require('tape')
let tiny = require('tiny-json-http')
let sandbox = require('@architect/sandbox')
let url = 'http://localhost:6666'

/**
 * Sandbox / http test
 * - Demonstrates execising basic web integration tests using the local dev server
 */
test('Set up env', t => {
  t.plan(1)
  t.ok(sandbox, 'sandbox loaded')
})

let end // Saves a reference to be used later to shut down the sandbox
test('Start sandbox', async t => {
  t.plan(1)
  end = await sandbox.start()
  t.ok(end, 'Sandbox started!')
})

test('get / (continuation-passing style)', t => {
  t.plan(1)
  tiny.get({url},
  function win (err, result) {
    if (err) {
      t.fail(err)
      if (err.code === 'ECONNREFUSED')
        console.log(connectionRefused)
    } else {
      t.ok(result, 'Got result', console.log(result.body.toString().substring(0,50) + '...'))
    }
  })
})

test('get / (promise style)', t => {
  t.plan(1)
  tiny.get({url})
    .then(function win (result) {
      t.ok(result, 'Got result:', console.log(result.body.toString().substring(0,50) + '...'))
    })
    .catch(function fail (err) {
      t.fail(err)
      if (err.code === 'ECONNREFUSED')
        console.log(connectionRefused)
    })
})

test('get / (async/await style)', async t => {
  t.plan(1)
  try {
    let result = await tiny.get({url})
    t.ok(result, 'Got result:', console.log(result.body.toString().substring(0,50) + '...'))
  } catch (err) {
    t.fail(err)
    if (err.code === 'ECONNREFUSED')
      console.log(connectionRefused)
  }
})

test('Shut down sandbox', t=> {
  t.plan(1)
  end()
  tiny.get({url},
  function win (err, result) {
    if (err) {
      t.equal(err.code, 'ECONNREFUSED', 'Sandbox succssfully shut down')
    } else {
      t.fail('Sandbox did not shut down')
    }
  })
})

let connectionRefused = 'You are likely seeing connection refused errors because you do not have a `get /` HTTP function and also do not have a `public/index.html` file\nPlease make use of one or the other to respond to web requests at the root of your application'
