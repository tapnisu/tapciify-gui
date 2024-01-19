import { Body, getClient } from "@tauri-apps/api/http";

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
  baseUrl: string;

  constructor(baseUrl = "https://localhost:3001/api/v1") {
    this.baseUrl = baseUrl;
  }

  async convertRaw(
    file: File,
    width = 0,
    height = 0,
    asciiString = " .,:;+*?%S#@",
    fontRatio = 0.36,
    reverse = false
  ): Promise<RawConvertResult> {
    const client = await getClient();

    const formData = new FormData();
    formData.append("blob", file, "img");

    return await client.request({
      url: `${
        this.baseUrl
      }/convert/raw?width=${width}&height=${height}&fontRatio=${fontRatio}&asciiString=${encodeURIComponent(
        asciiString
      )}&reverse=${reverse}`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: Body.form(formData),
    });
  }
}
