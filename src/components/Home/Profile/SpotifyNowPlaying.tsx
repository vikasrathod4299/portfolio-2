import { IconBrandSpotify } from "@tabler/icons-react";

import axios from "axios";
import { useEffect, useState } from "react";

export default function SpotifyNowPlaying() {
    const [nowPlaying, setNowPlaying] = useState<NowPlaying>();

    const getNowPlaying = async () => {
        const { data } = await axios.get("/now-playing");
        setNowPlaying(data);
    }

    useEffect(() => {
        getNowPlaying();
        const interval = setInterval(getNowPlaying, 5000); // Refresh every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-3 xl:ml-auto">
            <a href="https://open.spotify.com/user/31m4l8kqz4k1b2wqv6xg4n3y5e" target="_blank" rel="noopener noreferrer">
                <IconBrandSpotify color="#1DB954"  className={nowPlaying?.isPlaying ? "animate-spin-slow" : ""} />
            </a>
            <span className="text-sm font-semibold text-black dark:text-white sm:text-base">
            {!nowPlaying || !nowPlaying.isPlaying ? "Not Playing": nowPlaying.name.length > 30 ? nowPlaying.name.slice(0, 30) + "..." : nowPlaying.name}
            <span className="font-normal text-zinc-500" >
                {`
                    - ${
                        !nowPlaying || !nowPlaying.isPlaying ? "Spotify": nowPlaying.artist.length > 30 ? nowPlaying.artist.slice(0, 30) + "..." : nowPlaying.artist
                    }
                `}
            </span>
            </span>
        </div>
    );

}