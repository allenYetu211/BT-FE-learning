class Observer {
   constructor(data) {
       this.data = data
       this.walk(data)
     }
     /**
      * [walk description]
      * @param  递归深度遍历对象 
      */
   walk(obj) {
     let val
     Object.keys(obj).forEach(key => {
       val = obj[key]
       if (typeof val === 'object') {
         new Observer(val)
       }
       this.convert(key, val)
     })
   }
   /**
    * [convert description]
    * @param  {[type]} key  传入键名
    * @param  {[type]} val  传入值
    * @param  为对象上的每个属性添加 get set 方法
    */
   convert(key, val) {
    let dep = new Dep
     /**
      * [ Object.defineProperty]
      * @param  {[type]}  obj 需要定义的属性对象
      * @param  {[type]} 需定义或修改的属性的名字
      * @return {[type]}           [description]
      */

     /**
      * 只要对象发生改变就会触发 set
      */
     Object.defineProperty(this.data, key, {
       enumerable: true,
       configurable: true,

       get() {
         console.log(` 访问到 ${key} `)
         return val
       },

       set(newVal) {
         console.log(` 新的值 ${newVal} `)
         if (val === newVal) return
         if (typeof newVal === 'object') new Observer(newVal)
         val = newVal
         dep.notify()
       }
     })
   }
 }

/**
 * [Dep description]
 * @type 维护一个数组，这个数组，就放订阅着，一旦触发notify，订阅者就调用自己的update方法
 */

 class Dep {
  constructor() {
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }

  notify () {
    this.subs.forEach(sub => sub.updata())
  }
 }




 /**
  *  测试1
  */

 let test1 = {
   name: 'alllll',
   info: 'test2',
   age: '21'
 }

 let ps = new Observer(test1)
