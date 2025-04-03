import { DocumentPickerAsset } from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImagePickerAsset } from 'expo-image-picker';

type FileConvert = ImagePickerAsset | DocumentPickerAsset;

type FileInfoWithSize = FileSystem.FileInfo & {
  size?: number;
};

type ProcessedFileConvert = {
  uri: string;
  type?: string;
  name?: string;
};

export const convertAssertToFile = (file: FileConvert): File => {
  const uri = file.uri;
  const type =
    (file as ImagePickerAsset).mimeType === 'image/heic'
      ? 'image/jpeg'
      : (file as ImagePickerAsset).mimeType || (file as DocumentPickerAsset).mimeType;
  const name = (file as ImagePickerAsset).fileName || (file as DocumentPickerAsset).name;

  return {
    uri,
    name: name || 'image.jpg',
    type: type || 'image/jpeg',
  } as unknown as File;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export const processFileToSize = async (file: FileConvert): Promise<File> => {
  try {
    // Get file info
    const fileInfo = (await FileSystem.getInfoAsync(file.uri)) as FileInfoWithSize;
    const fileSize = fileInfo.size || 0;

    // If file is already under 10MB, return as is
    if (fileSize <= MAX_FILE_SIZE) {
      return convertAssertToFile(file);
    }

    // For images, compress them
    const fileType = (file as ImagePickerAsset).mimeType || (file as DocumentPickerAsset).mimeType;
    if (fileType?.startsWith('image/')) {
      const compressedImage = await ImageManipulator.manipulateAsync(
        file.uri,
        [{ resize: { width: 1920 } }], // Resize to max width of 1920px
        {
          compress: 0.7, // 70% quality
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      // Check if compressed size is still over 10MB
      const compressedInfo = (await FileSystem.getInfoAsync(
        compressedImage.uri
      )) as FileInfoWithSize;
      if (compressedInfo.size && compressedInfo.size > MAX_FILE_SIZE) {
        // If still too large, compress more aggressively
        const finalImage = await ImageManipulator.manipulateAsync(
          compressedImage.uri,
          [{ resize: { width: 1280 } }], // Further reduce to 1280px
          {
            compress: 0.5, // 50% quality
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );

        const processedFile: ProcessedFileConvert = {
          uri: finalImage.uri,
          type: 'image/jpeg',
          name:
            (file as ImagePickerAsset).fileName ||
            (file as DocumentPickerAsset).name ||
            'compressed-image.jpg',
        };

        return convertAssertToFile({
          uri: processedFile.uri,
          mimeType: processedFile.type,
          fileName: processedFile.name,
        } as ImagePickerAsset);
      }

      const processedFile: ProcessedFileConvert = {
        uri: compressedImage.uri,
        type: 'image/jpeg',
        name:
          (file as ImagePickerAsset).fileName ||
          (file as DocumentPickerAsset).name ||
          'compressed-image.jpg',
      };

      return convertAssertToFile({
        uri: processedFile.uri,
        mimeType: processedFile.type,
        fileName: processedFile.name,
      } as ImagePickerAsset);
    }

    // For non-image files, throw error as we can't compress them
    throw new Error('File size exceeds 10MB limit and cannot be compressed');
  } catch (error) {
    console.error('Error processing file:', error);
    throw error;
  }
};

export const processFilesToSize = async (files: FileConvert[]): Promise<File[]> => {
  try {
    const processedFiles = await Promise.all(files.map((file) => processFileToSize(file)));
    return processedFiles;
  } catch (error) {
    console.error('Error processing files:', error);
    throw error;
  }
};
