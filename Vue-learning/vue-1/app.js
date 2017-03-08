function Observer(data) {
  this.data = data;
  this.walk(data);
}

let p = Observer.prototype;

p.walk = function (obj) {
  let val;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key];
      if (typeof val === 'object') {
        new Observer(val)
      }

      this.convert(key, val);
    }
  }
}

p.convert = function (key, val) {
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: false,
    get: function () {
      console.log('你访问了：' + key);
      return val
    },

    set: function (newVal) {
     console.log('你设置了'+ key);
     console.log('新的'+ key + ' = ' + newVal )
      if (newVal === val) return
        val = newVal
    }
  })
}

let data = {
  a: 1,
  b: 2,
  user: {
    name: 'jo',
    age: '21',
    try: {
      try1: 'm1',
      try2: 'm3'
    }
  },

  address: {
    city: 'beijing'
  }
}

let app = new Observer(data)


// function Ofo(data) {
//   this.data = data
//   this.walk(data)
// }
// let o = Ofo.prototype

// o.walk = function (obj) {
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//         let val = obj[key]

//         if (typeof val === 'object') {
//           new Ofo(val)
//         }
//         this.convert(key, val)
//     }
//   }
// }

// o.convert = function (key, val) {
//   Object.defineProperty(this.data, key, {
//     enumerable: true,
//     configurable: true,
//     get: function () {
//       console.log('检测' + key)
//       console.log (val)
//       return val
//     },
//     set: function (newVal) {
//       console.log('设置' + key)
//       console.log('新' + key + '为' + newVla)
//       if (val === newVal) return 
//       val = newVal
//     }
//   })
// }

// let data = {
//   user : {
//     name: 'jo',
//     age: '20'
//   },
//   info: {
//     in: '010'
//   }
// }

// let app = new Ofo(data)