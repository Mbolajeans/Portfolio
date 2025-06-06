import * as THREE from 'three'
import { MathUtils } from 'three'

export class ThinFilmFresnelMap extends THREE.DataTexture {
  constructor(filmThickness = 500.0, refractiveIndexFilm = 2.0, refractiveIndexBase = 3.0, size = 128) {
    const data = new Uint8Array(size * 4)
    super(data, size, 1, THREE.RGBAFormat)

    this._filmThickness = filmThickness
    this._refractiveIndexFilm = refractiveIndexFilm
    this._refractiveIndexBase = refractiveIndexBase
    this._size = size
    this._data = data

    this.wrapS = THREE.RepeatWrapping
    this.wrapT = THREE.RepeatWrapping
    this.magFilter = THREE.LinearFilter
    this.minFilter = THREE.LinearMipMapLinearFilter
    this.mapping = THREE.UVMapping
    this.generateMipmaps = true

    this._updateData()
  }

  get filmThickness() {
    return this._filmThickness
  }

  set filmThickness(value) {
    this._filmThickness = value
    this.updateSettings(this._filmThickness, this._refractiveIndexFilm, this._refractiveIndexBase)
  }

  get refractiveIndexFilm() {
    return this._refractiveIndexFilm
  }

  set refractiveIndexFilm(value) {
    this._refractiveIndexFilm = value
    this.updateSettings(this._filmThickness, this._refractiveIndexFilm, this._refractiveIndexBase)
  }

  get refractiveIndexBase() {
    return this._refractiveIndexBase
  }

  set refractiveIndexBase(value) {
    this._refractiveIndexBase = value
    this.updateSettings(this._filmThickness, this._refractiveIndexFilm, this._refractiveIndexBase)
  }

  updateSettings(filmThickness, refractiveIndexFilm, refractiveIndexBase) {
    this._filmThickness = filmThickness || 380
    this._refractiveIndexFilm = refractiveIndexFilm || 2
    this._refractiveIndexBase = refractiveIndexBase || 3
    this._updateData()
  }

  _fresnelRefl(refractiveIndex1, refractiveIndex2, cos1, cos2, R, phi) {
    const sin1Sqr = 1.0 - cos1 * cos1
    const refrRatio = refractiveIndex1 / refractiveIndex2

    if (refrRatio * refrRatio * sin1Sqr > 1.0) {
      // total internal reflection
      R.x = 1.0
      R.y = 1.0
      const sqrRefrRatio = refrRatio * refrRatio
      phi.x = 2.0 * Math.atan((-sqrRefrRatio * Math.sqrt(sin1Sqr - 1.0 / sqrRefrRatio)) / cos1)
      phi.y = 2.0 * Math.atan(-Math.sqrt(sin1Sqr - 1.0 / sqrRefrRatio) / cos1)
    } else {
      const r_p = (refractiveIndex2 * cos1 - refractiveIndex1 * cos2) / (refractiveIndex2 * cos1 + refractiveIndex1 * cos2)
      const r_s = (refractiveIndex1 * cos1 - refractiveIndex2 * cos2) / (refractiveIndex1 * cos1 + refractiveIndex2 * cos2)

      phi.x = r_p < 0.0 ? Math.PI : 0.0
      phi.y = r_s < 0.0 ? Math.PI : 0.0

      R.x = r_p * r_p
      R.y = r_s * r_s
    }
  }

