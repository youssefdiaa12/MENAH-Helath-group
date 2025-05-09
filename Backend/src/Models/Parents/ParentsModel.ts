import client from "../../utilies/database";
// import {} from "../../Types/Parents"


// export class ParentModel{
//     async Select(searchValue:string,field: string): Promise<BabyInfo|null>{
//         try{
//             const connection = await client.connect();
//             const SelectBabyQuery = `select * from public.baby where ${field}=($1)`;
//             const Baby = await connection.query(SelectBabyQuery,[searchValue]);
//             if(typeof Baby.rows[0] === 'undefined'){
//                 return null;
//             }
//             return Baby.rows[0];

//         }
//         catch(error){
//             throw new Error(`baby selection error in baby models: ${error}`);
//         }
//     }
// }