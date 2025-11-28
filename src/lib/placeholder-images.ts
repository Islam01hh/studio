// Импортируем JSON данные с информацией об изображениях
import data from './placeholder-images.json';

// Определяем тип для одного объекта изображения для строгой типизации
export type ImagePlaceholder = {
  id: string; // Уникальный идентификатор изображения
  description: string; // Описание (для alt-тегов)
  imageUrl: string; // URL изображения на Unsplash
  imageHint: string; // Подсказка для поиска похожего изображения
};

// Экспортируем массив изображений, который будет использоваться во всем приложении
export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
