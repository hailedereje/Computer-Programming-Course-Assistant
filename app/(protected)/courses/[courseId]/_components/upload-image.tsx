'use client';

import { isUrl, updateImage } from "@/actions/course/course";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

export default function UploadImage({ id }: { id: string }) {

    const [file, setFile] = React.useState<File>();
    const { edgestore } = useEdgeStore();
    const [isPending, setIsPending] = useState(false)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0]);
    }
    const handleClick = () => {
        document.querySelector<HTMLInputElement>(".input-file")?.click();
    }
    const router = useRouter()
    return (
        <div className="flex flex-col space-y-4 w-full h-full ">
            <input
                hidden
                type="file"
                className="input-file"
                onChange={onChange}
            />
            {!file && <div className="w-full h-[200px] flex flex-col items-center justify-center border-dashed border-emerald-500 border-2 rounded-lg cursor-pointer" onClick={handleClick}>
                <Upload size={50} />
                <p className="font-bold text-xl text-emerald-700 hover:underline line-clamp-1">Upload course Image</p>
            </div>}
            {file && <img src={URL.createObjectURL(file!)} className="object-contain w-[200px] h-[200px]" />}
            {file && <Button
                disabled={isPending}
                onClick={async () => {
                    setIsPending(true);
                    if (file) {
                        const res = await edgestore.publicFiles.upload({
                            file,
                            onProgressChange: (progress) => {
                                console.log(progress);
                            },
                        });
                        updateImage(res.url, id)
                        router.refresh()
                        setIsPending(false);
                    }
                }}
            >
                Upload
            </Button>}
        </div>
    );
}