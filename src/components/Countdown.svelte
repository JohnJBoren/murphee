<script>
    export let onCompleted

    let id
    const countdown = 3

    id = setInterval(() => {
        if (countdown === 1) {
            clearInterval(id)
            onCompleted()
            return
        }

        // countdown = countdown - 1
    }, 1000)

    const audio = document.getElementById("countdown")
    audio.play()
</script>

<!-- <p class="text-center font-body text-black text-7xl">{countdown}</p> -->

<div class="flex flex-row justify-center font-body font-bold gap-32">
    <div
        class="flex items-center justify-center w-48 h-48 text-white
            rounded-full border-solid border-white border-8 text-7xl bg-green">
        3
    </div>

    <div
        class="flex items-center justify-center w-48 h-48 -mx-40 text-white
            rounded-full border-solid border-white border-8 text-7xl bg-yellow">
        2
    </div>

    <div
        class="flex items-center justify-center w-48 h-48 text-white
            rounded-full border-solid border-white border-8 text-7xl bg-red">
        1
    </div>
</div>
