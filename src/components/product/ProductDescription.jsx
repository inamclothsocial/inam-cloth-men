import React from 'react';

export default function ProductDescription({ product }) {
  return (
    <div className="mt-12 pt-8 border-t border-[#E9D8C4]/60 select-none text-[#18221F]">
      <h3 className="font-sans text-xl sm:text-2xl font-bold mb-4">
        Description
      </h3>

      <div className="max-w-4xl text-xs sm:text-sm text-[#6F756F] leading-relaxed space-y-3">
        {product?.descriptionHtml ? (
          <div
            className="prose prose-sm max-w-none text-[#6F756F] [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        ) : product?.description ? (
          <p>{product.description}</p>
        ) : (
          <p>
            {product?.name} is meticulously handcrafted from premium quality fabric, designed to offer an exquisite drape with timeless traditional elegance.
          </p>
        )}
      </div>
    </div>
  );
}
