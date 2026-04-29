export interface ICartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: ICartData;
}

export interface ICartData {
  _id: string;
  cartOwner: string;
  products: ICartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface ICartProduct {
  count: number;
  _id: string;
  product: IProductDetails;
  price: number;
}

export interface IProductDetails {
  subcategory: ISubcategory[];
  _id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  category: ICategory;
  brand: ICategory; // الـ Brand والـ Category ليهم نفس الشكل فممكن نستخدم نفس الـ Interface
  ratingsAverage: number;
  id: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image?: string; // علامة الاستفهام لأن الصورة موجودة في الـ Category بس مش الـ Brand في الـ JSON بتاعك
}

export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
