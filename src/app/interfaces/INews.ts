export type ImageContent = {
  url: string;
  normal: {
    url: string;
  }
}

export interface INews {
  id: number;
  content: string;
  created_at: string;
  fecha: string;
  gallery_id: unknown;
  imagen_content: ImageContent;
  imagen_titulo: ImageContent;
  order_view: number;
  subtitulo: string;
  titulo: string;
  updated_at: string;
  visible: boolean;
}
