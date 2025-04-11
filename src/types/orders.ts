export type IOrderDetails = {
  id: string;
  product_name: string;
  product_price: number;
  product_type: string;
  order_from: string;
  coupon_value: number;
  applied_coupon: 'percent' | 'fixed' | null;
  order_status: string;
  payment_gateway: string;
  created_at: string;
  platform_fee: string;
  total_amount: number;
  qty: number;
  shop_id: {
    id: string;
    storename: string;
    display_picture: string | null
    discord_link: string | null
  };
};
