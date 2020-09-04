import {derived, writable} from "svelte/store"

import {laps} from "./timer.js"
import {exercises} from "./exercises.js"

const workout = derived([laps, exercises], ([$laps, $exercises]) => {
    return $exercises.map((exercise, index) => ({
        ...exercise,
        ...$laps[index],
    }))
})

const date = writable(null)
const completed = writable(false)

const resetWorkout = (): void => {
    date.set(null)
    completed.set(false)
}

export {date, completed, workout, resetWorkout}
