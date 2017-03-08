class Observer {
  constructor(data) {
      this.data = data
      this.walk(data)
      this.subscribers = {}
    }


 
    /**
     * [walk description]
     * @param  
     */
  walk(obj, path) {
    Object.keys(obj).forEach(key => {
      // val = obj[key]
      // if (typeof val === 'object') {
      //   new Observer(val)
      // }
      // this.convert(key, val)
      this.defineReactive(obj, key, obj[key], path)
    })
  }
 /**
   * [observe description]
   * @param  触发对象
   * @param  触发路径
   * @return 将目标对象 与 路径 重新定义观察
   */

  observe(value, path) {
    if (!value || typeof value !== 'object') return
    if (path) {
      path = path + '.'
    }
    this.walk(value, path)
  }

  defineReactive(obj, key, val, path) {
    let self = this
    if (!path) {
      path = key
    } else {
      path = path + key
    }
    this.observe(val, path)

    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        return val
      },
      set(newVal) {
        if (newVal === val) return
        val = newVal
        self.$notify(path || key)
        self.observe(newVal, path)
      }
    })
  }


  /**
   * [$watch description]
   * @param 观察者
   */
  $watch(key, cb) {
    if (typeof cb != 'function') {
      console.log('you need pass a function as callback')
      return
    }
    if (!this.subscribers[key]) this.subscribers[key] = []
    this.subscribers[key].push(cb)
  }
    /**
     * [$notify description]
     * @param 通知
     * 
     */
  $notify(path) {
    const keys = path.split('.')
    const depPaths = keys.map((key, index) => {
      if (index == 0) {
        return key
      } else {
        let str = ''
        while (index--) {
          str = keys[index] + '.' + str
        }
        return str + key
      }
    })
    depPaths.forEach((path) => {
      const fns = this.subscribers[path]
      if (fns && fns.length) {
          fns.forEach(fn => fn && fn(this.$getValue(path)))
      }
    })
  }

  $getValue(exp) {
    const path = exp.split('.')
    let val = this.data
    path.forEach(k => val = val[k])
    return val
  }

}


    /**
     * [convert description]
     * @param  {[type]} key  传入键名
     * @param  {[type]} val  传入值
     * @param  为对象上的每个属性添加 get set 方法
     */
    // convert(key, val) {
    //  let dep = new Dep
    //   /**
    //    * [ Object.defineProperty]
    //    * @param  {[type]}  obj 需要定义的属性对象
    //    * @param  {[type]} 需定义或修改的属性的名字
    //    * @return {[type]}           [description]
    //    */

  //   /**
  //    * 只要对象发生改变就会触发 set
  //    */
  //   Object.defineProperty(this.data, key, {
  //     enumerable: true,
  //     configurable: true,

  //     get() {
  //       console.log(` 访问到 ${key} `)
  //       return val
  //     },

  //     set(newVal) {
  //       console.log(` 新的值 ${newVal} `)
  //       if (val === newVal) return
  //       if (typeof newVal === 'object') new Observer(newVal)
  //       val = newVal
  //       dep.notify()
  //     }
  //   })
  // }

/**
 * [Dep description]
 * @type 维护一个数组，这个数组，就放订阅着，一旦触发notify，订阅者就调用自己的update方法
 */

// class Dep {
//   constructor() {
//     this.subs = []
//   }

//   addSub(sub) {
//     this.subs.push(sub)
//   }

//   notify() {
//     this.subs.forEach(sub => sub.updata())
//   }
// }

  // test
  let a2 = new Observer({
    name: {
      firstName: 'shaofeng',
      lastName: 'liang'
    },
    age: 25
  })

  a2.$watch('name', function(newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
  })

  a2.data.name.firstName = 'hahaha'
    // 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
  a2.data.name.lastName = 'blablabla'
    // 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。


/**
 *  测试1
 */

// let test1 = {
//   name: 'alllll',
//   info: 'test2',
//   age: '21'
// }

// let ps = new Observer(test1)
