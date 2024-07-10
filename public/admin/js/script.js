// filter
const btnStatus = document.querySelectorAll('[btn-status]')
if (btnStatus.length > 0) {
    const url = new URL(window.location.href)

    btnStatus.forEach(item => {
        item.addEventListener("click", () => {
            const status = item.getAttribute('btn-status')
            if (status) {
                url.searchParams.set("status", status)
                url.searchParams.delete("page")
            } else {
                url.searchParams.delete("status")
            }

            window.location.href = url.href
        })
    })
}
// end filter
//--------------------------------------------------------------------------------------------------------
// form search
const formSearch = document.querySelector('#formSearch')
if (formSearch) {
    const url = new URL(window.location.href)
    formSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const keySeacch = formSearch.value
            if (keySeacch) {
                url.searchParams.set("keysearch", keySeacch)
                url.searchParams.delete("page")
            } else {
                url.searchParams.delete("keysearch")
            }
            window.location.href = url.href
        }

    })
}
// end form search
//--------------------------------------------------------------------------------------------------------
// btn page
const btnPage = document.querySelectorAll('[btn-page]')
if (btnPage.length > 0) {
    const url = new URL(window.location.href)

    btnPage.forEach(item => {
        item.addEventListener("click", () => {
            const page = item.getAttribute('btn-page')
            if (page) {
                url.searchParams.set("page", page)
            } else {
                url.searchParams.delete("page")
            }

            window.location.href = url.href
        })
    })
}
// end btn page
