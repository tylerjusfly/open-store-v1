import React, { ReactNode } from "react";
import Header from "./ServerComponents/Header";
import { headers } from "next/headers";
import { APIResponse, serverRequest } from "@/configs/serverApi";
import { IStoreDetails } from "@/types/store";
import { extractSubdomain } from "@/configs/utils";
import { StoreProvider } from "./Providers/StoreContext";
import Footer from "./ServerComponents/Footer";

interface MainProps {
  children: ReactNode;
}

export default async function Main({ children }: MainProps) {

  const headersList = headers();
  const hostname = (await headersList).get("host");

  // const subdomain = extractSubdomain(hostname|| "fanshop.sellit.app");
  const subdomain = extractSubdomain("fanshop.sellit.app");

  try {
    const data = (await serverRequest(`store/public?storename=${subdomain}`, "GET", null)) as APIResponse<IStoreDetails>;

    return (
      <StoreProvider store={data?.result}>
        <Header store={data.result} />
        {
        children
      }
      <Footer store={data.result}/>
      </StoreProvider>
    );
  } catch (error) {
    console.log("err ==>", error);
    <main className="">
      
      <h1>Error Page</h1>
    </main>;
  }
}
