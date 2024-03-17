'use client';
import { buildSVG } from '@nouns/sdk';
import Image from 'next/image';
import { getNounData, ImageData } from '@nouns/assets';

type NounProps = {
  background: number;
  body: number;
  head: number;
  glasses: number;
};

function Noun({ data, className }: { data: NounProps; className?: string }) {
  const seed = {
    background: data.background,
    body: data.body,
    accessory: 141,
    head: data.head,
    glasses: data.glasses,
  };
  const { parts, background } = getNounData(seed);
  const { palette } = ImageData;
  const svgBinary = buildSVG(parts, palette, background);
  const svgBase64 = btoa(svgBinary);
  return (
    <Image
      className={className}
      src={`data:image/svg+xml;base64,${svgBase64}`}
      alt='nouns'
      width={500}
      height={700}
    />
  );
}

export { Noun };
