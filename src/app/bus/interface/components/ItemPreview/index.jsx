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

    default:
      return null;
  }
};
