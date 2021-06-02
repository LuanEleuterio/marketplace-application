const processing = {
    init: () => {
        document.querySelector(".processing").style.display = "block"
    },

    finalize: () => {
        document.querySelector(".processing").style.display = "none"
    }
}

export default processing