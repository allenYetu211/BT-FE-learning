// ES6中的proxy方式是通过Proxy构造函数来new一个实例，此实例代理拦截目标对象的操作，所以对于深层递归new出来的子对象实例是无法操作的

function Observe(data) {
    return new Proxy(data, {
        get: function(target, key) {
            if (key in target) {
                if (data.hasOwnProperty(key) && typeof data[key] === 'object') {
                    new Observe(data[key]);
                }
                console.log(`你访问了： ${key}`)
                return target[key]
            }
        },

        set: function(target, key, newVal) {
            console.log('你设置了：' + key);
            console.log(`新的 ${key} = ${newVal}`)
            target[key] = newVal
        }
    })
}

let data = {
    name: 'allen',
    age: '21',
    infor: {
        try1: '101',
        try2: '102'
    }
}

let p = new Observe(data)


// ES5 中的 Object.defineProperty()对每一个深层递归出来的子对象进行 设置 get 和set 属性。


// function Observers (data) {
//   this.data = data;
//   this.handler(data)
// }


// 实现$watch 属性监听
class Events {
  constructor () {
    this.events = {}
  }

  // 传入监听对象，对应回调函数
  on (attr, callback) {
    /**
     * [if description]
     * @param   判断监听的对象是否已经存在，  存在则继续添加监听事件，否则将事件赋于this.events
     * @return 
     * 
     */
    if (this.events[attr]) {
      this.events[attr].push(callback)
    } else {
      this.events[attr] = [callback]
    }
  }

  /**
   * [off description] 关闭监听
   * @return {[type]} [description]
   */
  off (attr) {
    for (let key in this.events) {
      if (this.events.hasOwnProperty(key) && key === attr) {
        delete this.events[key]
      }
    }
  }


  emit(attr, ...arg) {
    this.events[attr] && this.events[attr].forEach((item) => {

      item(...arg)
    })
  }

}

class Obsers {
    constructor(data) {
        this.data = data
        this.handler(data)
        this.eventsBus = new Events()
    }

    handler(obj) {
        let val;
        for (let key in obj) {
            val = obj[key]
            if (obj.hasOwnProperty(key)) {
                val = obj[key]
                if (typeof val === 'object') {
                    new Obsers(val)
                }
            }
            this.setterAndGetter(key, val);
        }
    }

    setterAndGetter(key, val) {
      let self = this
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                console.log(`访问到了 ${key}`)
                return val
            },
            set: function(newVal) {
                console.log(`设置了新值: ${newVal}`);
                self.eventsBus.emit(key, val, newVal)
                if (typeof newVal === 'object') {
                  new Obsers(val)
                }
                if (val === newVal) return
                val = newVal
            }
        })
    }

    $watch (attr, callback) {
      this.eventsBus.on(attr, callback)
    }

}

let _d = {
    name: 'allen',
    age: '21',
    info: {
        try: '_1',
        try2: '_2'
    }
}

let _p = new Obsers(_d)


_p.$watch('age', function(oldVal, newVal){
    console.log(`我的年龄变了，原来是: ${oldVal}岁，现在是：${newVal}岁了`)
})

_p.$watch('age', function(oldVal, newVal){
    console.log(`我的年龄真的变了诶，竟然年轻了${oldVal - newVal}岁`)
})

_p.$watch('info', function(oldVal, newVal){
    console.log(`触发了infor`)
})

_p.$watch('info', function(oldVal, newVal){
    console.log(`触发了infor`)
})