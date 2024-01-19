import { invoke } from "@tauri-apps/api/tauri";

export interface AsciiArt {
  asciiArt: string;
  width: number;
  heigth: number;
}

export interface ConvertResult {
  data: AsciiArt[];
}

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
  heigth: number;
}

export interface RawConvertResult {
  data: RawAsciiArt[];
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

    const port = await invoke<number>("get_port");
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
