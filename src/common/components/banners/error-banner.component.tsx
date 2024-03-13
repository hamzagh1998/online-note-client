type Props = {
  title?: string;
  message: string;
};

export function ErrorBannerComponent({ title = "Error", message }: Props) {
  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full my-5"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
}
