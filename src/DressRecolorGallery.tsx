import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { generativeRecolor } from "@cloudinary/url-gen/actions/effect";

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dress-boutique',
  },
})

const colorCodes = [
  null, // original image
  '39463E',
  'B7F1F1',
  'C2C9D6',
  'FFFFFF',
];

const createImage = (color: string | null) => {
  const img = cld.image('purple_sun_dress');
  img.resize(fill().width(1000));

  if (color) {
    img.effect(generativeRecolor('(dress;belt;strap)', color).multiple(true));
  }
  return img;
}

export default function DressRecolorGallery() {
  return (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        padding: '1rem',
      }}
    >
      {colorCodes.map((color, index) => (
      <div
        key={index}
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <AdvancedImage
          cldImg={createImage(color)}
          style={{ maxWidth: '100%', height: 'auto', display: 'block'}}
        />
      </div>
      ))}
    </div>
  );
}