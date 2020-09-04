import {writable, get} from "svelte/store"

const load = (name: string) => {
    const item = localStorage.getItem(name)
    let value: number | boolean

    switch (name) {
        case "runs":
            value = item ? item === "true" : true
            break

        case "rounds":
            value = item ? parseInt(item) : 20
            break
    }

    return value
}

const save = (): void => {
    localStorage.setItem("runs", get(runs))
    localStorage.setItem("rounds", get(rounds))
}

const runs = writable(load("runs"))
const rounds = writable(load("rounds"))

export {runs, rounds, save}
