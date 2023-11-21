import { Loading as Spinner } from "@components/Loading";

export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="w-full h-96 rounded-sm  bg-gray-200" />
        </div>
        <div className="flex-1 flex flex-col gap-5 h-96">
          <div className="w-full h-11 bg-gray-200 " />
          <div className="flex flex-1 items-center justify-center gap-2">
            <div className="flex-1 rounded-md bg-gray-200 w-full h-11"></div>
            <div className="flex-1 rounded-md bg-gray-200 w-full h-11"></div>
            <div className="flex-1 rounded-md bg-gray-200 w-full h-11"></div>
          </div>
          <div className="flex-2 bg-gray-200 h-60" />
          <div className="w-32 h-4 bg-gray-200 " />
        </div>
      </div>
      <div className="flex gap-8  mt-10">
        <div className="flex-1 w-full">
          <div className="w-full h-10 bg-gray-200"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
        </div>
        <div className="flex-1 w-full">
          <div className="w-full h-10 bg-gray-200"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
          <div className="w-full h-4 bg-gray-200 mt-4"></div>
        </div>
      </div>
    </div>
  );
}
