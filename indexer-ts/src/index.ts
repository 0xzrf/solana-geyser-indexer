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
    const stream = await client.subscribe();
    const streamClosed = new Promise<void>((resolve, reject) => {
        stream.on("error", (error) => {
          reject(error);
          stream.end();
        });
        stream.on("end", () => resolve());
        stream.on("close", () => resolve());
      });

      stream.on("data", handleUpdate);
      const subscribeRequest: SubscribeRequest = {
        accounts: {},
        slots: {},
        transactions: {
          group: {
            accountInclude: ["So11111111111111111111111111111111111111112"],
            accountExclude: [],
            accountRequired: [],
          },
        },
        transactionsStatus: {
          group: {
            accountInclude: ["So11111111111111111111111111111111111111112"],
            accountExclude: [],
            accountRequired: [],
            failed: false
          },
        },
        blocks: {},
        blocksMeta: {},
        entry: {},
        accountsDataSlice: [],
        commitment: 1
      };
    
      // subscribe
      await new Promise<void>((resolve, reject) => {
        stream.write(subscribeRequest, (error: any) => {
          if (error) reject(error);
          else resolve();
        });
      }).catch((reason) => {
        console.error(reason);
        throw reason;
      });
    
      await streamClosed;
}


run()