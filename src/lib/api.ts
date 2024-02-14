import { invoke } from "@tauri-apps/api/tauri";

export interface AsciiCharacter {
  character: string;
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface RawAsciiArt {
  characters: AsciiCharacter[];
  width: number;
  height: number;
}

export interface RawConvertResult {
  data: RawAsciiArt[];
}

export function getPort() {
  return invoke<number>("get_port");
}

export class TapciifyApi {
  async convertRaw(
    file: File,
    width: number,
    height: number,
    asciiString = " .,:;+*?%S#@",
    fontRatio = 0.36,
    reverse = false
  ): Promise<RawConvertResult> {
    const formData = new FormData();
    formData.append("blob", file, "img");

    const port = await getPort();
    const baseUrl = `http://localhost:${port}/api/v1`;

    let path = `${baseUrl}/convert/raw?asciiString=${encodeURIComponent(
      asciiString
    )}&fontRatio=${fontRatio}&reverse=${reverse}`;

    if (width) path += `&width=${width}`;
    if (height) path += `&height=${height}`;

    const req = await fetch(path, {
      method: "POST",
      body: formData,
    });

    return await req.json();
  }
}
