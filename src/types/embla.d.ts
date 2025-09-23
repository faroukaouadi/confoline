declare module "embla-carousel-react" {
  type EmblaOptionsType = {
    loop?: boolean;
    align?: "start" | "center" | "end" | number;
    direction?: "ltr" | "rtl";
  };
  type EmblaPluginType = unknown;
  const useEmblaCarousel: (
    options?: EmblaOptionsType,
    plugins?: EmblaPluginType[]
  ) => [
    (node: HTMLElement | null) => void,
    unknown
  ];
  export default useEmblaCarousel;
}

declare module "embla-carousel-autoplay" {
  type AutoplayOptions = {
    delay?: number;
    stopOnInteraction?: boolean;
    stopOnMouseEnter?: boolean;
  };
  export default function Autoplay(options?: AutoplayOptions): unknown;
}


