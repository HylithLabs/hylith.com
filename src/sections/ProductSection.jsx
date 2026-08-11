import ProductTitle from "../components/FlavorTitle";
import ProductSlider from "../components/FlavorSlider";

const ProductSection = () => {
  return (
    <section className="showcase-section">
      <div className="h-full flex lg:flex-row flex-col items-center relative">
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <ProductTitle />
        </div>
        <div className="h-full">
          <ProductSlider />
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
