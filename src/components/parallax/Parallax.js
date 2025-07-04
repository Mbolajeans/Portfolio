import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'
import { Text, Box, useMatcapTexture, Octahedron } from '@react-three/drei'

import useSlerp from './use-slerp'
import useLayers from './use-layers'
import useRenderTarget from './use-render-target'

import { ThinFilmFresnelMap } from './ThinFilmFresnelMap'
import { mirrorsData } from './data'

function useResponsiveFontSize(baseSize = 3.5, mobileBreakpoint = 768, mobileSize = 1.5) {
  const [fontSize, setFontSize] = useState(baseSize)

  useEffect(() => {
    const updateFontSize = () => {
      const isMobile = window.innerWidth <= mobileBreakpoint
      setFontSize(isMobile ? mobileSize : baseSize)
    }

    updateFontSize()
    window.addEventListener('resize', updateFontSize)

    return () => {
      window.removeEventListener('resize', updateFontSize)
    }
  }, [baseSize, mobileBreakpoint, mobileSize])

  return fontSize
}

function Title({ layers, ...props }) {
  const group = useRef()
  const textRef = useLayers(layers)

  const fontSize = useResponsiveFontSize(3.5, 768, 1.5) 

  useEffect(() => {
    group.current.lookAt(0, 0, 0)
  }, [])

  return (
    <group {...props} ref={group}>
      <Text
        ref={textRef}
        name="text-panna"
        depthTest={false}
        material-toneMapped={false}
        material-color="#FFFFFF"
        fontSize={fontSize}
        font="https://fonts.gstatic.com/s/syncopate/v12/pe0pMIuPIYBCpEV5eFdKvtKqBP5p.woff"
      >
        SERVICES
      </Text>
    </group>
  )
}

function Mirror({ sideMaterial, reflectionMaterial, args, layers, ...props }) {
  const ref = useLayers(layers)

  useFrame(() => {
    if (ref?.current) {
      ref.current.rotation.y += 0.001
      ref.current.rotation.z += 0.01
    }
  })

  return (
    <Box
      {...props}
      ref={ref}
      args={args}
      material={[
        sideMaterial,
        sideMaterial,
        sideMaterial,
        sideMaterial,
        reflectionMaterial,
        reflectionMaterial
      ]}
    />
  )
}

function Mirrors({ envMap, layers, ...props }) {
  const [thinFilmFresnelMap] = useState(new ThinFilmFresnelMap())
  const sideMaterial = useRef()
  const reflectionMaterial = useRef()

  return (
    <group name="mirrors" {...props}>
      <meshLambertMaterial
        ref={sideMaterial}
        map={thinFilmFresnelMap}
        color="#AAAAAA"
      />
      <meshLambertMaterial
        ref={reflectionMaterial}
        map={thinFilmFresnelMap}
        envMap={envMap}
        color="#FFFFFF"
      />
      {mirrorsData.mirrors.map((mirror, index) => (
        <Mirror
          key={`mirror-${index}`}
          layers={layers}
          {...mirror}
          name={`mirror-${index}`}
          sideMaterial={sideMaterial.current}
          reflectionMaterial={reflectionMaterial.current}
        />
      ))}
    </group>
  )
}

function TitleCopies({ layers }) {
  const vertices = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(10)
    const positions = geometry.attributes.position.array
    const verts = []
    for (let i = 0; i < positions.length; i += 3) {
      verts.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]))
    }
    return verts
  }, [])

  return (
    <group name="titleCopies">
      {vertices.map((vertex, i) => (
        <Title
          key={i}
          name={'titleCopy-' + i}
          position={vertex}
          layers={layers}
        />
      ))}
    </group>
  )
}

export default function Parallax() {
  const [cubeCamera, renderTarget] = useRenderTarget()
  const group = useSlerp()
  const [matcapTexture] = useMatcapTexture('C8D1DC_575B62_818892_6E747B')

  return (
    <group name="sceneContainer" ref={group}>
      <Octahedron layers={[11]} name="background" args={[20, 4, 4]} position={[0, 0, -5]}>
        <meshMatcapMaterial
          matcap={matcapTexture}
          side={THREE.BackSide}
          transparent
          opacity={0.3}
          color="#FFFFFF"
        />
      </Octahedron>
      <cubeCamera
        layers={[11]}
        name="cubeCamera"
        ref={cubeCamera}
        args={[0.1, 100, renderTarget]}
        position={[0, 0, 5]}
      />
      <Title name="title" position={[0, 0, -10]} />
      <TitleCopies layers={[11]} />
      <Mirrors layers={[0, 11]} envMap={renderTarget.texture} />
    </group>
  )
}
