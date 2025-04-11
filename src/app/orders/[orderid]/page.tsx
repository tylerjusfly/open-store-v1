import { APIResponse, serverRequest } from "@/configs/serverApi";
import { IOrderDetails } from "@/types/orders";
import SellitReceipt from "./OrderReceipt";

type Props = {
  params: Promise<{ orderid: string }>;
};

const fetchOrderDetails = async (id: string) => {
  try {
    const data: APIResponse<IOrderDetails> = await serverRequest(`orders/one/?orderid=${id}`, "GET", null, "no-cache");

    return data.result;
  } catch (error) {
    return null;
  }
};

export default async function DisplayOrders({ params }: Props) {
  const orderid = (await params).orderid;
  const order_data = await fetchOrderDetails(orderid);

  return <div>{order_data ? <SellitReceipt data={order_data} /> : <h1>NO ORDER</h1>}</div>;
}
