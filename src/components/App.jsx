import { useState, useEffect } from 'react';
import fetchImages from './services/image-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState([]);
  const [currentImageDescription, setCurrentImageDescription] = useState([]);

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);
    fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        const imagesArray = hits.map(hit => ({
          id: hit.id,
          description: hit.tags,
          smallImage: hit.webformatURL,
          largeImage: hit.largeImageURL,
        }));

        setImages(prevState => [...prevState, ...imagesArray]);
        setImagesOnPage(imagesArray.length);
        setTotalImages(totalHits);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [page, query]);

  const getSearchRequest = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const onNextFetch = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setShowModal(true);
      setCurrentImageUrl(currentImageUrl);
      setCurrentImageDescription(currentImageDescription);
    }
  };

  return (
    <>
      <Searchbar onSubmit={getSearchRequest} />

      {images && <ImageGallery images={images} openModal={openModal} />}

      {isLoading && <Loader />}

      {imagesOnPage >= 12 && imagesOnPage < totalImages && (
        <Button onNextFetch={onNextFetch} />
      )}

      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1500,
        }}
      ></Toaster>
    </>
  );
}
