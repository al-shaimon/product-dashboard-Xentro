export interface Product {
  id: string;
  name: string;
  data: {
    year: number;
    price: number;
    CPU_model: string;
    Hard_disk_size: string;
    color?: string;
    Description?: string;
    [key: string]: string | number | undefined;
  };
}

export interface CreateProductInput {
  name: string;
  data: {
    year: number;
    price: number;
    CPU_model: string;
    Hard_disk_size: string;
    color?: string;
    Description?: string;
  };
}
