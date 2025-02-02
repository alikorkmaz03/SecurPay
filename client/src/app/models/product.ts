export interface Product{
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    type?: string;
    brand: string;
    quantityInStock?: number;
}///? işareti ekleyerek bu parametre zorunlu olarak data beklemicek boşda geçilebilir dedik yani :)


export interface ProductParams {
    orderBy: string;
    searchTerm?: string;
    types: string[];
    brands: string[];
    pageNumber: number;
    pageSize: number;
    startDate?: string;
    endDate?: string;   
}