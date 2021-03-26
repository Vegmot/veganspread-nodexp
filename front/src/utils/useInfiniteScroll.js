import { useEffect, useState } from 'react'

const useInfiniteScroll = () => {
  const [isBottom, setIsBottom] = useState(false)

  const howManyPixelsFromBottom = 60

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop

    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight

    if (
      scrollTop + window.innerHeight + howManyPixelsFromBottom >=
      scrollHeight
    ) {
      setIsBottom(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <></>
}

export default useInfiniteScroll
