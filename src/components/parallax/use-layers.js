import { useEffect, useRef } from 'react'

function useLayers(layers = [0]) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.layers.disableAll()

    layers.sort().forEach((layer) => {
      ref.current.layers.enable(layer)
    })
  }, [layers]) 

  return ref
}

export default useLayers
