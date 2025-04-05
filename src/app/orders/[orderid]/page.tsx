import { APIResponse, serverRequest } from "@/configs/serverApi";

type Props = {
  params: Promise<{ orderid: string }>;
};

type IOrderDetails = {
  id: string;
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

  return <div>{JSON.stringify(order_data)}</div>;
}