  _updateData() {
    const filmThickness = this._filmThickness
    const refractiveIndexFilm = this._refractiveIndexFilm
    const refractiveIndexBase = this._refractiveIndexBase
    const size = this._size
    const data = this._data

    function xFit_1931(lambda) {
      const t1 = (lambda - 442.0) * (lambda < 442.0 ? 0.0624 : 0.0374)
      const t2 = (lambda - 599.8) * (lambda < 599.8 ? 0.0264 : 0.0323)
      const t3 = (lambda - 501.1) * (lambda < 501.1 ? 0.049 : 0.0382)
      return 0.362 * Math.exp(-0.5 * t1 * t1) + 1.056 * Math.exp(-0.5 * t2 * t2) - 0.065 * Math.exp(-0.5 * t3 * t3)
    }

    function yFit_1931(lambda) {
      const t1 = (lambda - 568.8) * (lambda < 568.8 ? 0.0213 : 0.0247)
      const t2 = (lambda - 530.9) * (lambda < 530.9 ? 0.0613 : 0.0322)
      return 0.821 * Math.exp(-0.5 * t1 * t1) + 0.286 * Math.exp(-0.5 * t2 * t2)
    }

    function zFit_1931(lambda) {
      const t1 = (lambda - 437.0) * (lambda < 437.0 ? 0.0845 : 0.0278)
      const t2 = (lambda - 459.0) * (lambda < 459.0 ? 0.0385 : 0.0725)
      return 1.217 * Math.exp(-0.5 * t1 * t1) + 0.681 * Math.exp(-0.5 * t2 * t2)
    }

    const phi12 = new THREE.Vector2()
    const phi21 = new THREE.Vector2()
    const phi23 = new THREE.Vector2()
    const R12 = new THREE.Vector2()
    const T12 = new THREE.Vector2()
    const R23 = new THREE.Vector2()
    const R_bi = new THREE.Vector2()
    const T_tot = new THREE.Vector2()
    const R_star = new THREE.Vector2()
    const R_bi_sqr = new THREE.Vector2()
    const R_12_star = new THREE.Vector2()
    const R_star_t_tot = new THREE.Vector2()

    const refrRatioSqr = 1.0 / (refractiveIndexFilm * refractiveIndexFilm)
    const refrRatioSqrBase = (refractiveIndexFilm * refractiveIndexFilm) / (refractiveIndexBase * refractiveIndexBase)

    const numBands = 64
    const waveLenRange = 780 - 380

    for (let i = 0; i < size; ++i) {
      const cosThetaI = i / size
      const cosThetaT = Math.sqrt(1 - refrRatioSqr * (1.0 - cosThetaI * cosThetaI))
      const cosThetaT2 = Math.sqrt(1 - refrRatioSqrBase * (1.0 - cosThetaT * cosThetaT))

      const pathDiff = 2.0 * refractiveIndexFilm * filmThickness * cosThetaT
      const pathDiff2PI = 2.0 * Math.PI * pathDiff

      this._fresnelRefl(1.0, refractiveIndexFilm, cosThetaI, cosThetaT, R12, phi12)
      T12.set(1.0 - R12.x, 1.0 - R12.y)
      phi21.set(Math.PI - phi12.x, Math.PI - phi12.y)

      this._fresnelRefl(refractiveIndexFilm, refractiveIndexBase, cosThetaT, cosThetaT2, R23, phi23)
      R_bi.set(Math.sqrt(R23.x * R12.x), Math.sqrt(R23.y * R12.y))
      T_tot.set(Math.sqrt(T12.x * T12.x), Math.sqrt(T12.y * T12.y))
      R_star.set((T12.x * T12.x * R23.x) / (1.0 - R23.x * R12.x), (T12.y * T12.y * R23.y) / (1.0 - R23.y * R12.y))
      R_bi_sqr.set(R_bi.x * R_bi.x, R_bi.y * R_bi.y)
      R_12_star.set(R12.x + R_star.x, R12.y + R_star.y)
      R_star_t_tot.set(R_star.x - T_tot.x, R_star.y - T_tot.y)

      let x = 0, y = 0, z = 0, totX = 0, totY = 0, totZ = 0

      for (let j = 0; j < numBands; ++j) {
        const waveLen = 380 + (j / (numBands - 1)) * waveLenRange
        const deltaPhase = pathDiff2PI / waveLen

        const cosPhiX = Math.cos(deltaPhase + phi23.x + phi21.x)
        const cosPhiY = Math.cos(deltaPhase + phi23.y + phi21.y)

        const valX = R_12_star.x + ((2.0 * (R_bi.x * cosPhiX - R_bi_sqr.x)) / (1.0 - 2 * R_bi.x * cosPhiX + R_bi_sqr.x)) * R_star_t_tot.x
        const valY = R_12_star.y + ((2.0 * (R_bi.y * cosPhiY - R_bi_sqr.y)) / (1.0 - 2 * R_bi.y * cosPhiY + R_bi_sqr.y)) * R_star_t_tot.y
        const v = 0.5 * (valX + valY)

        const wx = xFit_1931(waveLen)
        const wy = yFit_1931(waveLen)
        const wz = zFit_1931(waveLen)

        totX += wx
        totY += wy
        totZ += wz

        x += wx * v
        y += wy * v
        z += wz * v
      }

      x /= totX
      y /= totY
      z /= totZ

      let r = 3.2406 * x - 1.5372 * y - 0.4986 * z
      let g = -0.9689 * x + 1.8758 * y + 0.0415 * z
      let b = 0.0557 * x - 0.204 * y + 1.057 * z

      r = Math.sqrt(MathUtils.clamp(r, 0.0, 1.0))
      g = Math.sqrt(MathUtils.clamp(g, 0.0, 1.0))
      b = Math.sqrt(MathUtils.clamp(b, 0.0, 1.0))

      const k = i << 2
      data[k] = Math.floor(r * 255)
      data[k + 1] = Math.floor(g * 255)
      data[k + 2] = Math.floor(b * 255)
      data[k + 3] = 255
    }

    this.image.data = data
    this.needsUpdate = true
  }
}
