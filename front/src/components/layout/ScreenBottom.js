import CreatePostButton from './CreatePostButton';

const ScreenBottom = () => {
  return (
    <section className='flex items-center justify-center h-12 md:h-20 bg-gray-200 text-center z-50 sticky bottom-0'>
      <CreatePostButton />
    </section>
  );
};

export default ScreenBottom;
