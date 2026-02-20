
import { GoogleGenAI, Type } from "@google/genai";
import { CarDetailInfo } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchCarDetails = async (carName: string): Promise<CarDetailInfo> => {
  const prompt = `Proporciona información detallada sobre el vehículo Volkswagen "${carName}". 
  Incluye características principales, especificaciones técnicas (motor, aceleración, eficiencia) y un resumen comercial atractivo.
  Responde en español.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            features: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            specs: {
              type: Type.OBJECT,
              properties: {
                engine: { type: Type.STRING },
                acceleration: { type: Type.STRING },
                efficiency: { type: Type.STRING }
              },
              required: ["engine", "acceleration", "efficiency"]
            }
          },
          required: ["summary", "features", "specs"]
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as CarDetailInfo;
  } catch (error) {
    console.error("Error fetching car details from Gemini:", error);
    throw error;
  }
};
