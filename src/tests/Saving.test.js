import {render, screen} from "@testing-library/svelte"

import Saving from "../components/Saving.svelte"

const text = {
    saving: "saving",
}

test("shows saving", () => {
    render(Saving)
    expect(screen.getByText(text.saving)).toBeInTheDocument()
})
