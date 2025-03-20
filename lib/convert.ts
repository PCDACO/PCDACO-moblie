import { DocumentPickerAsset } from 'expo-document-picker';
import { ImagePickerAsset } from 'expo-image-picker';

type FileConvert = ImagePickerAsset | DocumentPickerAsset;

export const convertAssertToFile = (file: FileConvert): File => {
  const uri = file.uri;
  const type = (file as ImagePickerAsset).mimeType || (file as DocumentPickerAsset).mimeType;
  const name = (file as ImagePickerAsset).fileName || (file as DocumentPickerAsset).name;

  return {
    uri,
    name: name || 'image.jpg',
    type: type || 'image/jpeg',
  } as unknown as File;
};
