export type ebmInfo = {
    id?: number,
    order:number,
    date_of_expression :Date,
    date_of_delivery :Date,
    volume :number,
    mother_id:number
}

export type BottleUsageInfo = {
    id?: number,
    total_volume:number,
    total_volume_used :number,
    total_volume_discarded :number,
    date_of_usage :Date,
    bottle_id:number
}

