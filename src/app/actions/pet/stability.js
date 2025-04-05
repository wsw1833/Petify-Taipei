'use server';

export const generateImage = async (petImage, prompt) => {
  const base64Data = petImage.split(',')[1];
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/png' });
  const file = new File([blob], 'pet.png', { type: 'image/png' });
  const formData = new FormData();
  formData.append('image', file);
  formData.append('mode', 'image-to-image');
  formData.append('prompt', prompt);
  formData.append('output_format', 'png'); // Use PNG for transparency support
  formData.append('model', 'sd3.5-medium'); // using model SD 3.5 Medium
  formData.append('style_preset', 'pixel-art'); // using model SD 3.5 Medium
  formData.append('strength', 0.9); // Adjust strength (0.1 to 1.0)

  try {
    const response = await fetch(
      'https://api.stability.ai/v2beta/stable-image/generate/sd3',
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
          Accept: 'image/*',
        },
      }
    );

    if (response.status !== 200) throw new Error('Image generation failed');
    const arraybuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arraybuffer);
    return `data:image/png;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeBgImage = async (imageBuffer) => {
  const base64Data = imageBuffer.split(',')[1];
  const buffer = Buffer.from(base64Data, 'base64');
  const formData = new FormData();
  formData.append('image', new Blob([buffer]));

  try {
    const response = await fetch(
      'https://api.stability.ai/v2beta/stable-image/edit/remove-background',
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
          Accept: 'image/*',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Background removal failed: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const resultBuffer = Buffer.from(arrayBuffer);
    return `data:image/png;base64,${resultBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};
