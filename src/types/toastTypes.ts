export interface IToast {
  id: string;
  type: Toasttypes;
  message: string;
  timeout?: number;
}

type Toasttypes = "success" | "error" | "info" | "warning";

export interface IToastIcon {
  success: React.ReactSVGElement;
  error: React.ReactSVGElement;
  info: React.ReactSVGElement;
  warning: React.ReactSVGElement;
}
