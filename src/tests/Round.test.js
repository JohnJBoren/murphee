import format from "date-fns"
import userEvent from "@testing-library/user-event"
import {render, screen, waitFor} from "@testing-library/svelte"

import Round from "../components/Round.svelte"

const ids = {
    round: "round",
}

const labels = {
    expand: "expand",
}

const runRound = {
    number: null,
    time: 30000,
    exercises: [
        {
            name: "1 mile run",
            time: 30000,
        },
    ],
}

const exerciseRound = {
    number: 2,
    time: 30000,
    exercises: [
        {
            name: "pull ups",
            time: 5000,
        },
        {
            name: "push ups",
            time: 10000,
        },
        {
            name: "squats",
            time: 15000,
        },
    ],
}

test("shows round and time", () => {
    render(Round, {round: exerciseRound})

    expect(
        screen.getByText(`Round ${exerciseRound.number}`),
    ).toBeInTheDocument()

    expect(screen.getByText("00:30:00")).toBeInTheDocument()
})

test("expands on click", () => {
    render(Round, {round: exerciseRound})

    expect(screen.getByTestId(ids.round)).toHaveClass("cursor-pointer")

    userEvent.click(screen.getByText(`Round ${exerciseRound.number}`))

    waitFor(() => {
        expect(screen.getByLabelText(labels.expand)).toBeInTheDocument()
        expect(screen.getByLabelText(labels.expand)).toHaveClass("rotate-90")
    })

    exerciseRound.exercises.forEach(exercise => {
        waitFor(() => {
            expect(screen.getByText(exercise.name)).toBeInTheDocument()
            expect(
                screen.getByText(format(exercise.time, "mm:ss:SS")),
            ).toBeInTheDocument()
        })
    })

    expect(screen.getByText("00:30:00")).toBeInTheDocument()
})

test("does not expand runs", () => {
    render(Round, {round: runRound})

    expect(screen.getByTestId(ids.round)).toHaveClass("cursor-default")
})
