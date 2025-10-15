'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function CosmicBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Create stars
    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 5000
    const positions = new Float32Array(starsCount * 3)
    const colors = new Float32Array(starsCount * 3)
    const sizes = new Float32Array(starsCount)

    for (let i = 0; i < starsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100
      positions[i + 1] = (Math.random() - 0.5) * 100
      positions[i + 2] = (Math.random() - 0.5) * 100

      colors[i] = 1
      colors[i + 1] = 1
      colors[i + 2] = 1

      sizes[i / 3] = Math.random() * 2
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const starsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePos: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        uniform vec2 mousePos;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          float dist = distance(mvPosition.xy, mousePos);
          float ripple = 1.0 + sin(time * 10.0 - dist * 0.1) * 0.5;
          
          gl_PointSize = size * ripple * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - dist * 2.0;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Create nebula clouds
    const createNebula = (color: number, position: THREE.Vector3, scale: number) => {
      const geometry = new THREE.PlaneGeometry(30, 20)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(color) }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;
          
          void main() {
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center);
            
            float noise = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time) * 0.1;
            float alpha = (1.0 - dist) * 0.3 + noise;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      })

      const nebula = new THREE.Mesh(geometry, material)
      nebula.position.copy(position)
      nebula.scale.set(scale, scale, scale)
      return nebula
    }

    const nebula1 = createNebula(0x8B5CF6, new THREE.Vector3(-20, 5, -30), 2)
    const nebula2 = createNebula(0xC084FC, new THREE.Vector3(15, -5, -25), 1.5)
    const nebula3 = createNebula(0xF472B6, new THREE.Vector3(0, 10, -40), 1.8)

    scene.add(nebula1, nebula2, nebula3)

    camera.position.z = 30

    // Animation
    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Rotate scene
      scene.rotation.y += 0.001

      // Update star animation
      if (starsMaterial.uniforms) {
        starsMaterial.uniforms.time.value = elapsedTime
        starsMaterial.uniforms.mousePos.value.set(mousePos.x, mousePos.y)
      }

      // Animate nebulae
      nebula1.rotation.z = Math.sin(elapsedTime * 0.1) * 0.1
      nebula2.rotation.z = Math.cos(elapsedTime * 0.15) * 0.1
      nebula3.rotation.z = Math.sin(elapsedTime * 0.08) * 0.1

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [mousePos])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0"
      style={{ background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)' }}
    />
  )
}