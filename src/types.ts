export interface Register {
  username: string;
  password: string;
  identifier: string;
}

export interface Login {
  password: string;
  identifier: string;
}

export interface VerifyOtp {
  otp: number;
  password: string;
  identifier: string;
}

export interface ResendOtp {
  identifier: string;
}

export interface HeroCarousel {
  image: string;
  priority: number;
}

export interface StepTellsStory {
  image1: string;
  image2: string;
  created: string;
  updated: string;
}

export interface ThumbNail {
  image: string;
  title: string;
  updated: string;
  video_url: string;
  description: string;
}

export interface AboutBanner {
  title: string;
  image: string;
  banner: string;
  created: string;
  updated: string;
  description: string;
}

export interface ContactBanner {
  image: string;
  created: string;
  updated: string;
}

export interface CustomerReview {
  name: string;
  image: string | null;
  rating: number;
  created: string;
  updated: string;
  description: string;
}

export interface Category {
  id:number;
  name: string;
  image: string;
  priority: number;
  unique_id: string;
  description: string;
  display_name1: string;
  display_name2: string;
  is_available: boolean;
  special_tags: string;
  special_offer: string;
}

export interface ProductImages {
  id: number;
  image: string;
  product: number;
}

export interface Ingredients {
  id: number;
  product: Products;
  name: string;
  quantity: number;
}

export interface Steps {
  id: number;
  heading: string;
  details: string;
  prepare: number;
  step_number: number;
}

export interface Preparation {
  id: number;
  steps: Steps[];
  product: number;
  overview: string;
}

export interface Weight {
  id: number;
  weight: string;
  price: number;
  old_price: number;
  offer_price: number;
  serving_count: number;
  is_available: boolean;
}

export interface Products {
  id: number;
  name: string;
  image: string;
  price: number;
  weight: string;
  rating: number;
  images: ProductImages[];
  category: number;
  old_price: number;
  weights: Weight[];
  unique_id: string;
  is_offered: boolean;
  updated_at: string;
  created_at: string;
  ingredients: Ingredients[];
  category_id: string | null;
  description: string;
  offer_price: number;
  preparations: Preparation[];
  is_available: boolean;
  prepare_time: number;
  special_offer: string;
  category_name: string;
  serving_count: number;
  difficulty_level: string;
}

export interface RecipeSteps {
  id: number;
  step_number: number;
  step_title: string;
  instruction: string;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  steps: RecipeSteps[];
  is_main: boolean;
  subtitle: string;
  video_url: string;
  is_featured: boolean;
  description: string;
  ingredients: string;
}

export interface Contact {
  id?: number;
  name: string;
  email: string;
  message: string;
}

export interface CartItem {
  id: string; // product unique id (for key)
  cartItemId: number; // actual cart item ID (for API)
  name: string;
  price: number;
  original_price: number | null;
  quantity: number;
  image: string;
  category: string;
  weight: string;
  sub_total: number;
  product: Products;
}

export interface Cart {
  id: number;
  cart_id: string;
  items: CartItem[];
  total_price: number;
  total_items: number;
}

export interface UserAddress {
  id: number;
  user: number;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  landmark: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface CheckoutItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface PaymentPayload {
  amount: number;
  address_id: string;
  shipping_charge: number;
  order_items: {
    product: { unique_id: number | string };
    quantity: number;
    sub_total: number;
  }[];
}

export interface RazorpayOrderResponse {
  success: boolean;
  message: string;
  amount: number;
  currency: string;
  key: string;
  order_id: string;
  razorpay_order: {
    id: string;
    amount: number;
    currency: string;
    amount_due: number;
    amount_paid: number;
    status: string;
    attempts: number;
    created_at: number;
  };
}

export interface UserOrder {
  id: number;
  user: number;
  invoice: string;
  order_id: string;
  total_amount: number;
  final_amount: number;
  discount_amount: number;
  shipping_address: string;
  shipping_charge: number;
  created: string;
  is_paid: boolean;
  items: {
    id: number;
    price: number;
    product: Products;
    quantity: number;
    sub_total: number;
  }[];
  razorpay_order_id: string | null;
  razorpay_signature: string | null;
  razorpay_payment_id: string | null;
  updated: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}
