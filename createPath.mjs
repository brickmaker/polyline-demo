export function createArc(x, y, radius, startAngle, endAngle, segments = 30) {
    const path = []
    for (let angle = startAngle; angle <= endAngle; angle += (endAngle - startAngle) / segments) {
        const px = x + radius * Math.cos(angle)
        const py = y + radius * Math.sin(angle)
        path.push([px, py])
    }

    return path
}