import { useState, useRef, useEffect } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// Registering the ScrollTrigger plugin for GSAP to enable scroll-based animations
gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  // State to manage the current video index,
  // whether a video has been clicked, and the loading state
  const [currentIndex, setCurrentIndex] = useState(1)
  const [hasClicked, setHasClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedVideos, setLoadedVideos] = useState(0)

  // Total number of videos
  const totalVideos = 4
  // Reference to the next video element
  const nextVdRef = useRef(null)

  // Effect to manage the loading state based on the number of loaded videos
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false)
    }
  }, [loadedVideos])

  // Function to handle the click on a mini video
  const handleMiniVdClick = () => {
    setHasClicked(true)
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1)
  }

  // Function to handle the loading of a video
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1)
  }

  // Using GSAP to animate the video transition when a mini video is clicked
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set('#next-video', { visibility: 'visible' })
        gsap.to('#next-video', {
          transformOrigin: 'center center',
          scale: 1,
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'power1.inOut',
          onStart: () => nextVdRef.current.play(),
        })
        gsap.from('#current-video', {
          transformOrigin: 'center center',
          scale: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        })
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  )

  // Using GSAP to animate the video frame clip path and border radius on scroll
  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
      borderRadius: '0% 0% 40% 10%',
    })
    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0% 0% 0% 0%',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    })
  })

  // Function to get the video source based on the index
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`
  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      {isLoading && (
        <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
          <div className='three-body'>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
          </div>
        </div>
      )}
      <div
        id='video-frame'
        className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'
      >
        <div>
          <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
            <div
              onClick={handleMiniVdClick}
              className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
            >
              <video
                ref={nextVdRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                loop
                muted
                id='current-video'
                className='size-64 origin-center scale-150 object-cover object-center'
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id='next-video'
            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className='absolute left-0 top-0 size-full object-cover object-center'
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
          G<b>a</b>ming
        </h1>
        <div className='absolute left-0 top-0 z-40 size-full'>
          <div className='mt-24 px-5 sm:px-10'>
            <h1 className='special-font hero-heading text-blue-100'>
              redefi <b>n</b>e
            </h1>
            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
              Hello I'm a <b>Chinmay</b> <br />
              Unleash the Playful <b>Gamer</b> in you
            </p>
            <Button
              id='watch-trailer'
              title='Watch Trailer'
              leftIcon={<TiLocationArrow />}
              containerClass='!bg-yellow-300 flex-gap-1'
            />
          </div>
        </div>
      </div>
      <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black-75'>
        G<b>a</b>ming
      </h1>
    </div>
  )
}

export default HeroSection
