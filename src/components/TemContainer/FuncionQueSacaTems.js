
window.addEventListener('load', () =>{
    const baseUrl = 'https://temtem-api.mael.tech/api/temtems'
let todosLosTems = function() {
    try {
        const response =  fetch(`${baseUrl}`)
        const responseJson =  response.json()
        return responseJson
    } catch (error) {
        console.log(error)
    }
    
}

console.log(todosLosTems)
})
