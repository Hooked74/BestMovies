type TPreloadResource = (link: string) => Promise<any>;

interface IHTMLImageElement extends HTMLImageElement {
  crossorigin: string;
}

const isIE: boolean = !!(document as any).documentMode;
const isEdge: boolean = /Edge/.test(navigator.userAgent);
const isMSBrowser: boolean = isIE || isEdge;

export { isIE, isEdge, isMSBrowser };

export const urlResolve = (from: string | URL, ...to: string[]): string | URL => {
  if (typeof to[0] === "undefined") {
    return from;
  }

  return urlResolve(new URL(to[0], from), ...to.slice(1));
};

export const preloadImage: TPreloadResource = (link: string): Promise<any> => {
  const image: IHTMLImageElement = new Image() as IHTMLImageElement;
  const promise: Promise<Event | Error> = new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  image.crossorigin = "anonymous";
  image.src = link;

  return promise;
};

export const sync = (request: Request, err?: string): Promise<Response> => {
  return fetch(request).then((response: Response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      const errorText = err || response.statusText || `${response.status}`;
      return Promise.reject(new Error(errorText));
    }
  });
};
