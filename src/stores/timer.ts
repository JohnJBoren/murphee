import {writable, get} from "svelte/store"

let id: number
let wakeLock = undefined
let previouslyElapsed = 0

const elapsed = writable(0)
const running = writable(false)
const counting = writable(false)
const laps = writable([{startTime: 0, endTime: null, time: null}] as Lap[])

const start = (): void => {
    if (get(elapsed)) {
        startTimer()
    } else {
        startCountdown()
    }
}

const startCountdown = (): void => {
    counting.set(true)
}

const startTimer = async (): Promise<any> => {
    running.set(true)
    const startTime = Date.now()

    if ("wakeLock" in navigator) {
        // @ts-expect-error navigator has no type
        wakeLock = await navigator.wakeLock.request("screen")
    }

    id = setInterval(() => {
        elapsed.set(previouslyElapsed + Date.now() - startTime)
    }, 10)
}

const lap = (): void => {
    const newLaps = get(laps)
    const elapsedTime = get(elapsed)
    const index = newLaps.length - 1

    newLaps[index].endTime = elapsedTime
    newLaps[index].time = newLaps[index].endTime - newLaps[index].startTime

    newLaps.push({
        startTime: elapsedTime,
        endTime: null,
        time: null,
    })

    laps.set(newLaps)
}

const stop = async (): Promise<any> => {
    running.set(false)
    previouslyElapsed = get(elapsed)

    clearInterval(id)

    wakeLock = await wakeLock.release()
}

const resetTimer = (): void => {
    elapsed.set(0)
    running.set(false)
    laps.set([{startTime: 0, endTime: null, time: null}])

    previouslyElapsed = 0

    clearInterval(id)
}

export {
    counting,
    running,
    elapsed,
    laps,
    start,
    startTimer,
    startCountdown,
    lap,
    stop,
    resetTimer,
}
