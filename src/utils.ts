const isIE: boolean = !!(document as any).documentMode;
const isEdge: boolean = /Edge/.test(navigator.userAgent);
const isMSBrowser: boolean = isIE || isEdge;

export { isIE, isEdge, isMSBrowser };
