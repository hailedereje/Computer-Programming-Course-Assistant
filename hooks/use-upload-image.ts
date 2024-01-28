"use client"

import { useEdgeStore } from '@/lib/edgestore';

export const useUploadImage = async (file: File) => {
    const { edgestore } = useEdgeStore();
    if (file) {
        const res = await edgestore.publicFiles.upload({
            file,
            onProgressChange: (progress) => {
                console.log(progress);
            }
        })
        return res;
        
    }
}

