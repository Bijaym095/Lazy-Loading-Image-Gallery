import DummyImage from "../assets/images/dummy-image.png"

const Cards = ({ items, elementRef }) => {
    return (
        <div className="max-w-[1140px] mx-auto px-[15px] py-[30px] wrapper grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
                items.map(({ id, urls, alt_description }, index) => <div className="w-full h-[350px]  overflow-hidden rounded-xl" key={id}>
                    <img ref={(elem => elementRef.current[index] = elem)} className="w-full h-full object-cover" src={DummyImage} data-src={urls.full} alt={alt_description} />
                </div>)
            }
        </div >

    )
}

export default Cards;