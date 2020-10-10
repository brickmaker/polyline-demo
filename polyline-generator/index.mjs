import { Vector2 } from 'https://unpkg.com/three/build/three.module.js';

function getVector2Normal(vec1, vec2) {
    const vec = new Vector2().add(vec2).sub(vec1)
    return new Vector2(-vec.y, vec.x).normalize()
}

function computeNormalAndLength(points) {
    if (!points || points.lengths < 2) {
        return {
            points,
            normals: null,
            lengths: null
        }
    }

    const N = points.length
    const normals = Array(N).fill().map(() => [0, 0])
    const lengths = Array(N).fill(1)

    const rawNormals = []
    for (let i = 0; i < N - 1; i++) {
        rawNormals.push(getVector2Normal(new Vector2(points[i][0], points[i][1]), new Vector2(points[i + 1][0], points[i + 1][1])))
    }
    rawNormals.push(getVector2Normal(new Vector2(points[N - 2][0], points[N - 2][1]), new Vector2(points[N - 1][0], points[N - 1][1])))

    normals[0] = rawNormals[0].toArray()
    lengths[0] = 1
    normals[N - 1] = rawNormals[N - 1].toArray()
    lengths[N - 1] = 1
    for (let i = 1; i < N - 1; i++) {
        const va = rawNormals[i - 1]
        const vb = rawNormals[i]
        const normal = new Vector2().addVectors(va, vb).normalize()
        normals[i] = normal.toArray()
        lengths[i] = 1 / normal.dot(va)
    }
    return {
        points,
        normals,
        lengths
    }
}

export {
    computeNormalAndLength
}