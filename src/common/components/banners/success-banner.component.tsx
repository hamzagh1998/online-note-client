type Props = {
  title?: string;
  message: string;
};

export function SuccessBannerComponent({ title = "Success", message }: Props) {
  return (
    <div
      className="bg-emerald-100 border-l-4 border-emerald-500 text-emerald-700 p-4 w-full my-5"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
}
