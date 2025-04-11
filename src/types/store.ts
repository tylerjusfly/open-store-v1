export type IStoreDetails = {
  id: string;
  storename: string;
  domain_name: string;
  display_picture: string | null;
  hero_text: string | null;
} & IStoreCustomization;

  type IStoreCustomization = {
    main_color : string
    hero_svg: string | null
  }

export type IpaymentMethod = "stripe" | "cashapp" | "coinbase" | "paypal" | "hoodpay";