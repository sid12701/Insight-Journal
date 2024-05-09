import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  className,
  title,
  date,
  journal,
  insight,
}: {
  id: string;
  className?: string;
  title?: string | React.ReactNode;
  date?: string | React.ReactNode;
  journal?: string | React.ReactNode;
  insight?: string | React.ReactNode;
}) => {
  return (
    <div
      id={id}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-center flex flex-col space-y-4 text-center",
        className
      )}
    >
      <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2">
        {title}
        {date && (
          <span className="italic text-sm text-neutral-500 dark:text-neutral-400 ml-2">
            {date}
          </span>
        )}
      </div>
      <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
        {journal}
      </div>
      <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
        {insight}
      </div>
    </div>
  );
};
