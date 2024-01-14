import {ElNotification} from "element-plus";

export function showSuccess (text)
{
    ElNotification({
        title: 'Success',
        type: "success",
        position: "top-right",
        message: text
    })
}
export function raiseError (text)
{
    ElNotification({
        title: 'Error',
        type: "error",
        position: "top-right",
        message: text
    })
}
export function raiseServerError(err){
    err?.response?.data?.errors?.forEach(obj=>{
        setTimeout(function (){
            ElNotification({
                title: `${obj?.attr ? obj?.attr?.[0]?.toUpperCase() :'Error'}${obj?.attr ? obj?.attr?.substring(1) :''}`,
                type: "warning",
                position: "top-right",
                message: obj?.detail,
            })
        },2)

    })
}

export function deleteLocalStorageInformation(){
    localStorage.removeItem("authData")
    localStorage.removeItem("userDetails")
}






export default {}