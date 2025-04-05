import { IpaymentMethod } from "./store";

interface PaymentOption {
  title: string;
  icon: string;
  color: string;
}

export const paymentOptions: Record<IpaymentMethod, PaymentOption> =  {
  cashapp: {
    title: "Cashapp",
    icon: "cib:cashapp",
    color: "#08d038",
  },
  coinbase: {
    title: "Coinbase Commerce",
    icon: "meteor-icons:coinbase",
    color: "#0857ff",
  },
  stripe: {
    title: "Stripe",
    icon: "logos:stripe",
    color: "#635bff",
  },
  paypal: {
    title: "Stripe",
    icon: "logos:stripe",
    color: "#635bff",
  },
  hoodpay: {
    title: "Stripe",
    icon: "logos:stripe",
    color: "#635bff",
  },
  
} ;