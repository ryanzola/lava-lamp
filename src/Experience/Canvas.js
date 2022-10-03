import * as THREE from 'three'

var colors = require('nice-color-palettes')

import Experience from './Experience'

import vertex from './shaders/canvas/vertex.glsl'
import fragment from './shaders/canvas/fragment.glsl'

export default class Canvas
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.config = this.experience.config
        this.time = this.experience.time

        let index = Math.floor(Math.random() * colors.length)
        // index = 19;
        this.palette = colors[index]
        this.palette = this.palette.map(color => new THREE.Color(color))
        console.log(this.palette)

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
      this.geometry = new THREE.PlaneBufferGeometry(3, 1.5, 300, 300)
    }

    setMaterial() {
      this.material = new THREE.ShaderMaterial({
        // wireframe: true,
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          time: { value: 0.0 },
          uColor: { value: this.palette }
        }
      })
    }

    setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.scene.add(this.mesh)
    }

    update() {
      this.material.uniforms.time.value = this.time.elapsed * 0.0001
    }
}