export type user = {
    id :number,
    username : string,
    firstname : string,
    lastname : string,
    mobile : string,
    profileimage : string,
    password : string,
    profiletype : string,
    isactive:boolean
}


export type userInfo = {
    id :number,
    username : string,
    firstname : string,
    lastname : string,
    mobile : string,
    profileimage : string,
    profiletype : string,
    token?:string,
    isactive :boolean
}

