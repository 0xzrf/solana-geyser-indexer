import Client, {
    SubscribeRequest,
    SubscribeUpdate,
  } from "@triton-one/yellowstone-grpc";
  
const client = new Client(
    "https://solana-rpc.parafi.tech:10443",
    undefined,
    undefined,
  );
  
  function handleUpdate(data: SubscribeUpdate): void {
    console.dir(data, { depth: 6 });
  }

const run = async () => {

}