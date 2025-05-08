export type adminInfo = {
    total_nurses :number,
    total_parents: number,
    total_babies :number,
    pending_approvals : number,
    total_success_verifications : number,
    total_failed_verifications: number
}

export type UserInfo = {
    name: string,
    userName:string,
    email:string,
    phone:string,
    isactive?:boolean
}