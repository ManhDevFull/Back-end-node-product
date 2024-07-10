module.exports =(query)=>{
    let objectSearch = {
        keySearch:"",
    }
    if (query.keysearch) {
        objectSearch.keySearch = query.keysearch
        const regex = new RegExp(objectSearch.keySearch, "i")
        objectSearch.regex = regex
    }
    return objectSearch
}