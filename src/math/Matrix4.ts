export class Matrix4 {
    #identity: Array<number>;

    public get identity(): Array<number> {
        return this.#identity;
    }
    public set identity(identity: Array<number>) {
        throw new Error("MiO Engine | identity is readonly");
    }

    constructor() {
        this.#initialParams();
    }

    #initialParams(): void {
        this.#identity = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    public scale(x: number, y: number, z: number): void {}

    public rotate(): void {}

    /**
     * @description transpose the matrix by default order
     * @param x
     * @param y
     * @param z
     */
    public translate(x: number, y: number, z: number): void {}

    public clone(): void {}

    public copy(): void {}
}
