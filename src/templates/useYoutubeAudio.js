import { useEffect, useRef, useState } from "react";
import { parseSongs } from "./youtube";

let apiPromise = null;
function loadYoutubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}

// Reproduce la(s) cancion(es) del memorial en segundo plano mientras el
// visitante navega por la pagina. La primera intenta reproducirse sola al
// cargar (funciona en algunos navegadores); si el navegador bloquea el
// autoplay con sonido, o para cambiar de cancion, el visitante usa los
// botones con el nombre de cada una.
export function useYoutubeAudio(songUrl, songTitle) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const readyRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const songs = parseSongs(songUrl, songTitle);

  useEffect(() => {
    if (!songs.length || !containerRef.current) return undefined;
    let cancelled = false;
    setCurrentIndex(0);

    loadYoutubeApi().then(() => {
      if (cancelled || !containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: songs[0].id,
        playerVars: { playsinline: 1, controls: 0 },
        events: {
          onReady: (e) => {
            readyRef.current = true;
            e.target.playVideo();
          },
          onStateChange: (e) => {
            const YT = window.YT;
            if (e.data === YT.PlayerState.PLAYING) setPlaying(true);
            else if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
            else if (e.data === YT.PlayerState.ENDED) {
              e.target.seekTo(0);
              e.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      readyRef.current = false;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songUrl, songTitle]);

  const playSong = (index) => {
    const player = playerRef.current;
    if (!player || !readyRef.current || !songs[index]) return;
    if (index === currentIndex) {
      if (playing) player.pauseVideo();
      else player.playVideo();
      return;
    }
    setCurrentIndex(index);
    player.loadVideoById(songs[index].id);
  };

  return { containerRef, playing, currentIndex, songs, playSong };
}
