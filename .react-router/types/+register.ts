import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/spacecrafts/:spacecraftId": {
    "spacecraftId": string;
  };
  "/api/theme": {};
};