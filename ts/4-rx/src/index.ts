import * as rxjs from 'rxjs';
import { scan, throttleTime, map, multicast } from 'rxjs/operators';
// import { Scheduler } from 'rxjs';
// import { Action } from 'rxjs/internal/scheduler/Action';

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
    console.log('setTimeout异步代码')
    observer.next(4)
    observer.complete()
  }, 500)
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

// BehaviorSubjects 适合用来表示“随时间推移的值”。举例来说，生日的流是一个 Subject，但年龄的流应该是一个 BehaviorSubject 。

const subject2 = new rxjs.BehaviorSubject(0)
// 0是初始的值

subject2.subscribe({
  next: (v) => console.log(`behaviorSubjects+1: ${v}`)
})

subject2.next(1)
subject2.next(2)

// 订阅时会自动推送最新的值
subject2.subscribe({
  next: (v) => console.log(`behaviorSubjects+2: ${v}`)
})

subject2.next(3)

// ReplaySubject 记录 Observable 执行中的多个值并将其回放给新的订阅者。
const subject3 = new rxjs.ReplaySubject(2)
// 2代表推送最近的两个值  第二个参数表示多久时间之内的值

subject3.subscribe({
  next: (v) => console.log(`replaySubjects+1: ${v}`)
})

subject3.next(1)
subject3.next(2)
subject3.next(3)
subject3.next(4)

// 订阅时会自动推送最新的值
subject3.subscribe({
  next: (v) => console.log(`replaySubjects+2: ${v}`)
})

subject3.next(5)

// AsyncSubject  只有complete时才将最后一个值推送


console.log('----------- 调度器')
// scheduler;

// interface SchedulerLike {
//   now(): number
//   schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription
// }

// interface Subscription {
// }

// class Scheduler implements SchedulerLike {
//   static now: () => number
//   constructor(SchedulerAction: typeof Action, now: () => number = Scheduler.now) {
//   }
//   now: () => number
//   schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay: number = 0, state?: T): Subscription {
//     return 1
//   }
// }

// console.log(rxjs.Scheduler)
// const task = () => console.log('it works!');

// rxjs.Scheduler.async.schedule(task, 2000);
