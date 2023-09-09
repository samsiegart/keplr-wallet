import React, { FunctionComponent } from "react";
import { WebpageScreen } from "../components/webpage-screen";
import { RouteProp, useRoute } from "@react-navigation/native";
import { experimentalSuggestChainOrigins } from "../constants";

export const CustomWebpageScreen: FunctionComponent = () => {
  const route = useRoute<
    RouteProp<
      Record<
        string,
        {
          url: string;
        }
      >,
      string
    >
  >();

  // iOS에서는 http 혹은 https 없으면 webview에서 에러남
  // Error in webview without http or https on iOS
  const uri =
    route.params.url.startsWith("http://") ||
    route.params.url.startsWith("https://")
      ? route.params.url
      : `https://${route.params.url}`;

  try {
    const url = new URL(uri);

    const enableSuggestChain = experimentalSuggestChainOrigins.some(
      (origin) => origin === url.origin
    );

    return (
      <WebpageScreen
        name={uri}
        source={{ uri: url.href }}
        allowsInlineMediaPlayback={true}
        experimentalOptions={{
          enableSuggestChain,
        }}
      />
    );
  } catch (e) {
    console.error(e.message);

    return null;
  }
};