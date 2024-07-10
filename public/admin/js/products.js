// Change status
const btnChangeStatus = document.querySelectorAll("[btn-change-status]")
if (btnChangeStatus.length > 0) {
    const formChange = document.querySelector('#form-change-status')
    const path = formChange.getAttribute('data-path')
    btnChangeStatus.forEach(item => {
        item.addEventListener("click", () => {
            const statusCurrent = item.getAttribute("data-status")
            const id = item.getAttribute("data-id")
            let statusChange = statusCurrent == "active" ? "inactive" : "active"
            const action = `${path}/${statusChange}/${id}?_method=PATCH`
            formChange.action = action
            formChange.submit()
        })
    })
}
// End Change status
// Check All
const checkboxMulti = document.querySelector('[table-check-all]')
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='check-all']")
    const inputIds = checkboxMulti.querySelectorAll("input[name='check']")
    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputIds.forEach(item => {
                item.checked = true
            })
        } else {
            inputIds.forEach(item => {
                item.checked = false
            })

        }
    })
    inputIds.forEach(item => {
        item.addEventListener('click', () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='check']:checked")
            if (countChecked.length == inputIds.length) {
                inputCheckAll.checked = true
            } else {
                inputCheckAll.checked = false
            }
        })
    })
}
// End Check All
// Form Check
const formMulti = document.querySelector('[form-change-multi]')
if (formMulti) {
    formMulti.addEventListener("submit", (e) => {
        e.preventDefault()
        const checkboxMulti = document.querySelector('[table-check-all]')
        const inputChecked = checkboxMulti.querySelectorAll("input[name='check']:checked")
        if(inputChecked.length > 0) {
            const ids=[]
            const inputIds = formMulti.querySelector("input[name='ids']")
            inputChecked.forEach(item => {
                const id = item.value
                ids.push(id)
                inputIds.value = ids.join(', ')
                formMulti.submit()
            })
        } else {
            alert("Vui lòng chọn ít nhất 1 bản ghi")
        }
    })
}
// End Form Check