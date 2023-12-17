import { FcGoogle } from "react-icons/fc";

export function GoogleButtonComponent({ text }: { text: string }) {
  return (
    <div
      className="
        flex 
        justify-center 
        items-center 
        gap-6 
        rounded-xl 
        py-3 
        px-6 
        w-full 
        border 
        border-skin-accent 
        cursor-pointer 
        hover:bg-skin-fill-primary"
    >
      <FcGoogle size={24} />
      <p className="text-skin-base max-sm:text-sm font-bold tracking-wide rounded-xl">
        {text}
      </p>
    </div>
  );
}
