import { Flex } from "@radix-ui/themes";

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 dark:before:via-white/10 before:to-transparent';

export function BlogCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-950 p-2 shadow-sm`}
    >
      <div className="flex p-4 flex-row">
        <div className="flex h-auto w-50 bg-neutral-800 p-6 rounded-md"></div>
        <div className="flex-col ml-5 w-full">
          <div className="flex h-5 w-60 bg-neutral-800 p-3 rounded-md"></div>
          <div className="flex h-5 w-full bg-neutral-800 p-0 rounded-md mt-5"></div>
          <div className="flex h-5 w-60 bg-neutral-800 p-0 rounded-md mt-2"></div>
          <div className="flex flex-row justify-between h5 w-full flex-row p-0 rounded-md mt-5">
            <div className="flex flex-row">
              <div className="flex h-5 w-10 bg-neutral-800 p-0 rounded-md mr-2 mt-2"></div>
              <div className="flex h-5 w-10 bg-neutral-800 p-0 rounded-md mr-2 mt-2"></div>
              <div className="flex h-5 w-10 bg-neutral-800 p-0 rounded-md mr-2 mt-2"></div>
            </div>
            <div className="flex h-5 w-20 bg-neutral-800 p-0 rounded-md mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogNavSkeleton() {
  return (
    <Flex direction="column" gap="4" mt="6">
      <BlogCardSkeleton/>
      <BlogCardSkeleton/>
      <BlogCardSkeleton/>
    </Flex>
  )
}