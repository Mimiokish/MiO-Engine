export class UtilsGeneral {
    constructor() {
        this.#initialParams();
    }

    #initialParams(): void {
    }

    /**
     * @description Generate a random hexadecimal string
     */
    public GenerateHex(): Array<string> {
        // Generate an array of random bytes (16 bytes total)
        const randomBytes: Uint8Array = new Uint8Array(16);
        crypto.getRandomValues(randomBytes);

        // Set the version (4) and variant (2 bits 10) as per RFC4122
        randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Set the version to 4
        randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Set the variant to 10

        // Convert the random bytes to a hexadecimal string
        return Array.from(randomBytes, byte => byte.toString(16).padStart(2, "0"));
    }

    /**
     * @description Generate a version 4 UUID
     */
    public GenerateUUID(): string {
        const hex: Array<string> = this.GenerateHex();

        // Format the UUID segments and join them with hyphens
        const uuid: string = [
            hex.slice(0, 4).join(""),
            hex.slice(4, 6).join(""),
            hex.slice(6, 8).join(""),
            hex.slice(8, 10).join(""),
            hex.slice(10).join("")
        ].join("-");

        return uuid.toUpperCase();
    }
}
