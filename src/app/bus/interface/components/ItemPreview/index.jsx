import { usePreview } from 'react-dnd-preview';

export const ItemPreview = () => {
  const { itemType, style } = usePreview();
  switch (itemType) {
    case 'BUTTON':
      return (
        <button className="button" type="button" style={style}>
          {itemType}
        </button>
      );
    case 'RANGE_BORN':
      return <input className="input_range" type="range" style={style} />;

    default:
      return null;
  }
};
