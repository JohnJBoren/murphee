import {render, screen} from "@testing-library/svelte"

import Time from "../components/Time.svelte"

test("shows time", () => {
    render(Time, {time: 5000})
    expect(screen.getByText("00:05:00")).toBeInTheDocument()
})

test("blinks", () => {
    render(Time, {time: 5000, blink: true})
    expect(screen.getByText("00:05:00")).toBeInTheDocument()
    expect(screen.getByText("00:05:00")).toHaveClass("blink")
})

test("accepts classes", () => {
    render(Time, {time: 5000, blink: true, class: "testing"})
    expect(screen.getByText("00:05:00")).toBeInTheDocument()
    expect(screen.getByText("00:05:00")).toHaveClass("testing")
})
