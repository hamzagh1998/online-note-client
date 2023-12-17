export function SpinnerIndicatorsComponent() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="animate-spin border-[20px] border-t-white border-skin-accent rounded-full w-[200px] h-[200px]"></div>
    </div>
  );
}

export function SmallSpinnerIndicatorsComponent() {
  return (
    <div className="flex justify-center items-center w-fit h-fit my-5">
      <div className="animate-spin border-[5px] border-t-white border-skin-accent rounded-full w-[25px] h-[25px]"></div>
    </div>
  );
}
