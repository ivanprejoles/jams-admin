import { SparklesCore } from "./sparkles";

interface HeadingProps {
    title: string;
    description: string;
}

export const Heading: React.FC<HeadingProps> = ({
    title,
    description
}) => {
    return (
        <div className="border border-red-500 p-4 rounded-3xl bg-white dark:bg-black">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
            <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={100}
            className="w-full  h-full absolute top-0 left-0 z-50"
            particleColor="#ff9800"
          />
        </div>
    )
}