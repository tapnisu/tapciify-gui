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
    width = 0,
    height = 0,
    asciiString = " .,:;+*?%S#@",
    fontRatio = 0.36,
    reverse = false
  ): Promise<RawConvertResult> {
    const formData = new FormData();
    formData.append("blob", file, "img");

    const port = await getPort();
    const baseUrl = `http://localhost:${port}/api/v1`;

    const req = await fetch(
      `${baseUrl}/convert/raw?width=${width}&height=${height}&fontRatio=${fontRatio}&asciiString=${encodeURIComponent(
        asciiString
      )}&reverse=${reverse}`,
      {
        method: "POST",
        body: formData,
      }
    );

    return await req.json();
  }
}
