module.exports = (query) =>{
    let findrStatus = [
        {
            name: "All",
            status: "",
            class: ""
        },
        {
            name: "Active",
            status: "active",
            class: ""
        },
        {
            name: "Inactive",
            status: "inactive",
            class: ""
        }
    ]
    if (query.status) {
        const index = findrStatus.findIndex(item => item.status == query.status)
        findrStatus[index].class = "active"
    } else {
        const index = findrStatus.findIndex(item => item.status == "")
        findrStatus[index].class = "active"
    }
    return findrStatus
}