# firebase-auto-ids [![Build Status](https://travis-ci.org/bendrucker/firebase-auto-ids.svg?branch=master)](https://travis-ci.org/bendrucker/firebase-auto-ids)

Generate random time-based, collision-proof IDs a la [`Firebase.push`](https://www.firebase.com/docs/web/api/firebase/push.html). Designed for testing and education (readability), not performance.

## Installing

```sh
$ npm install firebase-auto-ids
```

## API

##### `generateAutoId(now)` -> `String`

firebase-auto-ids exports a single function. Pass in `now`, the current timestamp (e.g. `Date.now()`). `generateAutoId` returns an ID string. Like `Firebase.push`, IDs hold the following properties:

* `id1` < `id2` where `id1` was created at an earlier time (`now`) than `id2`
* `id1` < `id2` where `id1` and `id2` were created at the same `now` but `generateAutoId` was executed for `id1` before `id2`
* `id1` !== `id2` where `id1` and `id2` were created at the same `now` in different clients
