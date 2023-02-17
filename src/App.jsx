import { useEffect, useState, useRef } from 'react'
import Cards from './components/Cards';

const App = () => {
  const [imageList, setImageList] = useState([])
  const elementRef = useRef([])
  console.log("elementRef", elementRef.current)

  // handling lazy loading
  const handleLazyLoading = () => {
    const observer = new IntersectionObserver((entries) => {
      //callback function
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src
          observer.unobserve(entry.target)
        }
      })
    }, {
      //options
      threshold: 0.25
    })

    if (elementRef.current.length > 0) {
      elementRef.current.forEach(elem => observer.observe(elem))
    }


  }

  useEffect(() => {
    // handlingImageList
    const handleImageList = async () => {
      try {
        const result = await fetch(`https://api.unsplash.com/photos?client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`)
        const data = await result.json();
        setImageList(data);
      }
      catch {
        console.log("fetching-error", err);
      }
    }
    handleImageList()
  }
    , [])

  useEffect(() => handleLazyLoading(), [imageList])

  return (
    <section>
      <h1 className='text-2xl font-bold text-center mb-6'>Lazy Loading Image Gallery</h1>
      <Cards elementRef={elementRef} items={imageList} />
    </section>
  )
}

export default App