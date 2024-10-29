import Link from "next/link";

const Custom404 = () => (
  <div className="flex flex-col">
    <div className="w-full h-20 bg-biege" />
    <div className="flex flex-col items-center justify-center w-full gap-9 min-h-[600px] h-[calc(100vh_-_400px)] mx-auto my-0 px-16 py-0">
      <div className="text-4xl">404</div>
      <div className="flex flex-col items-center gap-[60px]">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xl font-medium leading-[25.2px] tracking-normal text-center">
            Oops! Page not found
          </p>
          <p className="text-lg font-normal leading-[27px] tracking-normal text-center">
            This page does not exist or has been deleted
          </p>
        </div>
        <Link href="/" legacyBehavior>
          <span className="cursor-pointer">Back to homepage</span>
        </Link>
      </div>
    </div>
  </div>
);

export default Custom404;
