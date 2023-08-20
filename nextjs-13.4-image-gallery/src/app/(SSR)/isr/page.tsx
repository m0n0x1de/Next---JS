import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/boostrap"
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: 'Incremental Static Regenartion - NextJS 13.4 Image Gallery',
}

export const revalidate = 15;

export default async function Page(){
const response = await fetch("http://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY, 
{
    //next: { revalidate:15 }
});
const image: UnsplashImage = await response.json();

const width = Math.min(500, image.width);
const height = (width / image.width) * image.height;

return(
    <div className="d-flex flex-column align-items=center">
        <Alert>
            This page uses <strong>incremenatal static regeneration </strong>
            A new image is fetched every 15 seconds (after refreshing the page) and then served from the cache for that duration.
        </Alert>
        <Image 
            src={image.urls.raw}
            width={width}
            height={height}
            alt={image.description}
            className="rounded shadow mw-100 h-100"
        />

        by <Link href={"/users/" + image.user.username}>
            {image.user.username}
        </Link>
    </div>
);
}