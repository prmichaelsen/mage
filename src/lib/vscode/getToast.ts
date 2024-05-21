import { ProgressLocation, ProgressOptions, window } from "vscode";

export const getToast = async (
  message: string,
  options: Partial<Exclude<ProgressOptions, "title">> = {},
  promise: Promise<void> = new Promise((resolve) => setTimeout(resolve, 3500))
) => {
  window.withProgress(
    {
      title: message,
      location: ProgressLocation.Notification,
      cancellable: true,
      ...options,
    },
    async () => {
      await promise;
    }
  );
};
