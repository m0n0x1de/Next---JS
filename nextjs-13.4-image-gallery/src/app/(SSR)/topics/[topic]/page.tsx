import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css"
import {Alert} from "@/components/boostrap"
import { Metadata } from "next/types";

//export const revalidate = 0;

//export const dynamicParams = false;


interface PageProps{
    params: { topic: string },
    //searchParams: {[key: string]:string | string[] | undefined},
}

export function generateMetadata({params:{topic}}:PageProps):Metadata{
    return{
        title: topic + " -NextJS 13.4 Image Gallery "
    }
}

export function generateStaticParams(){
    return ["health", "fitness", "coding"].map(topic =>({topic}));
}

export default async function Page({params:{topic}}:PageProps){
    const response = await fetch(`http://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const images: UnsplashImage[] = await response.json();    
    return(
        <div>
            <h1>{topic}</h1>
            <Alert>
                This page uses <strong>generatedStaticParams</strong> to render and cache static page at build time, even though the URL has a dunamic parameter.
                Pages that are not included in generatedStaticParams will be fetched & rendered on fist access and then cached for subsequant requests(this can be disabled).
            </Alert>
            {
                images.map(image => (
                    <Image src={image.urls.raw}
                    width={250}
                    height={250}
                    alt={image.description}
                    key={image.urls.raw}
                    className={styles.image}
                    />
                ))
            }
        </div>
    )
}