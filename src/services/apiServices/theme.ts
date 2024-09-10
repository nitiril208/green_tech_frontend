import api from "./api"

export const changeTheme = (id:string) =>{
        const url = `api/v1/theme/get?clientId=${id}`
        return api({url})
}