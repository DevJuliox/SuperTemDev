const baseUrl = 'https://temtem-api.mael.tech/api/temtems'
export async function getTems () {
    try {
        const response = await fetch(`${baseUrl}`)
        const responseJson = await response.json()
        return responseJson
    } catch (error) {
        console.log(error)
    }
    
}

export async function getTemsTyipos (){
    try {
        const response = await fetch('https://temtem-api.mael.tech/api/types')
        const responseJson = await response.json()
        return responseJson
    } catch (error) {
        console.log(error)
    }
    
}

export default {
    getTems,
    getTemsTyipos
}