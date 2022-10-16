import { usePlane } from "@react-three/cannon"
import { groundTexture } from "../images/textures"
import { useStore } from "../hooks/useStore"

export const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.5, 0],
    }))
    const [addCube] = useStore((state) => [state.addCube])

    groundTexture.repeat.set(100, 100)

    return (
        <mesh
            ref={ref}
            onClick={(e) => {
                e.stopPropagation()
                if (!e.altKey) {
                    const x = Math.ceil(e.point.x - 0.5)
                    const y = Math.ceil(e.point.y)
                    const z = Math.ceil(e.point.z - 0.5)
                    console.log(e.point, [x, y, z])
                    addCube(x, y, z)
                }
            }}
        >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial attach="material" map={groundTexture} />
        </mesh>
    )
}
