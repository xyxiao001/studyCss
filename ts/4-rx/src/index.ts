import * as rxjs from 'rxjs';
import { scan, throttleTime, map, multicast } from 'rxjs/operators';

console.log(rxjs)

const { fromEvent } = rxjs

const button1:HTMLButtonElement = document.querySelector('#test1')

// 绑定一个按钮的点击事件
fromEvent(button1, 'click')
.subscribe(() => console.log('Clicked!'))


const button2:HTMLButtonElement = document.querySelector('#test2')

// 一个累加的计数器
fromEvent(button2, 'click')
.pipe(
  scan((count:any) => count + 1, 0)
)
.subscribe(count => console.log(`Clicked ${count} times`))



const button3:HTMLButtonElement = document.querySelector('#test3')

// 1s点一次的计数器
fromEvent(button3, 'click')
.pipe(
  throttleTime(1000),
  scan((count:any) => count + 1, 0)
)
.subscribe(count => console.log(`Clicked ${count} times`))



const button4:HTMLButtonElement = document.querySelector('#test4')

// 1s点一次的计数器
fromEvent(button4, 'click')
.pipe(
  throttleTime(1000),
  map((event:any) => event.clientX),
  scan((count, clientX) => count + clientX, 0)
)
.subscribe(count => console.log(`Clicked ${count} px`))


// 惰性求值
const Observable:any  = rxjs.Observable
const observable = Observable.create((observer: any) => {
  observer.next(1)
  observer.next(2)
  observer.next(3)
  setTimeout(() => {
    observer.next(4)
    observer.complete()
  }, 1500)
})

// 订阅之前
console.log('订阅之前')
observable.subscribe({
  next: (x:any) => console.log('got value ' + x),
  error: (err:any) => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
// 订阅之后
console.log('订阅之后')

// 每个 Subject 都是观察者
const subject = new rxjs.Subject()
subject.subscribe({
  next: (v) => console.log(`observe1 ${v}`)
})

subject.subscribe({
  next: (v) => console.log(`observe2 ${v}`)
})

// subject.next(1)
// subject.next(2)

const observable2 = rxjs.from([1, 2, 3])

observable2.subscribe(subject)