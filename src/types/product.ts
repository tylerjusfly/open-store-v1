export type IProducts = {
    id: string
    name: string 
    image_src : string
    amount : number
    stock: number
    rating: number | undefined
    categoryid: any
}

export interface ICategory {
  id: string;
  category_name: string;
  shop_name: string;
  category_postion: string;
}
export interface IPaging {
  totalItems: number;
  currentPage: number;
  totalpages: number;
  itemsPerPage: number;
}