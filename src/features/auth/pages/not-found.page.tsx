import paggeNotFound404 from "../../../assets/error-404.png";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-8xl font-bold mb-4">404</div>
      <div className="text-4xl font-semibold mb-8">Page Not Found</div>
      <p className="text-md text-skin-muted text-center">
        Sorry, the page you are looking for might be in another universe.
        <br />
        <br />
        <span
          className="text-xl font-bold cursor-pointer underline text-emerald-500"
          onClick={() => (window.location.href = "/")}
        >
          &#60; Back
        </span>
      </p>
      <img
        src={paggeNotFound404} // Add your own image source
        alt="Not found"
        className="mt-8 max-w-lg w-full"
      />
    </div>
  );
}
