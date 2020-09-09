// modules
declare module "svelte-routing"
declare module "netlify-identity-widget"

// interfaces
interface Exercise {
    name: string
    round: number | null
}

interface Lap {
    startTime: number
    endTime: number | null
    time: number | null
}

interface Workout {
    id?: string
    date: number
    exercises: Exercise[]
}
