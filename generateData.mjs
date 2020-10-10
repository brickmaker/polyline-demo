import { computeNormalAndLength } from './polyline-generator/index.mjs'

function getData(path, width) {
    const result = computeNormalAndLength(path)

    const positions = []
    const indices = []

    for (let i = 0; i < path.length; i++) {
        const [x, y] = result.points[i]
        const [nx, ny] = result.normals[i]
        const l = result.lengths[i]
        positions.push(x + nx * l * width, y + ny * l * width, x - nx * l * width, y - ny * l * width)
    }
    for (let i = 0; i < path.length - 1; i++) {
        indices.push(2 * i, 2 * i + 1, 2 * i + 2)
        indices.push(2 * i + 1, 2 * i + 3, 2 * i + 2)
    }

    return {
        positions,
        indices
    }
}

export {
    getData
}